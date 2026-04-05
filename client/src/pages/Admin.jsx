import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, Trash2, Edit3, MessageCircle, Settings as SettingsIcon, LogOut, Check, Briefcase, FileText, Image as ImageIcon } from 'lucide-react';

const Admin = ({ settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', status: 'Completed', link: '' });
  const [editingAbout, setEditingAbout] = useState(settings.about?.body || '');
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = { 'Authorization': `Bearer ${token}` };

  useEffect(() => {
     fetchProjects();
     fetchMessages();
  }, []);

  const fetchProjects = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const res = await axios.get(`${apiBase}/projects`);
      setProjects(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchMessages = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const res = await axios.get(`${apiBase}/contact`, { headers });
      setMessages(res.data);
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      await axios.post(`${apiBase}/projects`, newProject, { headers });
      setNewProject({ title: '', description: '', status: 'Completed', link: '' });
      fetchProjects();
    } catch (err) { alert("Failed to add project"); }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Delete this project?")) {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        await axios.delete(`${apiBase}/projects/${id}`, { headers });
        fetchProjects();
      } catch (err) { alert("Failed to delete project"); }
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(type, file);

    setUploadStatus(`Uploading ${type}...`);
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const res = await axios.post(`${apiBase}/upload/${type}`, formData, { 
        headers: { ...headers, 'Content-Type': 'multipart/form-data' } 
      });
      setSettings(prev => ({ 
        ...prev, 
        assets: { ...prev.assets, [type]: res.data.path } 
      }));
      setUploadStatus(`${type} uploaded successfully!`);
      setTimeout(() => setUploadStatus(''), 3000);
    } catch (err) {
      setUploadStatus(`Upload failed.`);
    }
  };

  const handleUpdateAbout = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const res = await axios.put(`${apiBase}/settings`, { about: { ...settings.about, body: editingAbout } }, { headers });
      setSettings(res.data);
      alert("Changes saved successfully!");
    } catch (err) { alert("Failed to update about text"); }
  };

  return (
    <div className="container" style={{ padding: '6rem 2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin <span className="text-gradient">Dashboard</span></h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>Manage your portfolio content and messages.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout} 
          className="btn btn-ghost"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4d4d', borderColor: 'rgba(255,77,77,0.2)' }}
        >
           <LogOut size={18} /> Logout
        </motion.button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '4rem' }}>
        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
            { id: 'content', label: 'About & Content', icon: <FileText size={18} /> },
            { id: 'messages', label: 'Messages', icon: <MessageCircle size={18} /> },
            { id: 'uploads', label: 'Assets', icon: <ImageIcon size={18} /> }
          ].map(tab => (
            <motion.button 
              key={tab.id}
              whileHover={{ x: 5 }}
              onClick={() => setActiveTab(tab.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                padding: '1rem 1.25rem', 
                borderRadius: '12px',
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'var(--gray-400)',
                fontWeight: activeTab === tab.id ? '700' : '500'
              }}
            >
              {tab.icon} {tab.label}
            </motion.button>
          ))}
        </aside>

        {/* Content Area */}
        <section className="card" style={{ padding: '3rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'projects' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.75rem' }}>Projects</h2>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{projects.length} Total Projects</span>
                  </div>
                  
                  <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem', padding: '2.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Add New Work</h3>
                    <input 
                      type="text" 
                      placeholder="Project Title" 
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      required
                      style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '12px', outline: 'none' }}
                    />
                    <textarea 
                      placeholder="Short Description Focused on Results" 
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      required
                      rows="3"
                      style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: 'white', borderRadius: '12px', outline: 'none' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <select 
                        value={newProject.status}
                        onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                        style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: 'white', borderRadius: '12px', outline: 'none' }}
                      >
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Live">Live</option>
                      </select>
                      <input 
                        type="text" 
                        placeholder="External Link" 
                        value={newProject.link}
                        onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                        style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '12px', outline: 'none' }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: 'max-content', marginTop: '0.5rem' }}>Save Project</button>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {projects.map(p => (
                      <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <Briefcase size={20} className="text-gradient" />
                            </div>
                            <div>
                              <strong style={{ fontSize: '1.1rem' }}>{p.title}</strong>
                              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>{p.status}</p>
                            </div>
                          </div>
                          <motion.button 
                            whileHover={{ color: '#ff4d4d', scale: 1.1 }}
                            onClick={() => handleDeleteProject(p._id)} 
                            style={{ color: 'var(--text-muted)', background: 'none' }}
                          >
                            <Trash2 size={20} />
                          </motion.button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>About Content</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--gray-400)' }}>Biography</label>
                        <textarea 
                          rows="8" 
                          value={editingAbout}
                          onChange={(e) => setEditingAbout(e.target.value)}
                          style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: 'white', borderRadius: '16px', outline: 'none', lineHeight: '1.6' }}
                        ></textarea>
                        <button onClick={handleUpdateAbout} className="btn btn-primary" style={{ width: 'max-content', marginTop: '0.5rem' }}>Save Changes</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Inbound Messages</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {messages.length > 0 ? messages.map(m => (
                      <div key={m._id} style={{ padding: '2rem', border: '1px solid var(--border)', borderRadius: '20px', background: m.isRead ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#60a5fa,#e2e8f0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#000' }}>
                                {m.name.charAt(0)}
                              </div>
                              <div>
                                <strong style={{ fontSize: '1rem' }}>{m.name}</strong>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{m.email}</p>
                              </div>
                            </div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(m.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                            <p style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{m.subject}</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{m.message}</p>
                          </div>
                      </div>
                    )) : (
                      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray-600)' }}>
                        <MessageCircle size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                        <p>No messages received yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'uploads' && (
                <div>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Global Assets</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{ padding: '2.5rem', border: '2px dashed var(--border-md)', borderRadius: '20px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Brand Logo</h3>
                        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                          {settings.assets?.logo ? <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}${settings.assets.logo}`} alt="Logo" style={{ maxHeight: '60px' }} /> : <ImageIcon size={48} style={{ opacity: 0.1 }} />}
                        </div>
                        <input 
                          type="file" 
                          id="logo-upload"
                          hidden
                          onChange={(e) => handleFileUpload(e, 'logo')} 
                        />
                        <label htmlFor="logo-upload" className="btn btn-ghost" style={{ cursor: 'pointer' }}>
                          <Upload size={16} style={{ marginRight: '8px' }} /> Update Logo
                        </label>
                    </div>

                    <div style={{ padding: '2.5rem', border: '2px dashed var(--border-md)', borderRadius: '20px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Ambience Audio</h3>
                        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                          {settings.assets?.audio ? <audio controls src={`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}${settings.assets.audio}`} style={{ width: '100%' }} /> : <ImageIcon size={48} style={{ opacity: 0.1, transform: 'rotate(90deg)' }} />}
                        </div>
                        <input 
                          type="file" 
                          id="audio-upload"
                          hidden
                          onChange={(e) => handleFileUpload(e, 'audio')} 
                        />
                        <label htmlFor="audio-upload" className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                          <Upload size={16} style={{ marginRight: '8px' }} /> Update Audio
                        </label>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {uploadStatus && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{ marginTop: '2.5rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', borderRadius: '12px', textAlign: 'center', fontWeight: '600' }}
                      >
                        {uploadStatus}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default Admin;
