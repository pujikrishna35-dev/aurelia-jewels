import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GSF_BRANCHES, fetchBranchesData } from '../config/branches';

const BranchMap = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [branches, setBranches] = useState([]);

  // Register navigate on window so Leaflet popup HTML buttons can call it
  useEffect(() => {
    window.__gsfNavigate = (path) => navigate(path);
    return () => { delete window.__gsfNavigate; };
  }, [navigate]);

  useEffect(() => {
    fetchBranchesData().then(data => setBranches(data));
  }, []);

  // 1. Dynamically load Leaflet assets from CDN to avoid build-time asset packaging bugs
  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => setLeafletLoaded(true);
    script.onerror = () => setLoadError(true);
    document.head.appendChild(script);

    return () => {
      // Clean up script/link elements if component unmounts before loading
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  // 2. Initialize Map once Leaflet is ready
  useEffect(() => {
    if (!leafletLoaded || !window.L || mapRef.current || branches.length === 0) return;

    const L = window.L;

    try {
      // Center map around South India coordinates
      const map = L.map('gsf-leaflet-map-element', {
        center: [14.8, 79.5],
        zoom: 6,
        scrollWheelZoom: false
      });

      // Load premium CartoDB Voyager tiles (clean, light, modern style matching GSF site aesthetics)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Plot all GSF branch locations
      branches.forEach((branch) => {
        if (!branch.lat || !branch.lng) return;

        // Custom pulsing dot representation (circle markers are highly reliable and customizable)
        const dot = L.circleMarker([branch.lat, branch.lng], {
          radius: 9,
          fillColor: '#005C5B',
          color: '#FFFFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95
        }).addTo(map);

        // Bind interactive information popups
        const shortAddr = branch.address && branch.address.length > 60
          ? branch.address.substring(0, 60) + '...'
          : (branch.address || '');

        const popupHtml = `
          <div style="font-family: 'Outfit', sans-serif; padding: 4px; min-width: 180px; color: #07324A;">
            <h4 style="margin: 0 0 6px 0; color: #005C5B; font-size: 0.94rem; font-weight: 800;">📍 ${branch.name}</h4>
            <p style="margin: 0 0 4px 0; font-size: 0.78rem; color: #475569;">📞 ${branch.phone}</p>
            <p style="margin: 0 0 10px 0; font-size: 0.74rem; color: #64748B; line-height: 1.4;">${shortAddr}</p>
            <a
              href="tel:${branch.rawPhone || branch.phone}"
              style="display: block; width: 100%; text-align: center; background-color: #005C5B; color: #FFFFFF; padding: 7px 12px; border-radius: 6px; text-decoration: none; font-size: 0.76rem; font-weight: 700;"
            >
              📞 Call Branch
            </a>
          </div>
        `;

        dot.bindPopup(popupHtml, {
          closeButton: false,
          offset: L.point(0, -5)
        });

        // Hover effect: increase radius slightly
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
      console.error('Failed to initialize Leaflet Map:', err);
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
      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '12px', color: '#B91C1C', fontWeight: 700 }}>
        ⚠️ Could not load map server resources. Please check your network connection.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div 
        id="gsf-leaflet-map-element" 
        style={{ 
          height: '420px', 
          width: '100%', 
          borderRadius: '16px', 
          border: '2px solid #E2E8F0',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#F1F5F9',
          zIndex: 1
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', flexWrap: 'wrap' }}>
        <span>🔴 Click any location pin on the map to view regional offices.</span>
        <span>🖱️ Drag or scroll to zoom in/out.</span>
      </div>
    </div>
  );
};

export default BranchMap;
