import React, { useState } from 'react';
import { 
  Settings, 
  MessageSquare, 
  CreditCard, 
  Users, 
  BarChart,
  Home,
  Upload,
  Trash2,
  LogOut,
  Link,
  Timer
} from 'lucide-react';
import '../styles/Dashboard.css';
import MessagesComponent from './MessagesComponent';

const LogoUploader = ({ onLogoChange, currentLogo }) => {
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onLogoChange(e.target.files[0]);
    }
  };

  if (!currentLogo) {
    return (
      <div 
        className="logo-uploader"
        onClick={() => document.getElementById('logo-upload').click()}
      >
        <input
          type="file"
          id="logo-upload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileInput}
        />
        <Upload size={32} style={{ margin: '0 auto 8px' }} />
        <p style={{ margin: 0 }}>Drop logo here or click to upload</p>
      </div>
    );
  }

  return (
    <div className="logo-preview">
      <img src={currentLogo} alt="Company logo" />
      <div className="logo-actions">
        <button className="button button-ghost" onClick={() => document.getElementById('logo-upload').click()}>
          <Upload size={16} />
        </button>
        <button className="button button-ghost" onClick={() => onLogoChange(null)}>
          <Trash2 size={16} />
        </button>
        <input
          type="file"
          id="logo-upload"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileInput}
        />
      </div>
    </div>
  );
};

const AIResponderDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [logo, setLogo] = useState(null);
  const [stats] = useState({
    initialMessages: 1,
    followups: 0,
    requests: 0,
    lastReset: '7 hours ago'
  });

  const handleLogoChange = (file) => {
    if (!file) {
      setLogo(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogo(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const renderContent = () => {
    switch(activeSection) {

      

      case 'dashboard':
  return (
    <div className="stats-grid">
      <div className="card stat-card">
        <div className="stat-info">
          <p className="stat-label">Initial Messages</p>
          <p className="stat-value">{stats.initialMessages}</p>
        </div>
        <MessageSquare size={32} color="#059669" />
      </div>
      <div className="card stat-card">
        <div className="stat-info">
          <p className="stat-label">Total Conversations</p>
          <p className="stat-value">3</p>
        </div>
        <MessageSquare size={32} color="#3B82F6" />
      </div>
      <div className="card stat-card">
        <div className="stat-info">
          <p className="stat-label">Followups Sent</p>
          <p className="stat-value">{stats.followups}</p>
        </div>
        <Users size={32} color="#059669" />
      </div>
      <div className="card stat-card">
        <div className="stat-info">
          <p className="stat-label">Bookings Sent</p>
          <p className="stat-value">1</p>
        </div>
        <Link size={32} color="#059669" />
      </div>
      <div className="card stat-card">
        <div className="stat-info">
          <p className="stat-label">Requests Sent</p>
          <p className="stat-value">{stats.requests}</p>
        </div>
        <Timer size={32} color="#059669" />
      </div>
      <div className="card stat-card">
        <div className="stat-info">
          <p className="stat-label">Last Reset</p>
          <p className="stat-value">{stats.lastReset}</p>
        </div>
        <BarChart size={32} color="#059669" />
      </div>
    </div>
  );
      
      case 'payments':
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Payment Information</h2>
            </div>
            <div className="card-content">
              {/* Current Plan */}
              <div className="form-group">
                <label className="form-label">Current Plan</label>
                <div className="card" style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '4px' }}>Professional Plan</h3>
                      <p style={{ color: '#6b7280' }}>$49.99/month</p>
                    </div>
                    <span style={{ 
                      backgroundColor: '#ecfdf5', 
                      color: '#059669',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.875rem'
                    }}>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <div className="card" style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CreditCard size={24} />
                    <div>
                      <p style={{ margin: '0', fontWeight: '500' }}>•••• •••• •••• 4242</p>
                      <p style={{ margin: '0', color: '#6b7280', fontSize: '0.875rem' }}>Expires 12/24</p>
                    </div>
                  </div>
                </div>
                <button className="button button-ghost" style={{ marginTop: '8px' }}>
                  Update Payment Method
                </button>
              </div>

              {/* Billing History */}
              <div className="form-group">
                <label className="form-label">Billing History</label>
                <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr auto', 
                    gap: '16px',
                    padding: '12px',
                    borderBottom: '1px solid #e5e7eb',
                    fontWeight: '500'
                  }}>
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Status</span>
                  </div>
                  {[
                    { date: 'Jan 01, 2024', amount: '$49.99', status: 'Paid' },
                    { date: 'Dec 01, 2023', amount: '$49.99', status: 'Paid' },
                    { date: 'Nov 01, 2023', amount: '$49.99', status: 'Paid' }
                  ].map((invoice, index) => (
                    <div key={index} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr auto', 
                      gap: '16px',
                      padding: '12px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <span>{invoice.date}</span>
                      <span>{invoice.amount}</span>
                      <span style={{ 
                        backgroundColor: '#ecfdf5', 
                        color: '#059669',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '0.875rem'
                      }}>
                        {invoice.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Section */}
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '8px' }}>Need Help?</h3>
                <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                  Having trouble with billing? Contact our support team for assistance.
                </p>
                <button className="button button-primary">Contact Support</button>
              </div>
            </div>
          </div>
        );

        case 'messages':
  return (
    <div className="card h-full">
      <div className="card-header">
        <h2 className="card-title">My Inbox</h2>
      </div>
      <div className="card-body p-0 h-full">
        <MessagesComponent />
      </div>
    </div>
  );
      
  case 'settings':
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">AI Responder Settings</h2>
      </div>
      <div className="card-content">
        <div className="form-group">
          <label className="form-label">Business Name</label>
          <input 
            type="text"
            className="form-input"
            defaultValue="Emerald Stream Capital"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Calendly Integration</label>
          <div style={{ 
            padding: '16px',
            backgroundColor: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fee2e2'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <p style={{ 
                  margin: '0 0 4px 0',
                  fontWeight: '500'
                }}>Calendly Account</p>
                <p style={{ 
                  margin: '0',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>Connect your Calendly account or enter a link manually</p>
              </div>
              <span style={{ 
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                border: '1px solid #fee2e2'
              }}>
                Disconnected
              </span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <select 
                  className="form-input"
                  style={{ flex: 1 }}
                  defaultValue="manual"
                >
                  <option value="manual">Other Calendar URL</option>
                  <option value="calendly" disabled>Connect Calendly to select links</option>
                </select>
                <button 
                  className="button button-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#0A66C2',
                    color: 'white'
                  }}
                  onClick={() => {
                    window.open('https://auth.calendly.com/oauth/authorize', '_blank');
                  }}
                >
                  Connect
                </button>
              </div>
              <input 
                type="text"
                className="form-input"
                placeholder="Enter your calendar link manually (e.g., calendly.com/yourname)"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">LinkedIn Integration</label>
          <div style={{ 
            padding: '16px',
            backgroundColor: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fee2e2'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <p style={{ 
                  margin: '0 0 4px 0',
                  fontWeight: '500'
                }}>LinkedIn Account</p>
                <p style={{ 
                  margin: '0',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>Connect your LinkedIn account to enable automatic outreach</p>
              </div>
              <span style={{ 
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                border: '1px solid #fee2e2'
              }}>
                Disconnected
              </span>
            </div>
            <button 
              className="button button-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#0A66C2',
                color: 'white'
              }}
              onClick={() => {
                window.open('https://www.linkedin.com/oauth/v2/authorization', '_blank');
              }}
            >
              Connect with LinkedIn
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Response Tone</label>
          <select className="form-input">
            <option>Professional</option>
            <option>Friendly</option>
            <option>Formal</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Message Templates</label>
          <textarea 
            className="form-input"
            style={{ height: '128px' }}
            placeholder="Enter your default message template..."
          />
        </div>

        <button className="button button-primary" style={{ width: '10%' }}>
          Save Settings
        </button>
      </div>
    </div>
  );
        
      
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
        <div className="logo-section">
            
            <span className="brand-name">SyncLead</span>
            <span className="brand-name2" style={{ backgroundColor: '#0A66C2', color: 'white', 
                borderRadius: '2px', padding: '0 6px', fontSize: '18px', fontWeight: 'bold'}}>
  in
</span>

          </div>
          <button className="button button-ghost">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <div style={{ marginBottom: '32px' }}>
            
            <h1 style={{ textAlign: 'center', color: "#0A66C2", marginTop: '16px' }}>
              Emerald Stream Capital
            </h1>
          </div>
          
          <nav>
            <button
              className={`nav-button ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <Home size={16} />
              Dashboard
            </button>
            
            <button
              className={`nav-button ${activeSection === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveSection('messages')}
            >
              <MessageSquare size={16} />
              Messages
            </button>
            
            <button
              className={`nav-button ${activeSection === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveSection('payments')}
            >
              <CreditCard size={16} />
              Payments
            </button>
            
            <button
              className={`nav-button ${activeSection === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveSection('settings')}
            >
              <Settings size={16} />
              Settings
            </button>
          </nav>
        </aside>

        <main className="content">
          <div className="content-inner">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIResponderDashboard;