import React, { useState } from 'react';
import { api } from '../../lib/api';
import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { ShieldCheck, MessageSquare, Mail, Smartphone, Database, CheckCircle2, BellRing, Volume2, VolumeX, Play, Square, Save, Sliders, MapPin, Plus, Trash2, Globe } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { SOUND_OPTIONS, notificationSoundService } from '../../services/notificationSoundService';

const Settings = () => {
  const [saved, setSaved] = useState(false);
  const {
    soundEnabled,
    selectedSound: contextSelectedSound,
    notificationVolume: contextVolume,
    saveSoundSettings,
    triggerTestNotification
  } = useNotifications();

  // Local form state for settings section
  const [localEnabled, setLocalEnabled] = useState(soundEnabled);
  const [localSelectedSound, setLocalSelectedSound] = useState(contextSelectedSound);
  const [localVolume, setLocalVolume] = useState(contextVolume);
  const [playingPreviewId, setPlayingPreviewId] = useState(null);

  // CMS Content Editor State
  const [cmsKey, setCmsKey] = useState('destinations');
  const [cmsText, setCmsText] = useState('');
  const [cmsList, setCmsList] = useState([]);
  const [cmsLoading, setCmsLoading] = useState(false);
  const [jsonError, setJsonError] = useState(null);
  const [cmsSaveMessage, setCmsSaveMessage] = useState('');
  const [cmsSaveError, setCmsSaveError] = useState(false);

  // Visual Form Editor state
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'json'
  const [editingIndex, setEditingIndex] = useState(-2); // -2 means idle, -1 means adding new
  const [itemForm, setItemForm] = useState({});

  // Branch Locations State
  const [branches, setBranches] = useState([]);
  const [branchesLoading, setBranchesLoading] = useState(false);
  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState(null); // null means adding
  const [branchForm, setBranchForm] = useState({
    name: '',
    city: '',
    phone: '',
    rawPhone: '',
    address: '',
    timings: '9:30 AM - 6:30 PM',
    email: '',
    lat: '',
    lng: ''
  });
  const [branchError, setBranchError] = useState(null);
  const [branchSuccess, setBranchSuccess] = useState('');

  const fetchBranches = async () => {
    setBranchesLoading(true);
    try {
      const res = await api.getBranches();
      if (res.success && res.data) {
        setBranches(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch branches:', err);
    } finally {
      setBranchesLoading(false);
    }
  };

  const handleBranchSubmit = async (e) => {
    e.preventDefault();
    setBranchError(null);
    setBranchSuccess('');

    try {
      const payload = {
        ...branchForm,
        lat: Number(branchForm.lat) || 0,
        lng: Number(branchForm.lng) || 0
      };

      let res;
      if (editingBranchId) {
        res = await api.updateBranch(editingBranchId, payload);
      } else {
        res = await api.createBranch(payload);
      }

      if (res.success) {
        setBranchSuccess(res.message || 'Branch saved.');
        setBranchModalOpen(false);
        fetchBranches();
      } else {
        setBranchError(res.message || 'Failed to save branch.');
      }
    } catch (err) {
      setBranchError('Network connection failed.');
    }
  };

  const openAddBranch = () => {
    setEditingBranchId(null);
    setBranchForm({
      name: '',
      city: '',
      phone: '',
      rawPhone: '',
      address: '',
      timings: '9:30 AM - 6:30 PM',
      email: '',
      lat: '',
      lng: ''
    });
    setBranchModalOpen(true);
  };

  const openEditBranch = (branch) => {
    setEditingBranchId(branch.id);
    setBranchForm({
      name: branch.name || '',
      city: branch.city || '',
      phone: branch.phone || '',
      rawPhone: branch.rawPhone || '',
      address: branch.address || '',
      timings: branch.timings || '9:30 AM - 6:30 PM',
      email: branch.email || '',
      lat: branch.lat ? String(branch.lat) : '',
      lng: branch.lng ? String(branch.lng) : ''
    });
    setBranchModalOpen(true);
  };

  const handleDeleteBranch = async (id) => {
    if (!window.confirm('Are you sure you want to delete this office branch location?')) return;
    try {
      const res = await api.deleteBranch(id);
      if (res.success) {
        fetchBranches();
      }
    } catch (err) {
      console.error('Failed to delete branch:', err);
    }
  };

  const fetchCms = async (key) => {
    setCmsLoading(true);
    setCmsSaveMessage('');
    setJsonError(null);
    try {
      const res = await api.getCmsData(key);
      if (res.success && res.data) {
        setCmsList(res.data);
        setCmsText(JSON.stringify(res.data, null, 2));
      }
    } catch (err) {
      console.error('Failed to fetch CMS content:', err);
    } finally {
      setCmsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCms(cmsKey);
    fetchBranches();
  }, [cmsKey]);

  const handleCmsSave = async () => {
    setCmsSaveMessage('');
    setCmsSaveError(false);
    setJsonError(null);

    let parsedData = null;
    if (editorMode === 'json') {
      try {
        parsedData = JSON.parse(cmsText);
      } catch (err) {
        setJsonError('Invalid JSON syntax: ' + err.message);
        return;
      }
    } else {
      parsedData = cmsList;
    }

    try {
      const res = await api.updateCmsData(cmsKey, parsedData);
      if (res.success) {
        setCmsSaveMessage(`✓ ${cmsKey.toUpperCase()} content updated successfully! Website will reflect changes live.`);
        setCmsList(parsedData);
        setCmsText(JSON.stringify(parsedData, null, 2));
      } else {
        setCmsSaveError(true);
        setCmsSaveMessage(res.message || 'Failed to update CMS data.');
      }
    } catch (err) {
      setCmsSaveError(true);
      setCmsSaveMessage('Server error updating content.');
    }
  };

  // Visual Editor Handlers
  const handleEditItem = (index) => {
    setEditingIndex(index);
    setItemForm({ ...cmsList[index] });
  };

  const handleAddNewItem = () => {
    setEditingIndex(-1);
    const template = cmsList.length > 0 ? { ...cmsList[0] } : { id: 'new-item', name: '' };
    Object.keys(template).forEach(k => {
      if (typeof template[k] === 'string') template[k] = '';
      else if (typeof template[k] === 'number') template[k] = 0;
      else if (Array.isArray(template[k])) template[k] = [];
      else if (typeof template[k] === 'boolean') template[k] = true;
    });
    setItemForm(template);
  };

  const handleSaveItem = () => {
    let updated = [...cmsList];
    if (editingIndex === -1) {
      updated.push(itemForm);
    } else {
      updated[editingIndex] = itemForm;
    }
    setCmsList(updated);
    setCmsText(JSON.stringify(updated, null, 2));
    setEditingIndex(-2);
  };

  const handleDeleteItem = (index) => {
    if (!window.confirm('Delete this card item from website section?')) return;
    const updated = cmsList.filter((_, i) => i !== index);
    setCmsList(updated);
    setCmsText(JSON.stringify(updated, null, 2));
  };

  const handlePreviewPlay = (soundId) => {
    if (playingPreviewId === soundId) {
      notificationSoundService.stopPreview();
      setPlayingPreviewId(null);
    } else {
      setPlayingPreviewId(soundId);
      notificationSoundService.previewNotificationSound(soundId, localVolume, () => {
        setPlayingPreviewId(null);
      });
    }
  };

  const handleSaveNotificationSettings = async (e) => {
    e.preventDefault();
    await saveSoundSettings(localEnabled, localSelectedSound, localVolume);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader title="System Settings & Website CMS" />

        <div className="admin-content" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* REAL-TIME AUDIO NOTIFICATION SYSTEM CONFIGURATION */}
          <div className="admin-card" style={{ borderLeft: '4px solid #005C5B' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#07324A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BellRing size={22} color="#005C5B" /> Real-Time Lead Sound Alert Config
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '2px' }}>
                  Select the chime audio sound and volume played whenever a student submits a new inquiry.
                </p>
              </div>

              {saved && (
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#15803D', backgroundColor: '#DCFCE7', padding: '6px 12px', borderRadius: '6px' }}>
                  ✓ Settings saved & active!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveNotificationSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Sound Enable/Disable Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: '#07324A', display: 'block' }}>Audio Alert Chimes</strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Play sound alerts on desktop when new lead arrives</span>
                </div>

                <button
                  type="button"
                  onClick={() => setLocalEnabled(!localEnabled)}
                  style={{
                    width: '52px',
                    height: '28px',
                    borderRadius: '14px',
                    backgroundColor: localEnabled ? '#005C5B' : '#CBD5E1',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    top: '3px',
                    left: localEnabled ? '26px' : '4px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </button>
              </div>

              {/* Volume Slider & Test Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flexGrow: 1, minWidth: '220px' }}>
                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {localVolume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />} Alert Volume Level
                    </span>
                    <span>{Math.round(localVolume * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={localVolume}
                    onChange={(e) => setLocalVolume(parseFloat(e.target.value))}
                    disabled={!localEnabled}
                    style={{ width: '100%', accentColor: '#005C5B', cursor: localEnabled ? 'pointer' : 'not-allowed' }}
                  />
                </div>

                <button
                  type="button"
                  onClick={triggerTestNotification}
                  disabled={!localEnabled}
                  style={{
                    padding: '0 16px',
                    height: '42px',
                    borderRadius: '8px',
                    border: '1.5px solid #07324A',
                    backgroundColor: '#F8FAFC',
                    color: '#07324A',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: localEnabled ? 'pointer' : 'not-allowed',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <BellRing size={16} /> Trigger Sample Toast & Sound Test
                </button>
              </div>

              {/* Audio Sound Selection Grid */}
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#07324A', marginBottom: '10px' }}>
                  Select Preferred Notification Sound:
                </label>

                <div className="sound-grid">
                  {SOUND_OPTIONS.map((sound) => {
                    const isSelected = localSelectedSound === sound.id;
                    const isPlaying = playingPreviewId === sound.id;

                    return (
                      <div
                        key={sound.id}
                        onClick={() => localEnabled && setLocalSelectedSound(sound.id)}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '10px',
                          border: `2px solid ${isSelected ? '#005C5B' : '#E2E8F0'}`,
                          backgroundColor: isSelected ? '#E6F4F3' : '#FFFFFF',
                          cursor: localEnabled ? 'pointer' : 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="radio"
                            name="soundOption"
                            checked={isSelected}
                            onChange={() => setLocalSelectedSound(sound.id)}
                            disabled={!localEnabled}
                            style={{ accentColor: '#005C5B' }}
                          />
                          <span style={{ fontSize: '0.88rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#005C5B' : '#334155' }}>
                            {sound.name}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreviewPlay(sound.id);
                          }}
                          disabled={!localEnabled}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: isPlaying ? '#005C5B' : '#F1F5F9',
                            color: isPlaying ? '#FFFFFF' : '#07324A',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: localEnabled ? 'pointer' : 'not-allowed'
                          }}
                          title="Preview audio sound"
                        >
                          {isPlaying ? <Square size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Save Controls */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid #E2E8F0' }}>
                <button type="submit" className="btn-admin-primary">
                  <Save size={16} /> Save Sound & Alert Configuration
                </button>
              </div>
            </form>
          </div>

          {/* PHYSICAL OFFICE BRANCH LOCATIONS MANAGER */}
          <div className="admin-card" style={{ borderLeft: '4px solid #F4B63F' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#07324A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={22} color="#D9941E" /> Physical Office Consultation Hubs Manager
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '2px' }}>
                  Manage branch offices across South India. Changes reflect on the Website Map and Location Pickers.
                </p>
              </div>

              <button onClick={openAddBranch} className="btn-admin-primary" style={{ backgroundColor: '#D9941E' }}>
                <Plus size={16} /> Add New Office Location
              </button>
            </div>

            {branchesLoading ? (
              <p style={{ color: '#64748B', fontSize: '0.88rem' }}>Loading office locations...</p>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Branch Name & City</th>
                      <th>Address</th>
                      <th>Contact Phone</th>
                      <th>Coordinates (Lat, Lng)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <strong style={{ color: '#005C5B', fontSize: '0.92rem' }}>{b.name}</strong>
                          <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{b.city} • {b.timings || '9:30 AM - 6:30 PM'}</div>
                        </td>
                        <td style={{ maxWidth: '280px', fontSize: '0.82rem', color: '#334155' }}>
                          {b.address}
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: '#07324A' }}>{b.phone}</div>
                          <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{b.email || 'support@globalscholarfinance.com'}</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                            {b.lat || 0}, {b.lng || 0}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => openEditBranch(b)}
                              style={{ padding: '6px 12px', backgroundColor: '#E6F4F3', color: '#005C5B', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBranch(b.id)}
                              style={{ padding: '6px 10px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* WEBSITE LIVE CMS CONTENT EDITOR */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#07324A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={22} color="#005C5B" /> Live Website CMS Content Management
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '2px' }}>
                  Edit study destinations, loan categories, FAQs, and testimonials without re-deploying code.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setEditorMode('visual')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    backgroundColor: editorMode === 'visual' ? '#005C5B' : '#F1F5F9',
                    color: editorMode === 'visual' ? '#FFFFFF' : '#475569',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Visual Form Editor
                </button>
                <button
                  onClick={() => setEditorMode('json')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    backgroundColor: editorMode === 'json' ? '#07324A' : '#F1F5F9',
                    color: editorMode === 'json' ? '#FFFFFF' : '#475569',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Raw JSON Code Editor
                </button>
              </div>
            </div>

            {/* CMS Section Tab Selector */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {[
                { key: 'destinations', label: 'Study Destinations' },
                { key: 'loan-categories', label: 'Loan Categories' },
                { key: 'faqs', label: 'Website FAQs' },
                { key: 'testimonials', label: 'Student Testimonials' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setCmsKey(tab.key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    backgroundColor: cmsKey === tab.key ? '#07324A' : '#F8FAFC',
                    color: cmsKey === tab.key ? '#FFFFFF' : '#475569',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {cmsSaveMessage && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                marginBottom: '16px',
                backgroundColor: cmsSaveError ? '#FEE2E2' : '#DCFCE7',
                color: cmsSaveError ? '#DC2626' : '#15803D'
              }}>
                {cmsSaveMessage}
              </div>
            )}

            {jsonError && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '0.84rem', fontWeight: 700, marginBottom: '16px' }}>
                ⚠️ {jsonError}
              </div>
            )}

            {cmsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>Loading content section...</div>
            ) : editorMode === 'json' ? (
              /* Raw JSON Editor */
              <div>
                <textarea
                  rows={16}
                  value={cmsText}
                  onChange={(e) => setCmsText(e.target.value)}
                  style={{
                    width: '100%',
                    fontFamily: 'monospace',
                    fontSize: '0.88rem',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#0F172A',
                    color: '#38BDF8',
                    outline: 'none'
                  }}
                />
              </div>
            ) : (
              /* Visual Cards List Editor */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#334155' }}>
                    Showing {cmsList.length} items in {cmsKey.toUpperCase()}
                  </span>
                  <button onClick={handleAddNewItem} className="btn-admin-primary" style={{ height: '36px', fontSize: '0.8rem' }}>
                    + Add New Card Item
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {cmsList.map((item, idx) => (
                    <div key={idx} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <strong style={{ fontSize: '1rem', color: '#07324A', display: 'block', marginBottom: '4px' }}>
                          {item.name || item.title || item.question || item.country || `Item #${idx + 1}`}
                        </strong>
                        <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineClamp: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.description || item.answer || item.text || item.details || JSON.stringify(item)}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
                        <button onClick={() => handleEditItem(idx)} style={{ flexGrow: 1, padding: '6px', backgroundColor: '#E6F4F3', color: '#005C5B', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                          Edit Properties
                        </button>
                        <button onClick={() => handleDeleteItem(idx)} style={{ padding: '6px 10px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
              <button onClick={handleCmsSave} className="btn-admin-primary">
                <Save size={16} /> Publish Changes Live
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Branch Modal Form */}
      {branchModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(7, 50, 74, 0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '520px', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#07324A', marginBottom: '16px' }}>
              {editingBranchId ? 'Edit Branch Location' : 'Add New Physical Branch'}
            </h3>

            {branchError && (
              <div style={{ padding: '10px', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '8px', fontSize: '0.84rem', fontWeight: 700, marginBottom: '14px' }}>
                ⚠️ {branchError}
              </div>
            )}

            <form onSubmit={handleBranchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Branch Hub Title *</label>
                <input type="text" required placeholder="e.g. Vijayawada Hub" value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} className="admin-input" style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>City *</label>
                  <input type="text" required placeholder="Vijayawada" value={branchForm.city} onChange={(e) => setBranchForm({ ...branchForm, city: e.target.value })} className="admin-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Formatted Phone *</label>
                  <input type="text" required placeholder="+91 866 247 9999" value={branchForm.phone} onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })} className="admin-input" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Full Physical Address *</label>
                <textarea rows={2} required placeholder="Full street address..." value={branchForm.address} onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })} className="admin-input" style={{ height: 'auto', padding: '8px', width: '100%' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Latitude (Lat)</label>
                  <input type="number" step="any" placeholder="16.5062" value={branchForm.lat} onChange={(e) => setBranchForm({ ...branchForm, lat: e.target.value })} className="admin-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Longitude (Lng)</label>
                  <input type="number" step="any" placeholder="80.6480" value={branchForm.lng} onChange={(e) => setBranchForm({ ...branchForm, lng: e.target.value })} className="admin-input" style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setBranchModalOpen(false)} style={{ padding: '0 16px', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary" style={{ height: '40px' }}>
                  Save Branch Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visual Item Edit Modal */}
      {editingIndex >= -1 && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(7, 50, 74, 0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '520px', padding: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#07324A', marginBottom: '16px' }}>
              {editingIndex === -1 ? 'Add New Card Item' : `Edit Item #${editingIndex + 1}`}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.keys(itemForm).map((prop) => (
                <div key={prop}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '4px', textTransform: 'uppercase' }}>
                    {prop}
                  </label>
                  {typeof itemForm[prop] === 'boolean' ? (
                    <select
                      value={itemForm[prop] ? 'true' : 'false'}
                      onChange={(e) => setItemForm({ ...itemForm, [prop]: e.target.value === 'true' })}
                      className="admin-select"
                      style={{ width: '100%' }}
                    >
                      <option value="true">True / Enabled</option>
                      <option value="false">False / Disabled</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={typeof itemForm[prop] === 'object' ? JSON.stringify(itemForm[prop]) : itemForm[prop]}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (typeof itemForm[prop] === 'number') val = Number(val) || 0;
                        setItemForm({ ...itemForm, [prop]: val });
                      }}
                      className="admin-input"
                      style={{ width: '100%' }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="button" onClick={() => setEditingIndex(-2)} style={{ padding: '0 16px', height: '40px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="button" onClick={handleSaveItem} className="btn-admin-primary" style={{ height: '40px' }}>
                Save Card Properties
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
