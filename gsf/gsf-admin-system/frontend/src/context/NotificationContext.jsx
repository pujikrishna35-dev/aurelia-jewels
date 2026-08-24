import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { notificationSoundService } from '../services/notificationSoundService';

const NotificationContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('gsf_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const NotificationProvider = ({ children }) => {
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeToast, setActiveToast] = useState(null);

  // Audio Settings State
  const [soundEnabled, setSoundEnabledState] = useState(() => {
    const saved = localStorage.getItem('gsf_notif_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [selectedSound, setSelectedSoundState] = useState(() => {
    return localStorage.getItem('gsf_notif_selected_sound') || 'notification-sound-1';
  });

  const [notificationVolume, setNotificationVolumeState] = useState(() => {
    const saved = localStorage.getItem('gsf_notif_volume');
    return saved !== null ? parseFloat(saved) : 0.7;
  });

  const [newNotifAnim, setNewNotifAnim] = useState(false);

  // Load persisted settings from backend on boot
  useEffect(() => {
    const fetchBackendSettings = async () => {
      if (!localStorage.getItem('gsf_admin_token')) return;
      try {
        const res = await fetch(`${API_BASE}/settings`, {
          headers: getAuthHeaders()
        });
        const data = await res.json();
        if (data.success && data.data) {
          if (typeof data.data.notificationSoundEnabled === 'boolean') {
            setSoundEnabledState(data.data.notificationSoundEnabled);
            localStorage.setItem('gsf_notif_sound_enabled', JSON.stringify(data.data.notificationSoundEnabled));
          }
          if (data.data.selectedNotificationSound) {
            setSelectedSoundState(data.data.selectedNotificationSound);
            localStorage.setItem('gsf_notif_selected_sound', data.data.selectedNotificationSound);
          }
          if (typeof data.data.notificationVolume === 'number') {
            setNotificationVolumeState(data.data.notificationVolume);
            localStorage.setItem('gsf_notif_volume', data.data.notificationVolume.toString());
          }
        }
      } catch (err) {
        console.warn('Backend settings endpoint offline, using local state.');
      }
    };
    fetchBackendSettings();
  }, [location.pathname]);

  const saveSoundSettings = async (enabled, soundId, volumeVal) => {
    setSoundEnabledState(enabled);
    setSelectedSoundState(soundId);
    setNotificationVolumeState(volumeVal);

    localStorage.setItem('gsf_notif_sound_enabled', JSON.stringify(enabled));
    localStorage.setItem('gsf_notif_selected_sound', soundId);
    localStorage.setItem('gsf_notif_volume', volumeVal.toString());

    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          notificationSoundEnabled: enabled,
          selectedNotificationSound: soundId,
          notificationVolume: volumeVal
        })
      });
    } catch (err) {
      console.warn('Failed to sync settings with backend:', err);
    }
  };

  const fetchNotifications = useCallback(async () => {
    if (!localStorage.getItem('gsf_admin_token')) return;
    try {
      const res = await fetch(`${API_BASE}/notifications`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data);
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  }, []);

  const [lastLeadEvent, setLastLeadEvent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('gsf_admin_token');
    if (!token) return;

    fetchNotifications();

    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      auth: { token }
    });

    socket.on('connect', () => {
      console.log('⚡ Connected to Admin Real-Time Socket Server');
    });

    socket.on('connect_error', (err) => {
      console.warn('Socket connection rejected:', err.message);
    });

    socket.on('new_notification', (notif) => {
      console.log('🔔 Real-Time Notification Received:', notif);
      
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((prev) => prev + 1);
      setActiveToast(notif);
      setNewNotifAnim(true);
      setTimeout(() => setNewNotifAnim(false), 2000);

      // Play audio ONLY for NEW_LEAD notifications if sound is enabled
      if (notif.type === 'NEW_LEAD' && soundEnabled) {
        notificationSoundService.playNotificationSound(selectedSound, notificationVolume);
      }

      // Auto hide toast after 6 seconds
      setTimeout(() => {
        setActiveToast((current) => (current?.id === notif.id ? null : current));
      }, 6000);
    });

    socket.on('new_lead', (lead) => {
      console.log('⚡ Real-Time New Lead Received:', lead);
      setLastLeadEvent({ type: 'new_lead', lead, timestamp: Date.now() });
    });

    socket.on('lead_updated', (lead) => {
      console.log('⚡ Real-Time Lead Update Received:', lead);
      setLastLeadEvent({ type: 'lead_updated', lead, timestamp: Date.now() });
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchNotifications, soundEnabled, selectedSound, notificationVolume, location.pathname]);

  const markAsRead = async (id) => {
    try {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      await fetch(`${API_BASE}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);

      await fetch(`${API_BASE}/notifications/read-all`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const dismissToast = () => {
    setActiveToast(null);
  };

  const triggerTestNotification = () => {
    const sampleToast = {
      id: `test-preview-${Date.now()}`,
      leadId: 'lead-101',
      type: 'NEW_LEAD',
      title: '🔥 New Loan Enquiry',
      studentName: 'Test notification',
      country: 'This is a notification preview.',
      intake: 'Preview',
      classification: 'HOT',
      createdAt: new Date().toISOString()
    };

    setActiveToast(sampleToast);

    if (soundEnabled) {
      notificationSoundService.playNotificationSound(selectedSound, notificationVolume);
    }

    setTimeout(() => {
      setActiveToast((current) => (current?.id === sampleToast.id ? null : current));
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        activeToast,
        soundEnabled,
        selectedSound,
        notificationVolume,
        newNotifAnim,
        lastLeadEvent,
        saveSoundSettings,
        markAsRead,
        markAllAsRead,
        dismissToast,
        triggerTestNotification,
        fetchNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
