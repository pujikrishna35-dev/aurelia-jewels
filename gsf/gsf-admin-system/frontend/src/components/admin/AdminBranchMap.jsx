import React, { useEffect, useRef, useState } from 'react';
import { api } from '../../lib/api';

const AdminBranchMap = () => {
  const mapRef = useRef(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    api.getBranches().then(res => {
      if (res.success && Array.isArray(res.data)) {
        setBranches(res.data);
      }
    }).catch(err => console.error('Failed to load branches on admin map:', err));
  }, []);

  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Leaflet JS Script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => setLeafletLoaded(true);
    script.onerror = () => setLoadError(true);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !window.L || mapRef.current || branches.length === 0) return;

    const L = window.L;

    try {
      const map = L.map('admin-leaflet-map-element', {
        center: [14.8, 79.5],
        zoom: 6,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      branches.forEach((branch) => {
        if (!branch.lat || !branch.lng) return;

        const dot = L.circleMarker([branch.lat, branch.lng], {
          radius: 9,
          fillColor: '#005C5B',
          color: '#FFFFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95
        }).addTo(map);

        const branchUrl = `http://localhost:5173/branch/${encodeURIComponent(branch.id)}`;
        const shortAddr = branch.address && branch.address.length > 60
          ? branch.address.substring(0, 60) + '...'
          : (branch.address || '');

        const popupHtml = `
          <div style="font-family: 'Outfit', sans-serif; padding: 4px; min-width: 170px; color: #07324A;">
            <h4 style="margin: 0 0 6px 0; color: #005C5B; font-size: 0.92rem; font-weight: 800;">📍 ${branch.name}</h4>
            <p style="margin: 0 0 4px 0; font-size: 0.76rem; color: #475569;">📞 ${branch.phone}</p>
            <p style="margin: 0 0 10px 0; font-size: 0.72rem; color: #64748B; line-height: 1.4;">${shortAddr}</p>
            <button
              onclick="window.open('${branchUrl}', '_blank')"
              style="display: block; width: 100%; text-align: center; background-color: #005C5B; color: #FFFFFF; padding: 7px 12px; border-radius: 6px; border: none; cursor: pointer; font-size: 0.76rem; font-weight: 700;"
            >
              Open Branch Page ↗
            </button>
          </div>
        `;
        
        dot.bindPopup(popupHtml, {
          closeButton: false,
          offset: L.point(0, -5)
        });

        dot.on('mouseover', function () {
          this.setRadius(12);
          this.setStyle({ fillColor: '#F4B63F' });
        });
        dot.on('mouseout', function () {
          this.setRadius(9);
          this.setStyle({ fillColor: '#005C5B' });
        });
      });

      mapRef.current = map;
    } catch (err) {
      console.error('Failed to init admin Leaflet map:', err);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [leafletLoaded, branches]);

  if (loadError) {
    return (
      <div style={{ padding: '20px', color: '#DC2626', fontWeight: 700, textAlign: 'center' }}>
        ⚠️ Could not load map server resources.
      </div>
    );
  }

  return (
    <div 
      id="admin-leaflet-map-element" 
      style={{ 
        height: '320px', 
        width: '100%', 
        borderRadius: '12px', 
        border: '1px solid #E2E8F0',
        backgroundColor: '#F1F5F9',
        zIndex: 1
      }}
    />
  );
};

export default AdminBranchMap;
