import { useState } from 'react';
import './Automation.css';
import { LuInfo, LuCalendarDays, LuChevronDown } from "react-icons/lu";

const Automation = () => {
  const [activeMainTab, setActiveMainTab] = useState('automation');
  const [automationLevel, setAutomationLevel] = useState('never');
  const [threshold, setThreshold] = useState('97.5%');

  const renderContent = () => {
    if (activeMainTab !== 'automation') {
      return (
        <div className="auto-content">
          <div className="auto-card" style={{ textAlign: 'center', padding: '48px 0', border: 'none' }}>
            <h3>{activeMainTab.replace('_', ' ').toUpperCase()}</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>This tab is currently under construction.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="auto-content">
        <div className="auto-card">
          <div className="auto-card-header">
            <div>
              <h3 className="auto-card-title">Document automation</h3>
              <p className="auto-card-desc" style={{ marginBottom: 0 }}>Select the level of document automation that works best for you in your current situation.</p>
            </div>
            <button className="more-info-btn">More info <LuInfo /></button>
          </div>

          <div className="auto-radio-group" style={{ marginTop: '24px' }}>
            <label className="auto-radio-item">
              <input 
                type="radio" 
                name="automationLevel" 
                checked={automationLevel === 'confident'} 
                onChange={() => setAutomationLevel('confident')} 
              />
              <div className="radio-label-wrap">
                <span className="radio-title">Confident</span>
                <span className="radio-rec">Recommended</span>
              </div>
              <p className="radio-desc">The document will be automated if Suntec AI is confident enough in the extractions of all required fields. Documents with lower confidence will be presented for human review. You can customize the degree of automation by setting confidence score thresholds below.</p>
            </label>

            <label className="auto-radio-item">
              <input 
                type="radio" 
                name="automationLevel" 
                checked={automationLevel === 'always'} 
                onChange={() => setAutomationLevel('always')} 
              />
              <div className="radio-label-wrap">
                <span className="radio-title">Always</span>
              </div>
              <p className="radio-desc">Documents will always be automated, regardless of AI confidence.</p>
            </label>

            <label className="auto-radio-item">
              <input 
                type="radio" 
                name="automationLevel" 
                checked={automationLevel === 'never'} 
                onChange={() => setAutomationLevel('never')} 
              />
              <div className="radio-label-wrap">
                <span className="radio-title">Never</span>
              </div>
              <p className="radio-desc">All documents will be presented for human review.</p>
            </label>
          </div>
        </div>

        <div className="auto-card">
          <h3 className="auto-card-title">Default confidence score threshold</h3>
          <p className="auto-card-desc" style={{ marginBottom: 0 }}>This threshold will be applied to fields that don't have a specific threshold configured</p>
          
          <div className="threshold-wrap">
            <div className="threshold-pills">
              {['0%', '65%', '80%', '97.5%', '100%', 'Custom'].map(val => (
                <button 
                  key={val} 
                  className={`t-pill ${threshold === val ? 'active' : ''}`}
                  onClick={() => setThreshold(val)}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="threshold-hint">
              Go to <a href="#" className="hint-link">fields</a> tab to configure threshold overrides selected fields.
            </div>
          </div>
        </div>

        <div className="auto-card">
          <h3 className="auto-card-title">Automation data</h3>
          <p className="auto-card-desc">Gain more insights into automation.</p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Do you want to increase the automation rate of the documents?</p>
          <ol className="auto-data-list">
            <li>Identify the fields with the lowest automation rate.</li>
            <li>Find the fields where the confidence score mean is high but the automation rate is low.</li>
            <li>Lower the thresholds for the selected fields. You can use the confidence score mean column as your guide. Proceed with caution, since lowering the threshold can cause more errors with automated documents. These changes will only affect newly uploaded documents.</li>
          </ol>
        </div>

        <div className="auto-card">
          <div className="auto-table-header">
            <div className="doc-count">
              <span className="doc-count-badge">0</span> out of 0 documents automated
            </div>
            <div className="month-dropdown">
              <LuCalendarDays /> This month <LuChevronDown />
            </div>
          </div>
          <table className="auto-table">
            <thead>
              <tr>
                <th>Field label</th>
                <th>Score threshold</th>
                <th>Automation rate</th>
                <th>Confidence score mean</th>
              </tr>
            </thead>
          </table>
          <div className="auto-empty-table">
            There is no data for this range.
          </div>
        </div>

        <div className="auto-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="auto-card-title" style={{ marginBottom: 0 }}>
            Automation blockers <span className="beta-badge">Beta</span>
          </h3>
          <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
            There is no data for this range.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="auto-page">
      <div className="auto-breadcrumb">
        Settings <span style={{ margin: '0 6px' }}>/</span> Queues <span style={{ margin: '0 6px' }}>/</span> Credit Notes (Suntec) <span style={{ margin: '0 6px' }}>/</span> Automation
      </div>

      <div className="auto-header-area">
        <h1 className="auto-title">Automation</h1>
        <p className="auto-subtitle">Set up document processing automation. Any interaction with controls will give you estimates to guide your decisions before you save it.</p>
        
        <div className="auto-tabs">
          <button className={`auto-tab ${activeMainTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveMainTab('basic')}>Basic Settings</button>
          <button className={`auto-tab ${activeMainTab === 'fields' ? 'active' : ''}`} onClick={() => setActiveMainTab('fields')}>Fields</button>
          <button className={`auto-tab ${activeMainTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveMainTab('rules')}>Rules & Actions</button>
          <button className={`auto-tab ${activeMainTab === 'emails' ? 'active' : ''}`} onClick={() => setActiveMainTab('emails')}>Emails</button>
          <button className={`auto-tab ${activeMainTab === 'automation' ? 'active' : ''}`} onClick={() => setActiveMainTab('automation')}>Automation</button>
          <button className={`auto-tab ${activeMainTab === 'access' ? 'active' : ''}`} onClick={() => setActiveMainTab('access')}>Access</button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Automation;
