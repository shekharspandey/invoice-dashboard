import { useState } from 'react';
import './Extensions.css';
import { 
  LuInfo, LuSearch, LuChevronLeft, LuChevronRight, LuPlus, LuCircleHelp, 
  LuMail, LuLayoutGrid, LuCode, LuServer, LuX, LuBox, LuSettings, 
  LuFileOutput, LuCircleCheck, LuPlugZap, LuTriangleAlert, LuComponent 
} from "react-icons/lu";

const Logo = ({ type }) => {
  if (type === 'datahub') {
    return <div className="mock-logo"><span style={{color:'#d97706'}}>●</span> DataHub</div>;
  }
  if (type === 'nexus') {
    return <div className="mock-logo"><span style={{color:'#1e3a8a'}}>▲</span> NEXUS</div>;
  }
  if (type === 'finance') {
    return <div className="mock-logo"><span style={{color:'#1f2937'}}>■</span> Finance</div>;
  }
  return <div className="mock-logo">Logo</div>;
};

const storeItems = [
  { name: 'datahub', title: 'Master Data Hub', desc: 'Enhance the extracted data with details from your master records.' },
  { name: 'nexus', title: 'Nexus Digital Company', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam, urna nec bibendum elementum.' },
  { name: 'finance', title: 'Finanzo Analytic and Reporting', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'datahub', title: 'Master Data Hub', desc: 'Enhance the extracted data with details from your master records.' },
  { name: 'nexus', title: 'Nexus Digital Company', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam, urna nec bibendum elementum.' },
  { name: 'finance', title: 'Finanzo Analytic and Reporting', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

const MyExtensionsTab = ({ showIntro, setShowIntro }) => {
  return (
    <div className="my-ext-container">
      <div className="my-ext-controls">
        <button className="btn-outline ext-filter-btn"><LuPlus /> Add Filter</button>
        <div className="ext-view-toggles">
          <button className="view-toggle active">List View</button>
          <button className="view-toggle">Dependency Graph</button>
        </div>
      </div>

      <div className="ext-alert ext-alert-warning">
        <LuTriangleAlert className="alert-icon" />
        <span><strong>Explore our Extensions for free!</strong> This feature will be limited later according to your subscription plan.</span>
      </div>

      {showIntro && (
        <div className="ext-intro-box">
          <button className="close-intro" onClick={() => setShowIntro(false)}><LuX /></button>
          <div className="intro-icon-wrap"><LuComponent /></div>
          <div className="intro-content-wrap">
            <h3>Introduction to Extensions</h3>
            <p>There are a large number of events in Suntec that your operators or you might want to react to as part of your workflow.</p>
          </div>
          <div className="intro-chips">
            <span className="intro-chip"><LuBox /> Receive</span>
            <span className="intro-chip"><LuSettings /> Understand</span>
            <span className="intro-chip"><LuCircleCheck /> Act</span>
            <span className="intro-chip"><LuFileOutput /> Export</span>
          </div>
        </div>
      )}

      <div className="ext-empty-state">
        <LuLayoutGrid className="empty-icon" />
        <h3>Choose from pre-built extensions</h3>
        <p>Seamlessly integrate a pre-built extension with one click.</p>
        <button className="btn-outline">Visit Suntec Store</button>
      </div>

      <div className="ext-create-section">
        <h3>Create the first extension</h3>
        <p>To enable you to set up such an event notification system, we have prepared two extension types for you.</p>

        <div className="ext-cards-grid">
          <div className="ext-create-card">
            <div className="ext-card-graphic">
              <div className="graphic-icon"><LuBox /></div> 
              <span className="graphic-dots">.......</span> 
              <div className="graphic-icon"><LuCode /></div>
            </div>
            <h4>Custom function</h4>
            <p>Can be customized to your needs to process event notifications without managing your own computational resources, such as a web server.</p>
            <div className="ext-card-actions">
              <button className="btn-text">Read More <LuChevronRight/></button>
              <button className="btn-outline"><LuCode /> Create Function</button>
            </div>
          </div>
          <div className="ext-create-card">
            <div className="ext-card-graphic">
              <div className="graphic-icon"><LuBox /></div> 
              <span className="graphic-dots">.......</span> 
              <div className="graphic-icon"><LuServer /></div>
            </div>
            <h4>Webhook</h4>
            <p>Can send an event notification to a web service defined by an URL.</p>
            <div className="ext-card-actions">
              <button className="btn-text">Read More <LuChevronRight/></button>
              <button className="btn-outline"><LuServer /> Create Webhook</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuntecStoreTab = () => {
  return (
    <div className="store-container">
      <div className="ext-alert ext-alert-info">
        <LuComponent className="alert-icon" style={{color: 'var(--accent)'}} />
        <span><strong>Leverage the pre-built extensions and integrations</strong> to automate your workflow and easily add entirely new capabilities.</span>
      </div>

      <div className="store-search">
        <input type="text" placeholder="Search for capability, name or description" />
        <LuSearch className="search-icon" />
      </div>

      <div className="store-list">
        {storeItems.map((item, i) => (
          <div key={i} className="store-list-item">
            <div className="store-item-logo">
               <Logo type={item.name} />
            </div>
            <div className="store-item-content">
               <h4 className="store-item-title"><LuPlugZap style={{color:'var(--text-secondary)'}} /> {item.title}</h4>
               <p className="store-item-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="store-pagination">
        <div className="page-numbers">
          <span className="page-num active">1</span>
          <span className="page-num">2</span>
          <span className="page-num">3</span>
          <span className="page-num">4</span>
        </div>
        <div className="page-controls">
          <span className="items-per-page">Items Per Page <select><option>15</option></select></span>
          <button className="btn-outline btn-sm"><LuChevronLeft /> Back</button>
          <button className="btn-outline btn-sm">Next <LuChevronRight /></button>
        </div>
      </div>

      <div className="store-footer-cards">
        <div className="footer-card">
           <div className="f-icon"><LuPlus /></div>
           <div className="f-content">
             <h4>Cannot find a suitable extension?</h4>
             <p>Create your own!</p>
             <button className="btn-outline btn-sm btn-orange">Create</button>
           </div>
        </div>
        <div className="footer-card">
           <div className="f-icon"><LuCircleHelp /></div>
           <div className="f-content">
             <h4>Find out<br/>how to create an extension.</h4>
             <button className="btn-outline btn-sm btn-orange">Read More</button>
           </div>
        </div>
        <div className="footer-card">
           <div className="f-icon"><LuMail /></div>
           <div className="f-content">
             <h4>Want to showcase<br/>your extension in the Suntec Store?</h4>
             <button className="btn-outline btn-sm btn-orange">Contact Us</button>
           </div>
        </div>
      </div>
    </div>
  );
};

const Extensions = () => {
  const [activeTab, setActiveTab] = useState('suntec_store');
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="ext-page">
      <div className="ext-header-area">
        <div className="ext-top-row">
          <h1 className="ext-title">
             {activeTab === 'suntec_store' ? 'Rossum Store' : 'My Extensions'}
             {activeTab === 'my_extensions' && <span className="ext-badge">0</span>}
             {activeTab === 'my_extensions' && <LuInfo className="ext-info-icon" />}
          </h1>
          {activeTab === 'my_extensions' && (
            <button className="btn-primary">Create Extension</button>
          )}
        </div>
        
        <div className="ext-tabs">
          <button className={`ext-tab ${activeTab === 'my_extensions' ? 'active' : ''}`} onClick={() => setActiveTab('my_extensions')}>My Extensions</button>
          <button className={`ext-tab ${activeTab === 'suntec_store' ? 'active' : ''}`} onClick={() => setActiveTab('suntec_store')}>Suntec Store</button>
          <button className={`ext-tab ${activeTab === 'activities' ? 'active' : ''}`} onClick={() => setActiveTab('activities')}>Activities</button>
        </div>
      </div>

      <div className="ext-content">
        {activeTab === 'my_extensions' && <MyExtensionsTab showIntro={showIntro} setShowIntro={setShowIntro} />}
        {activeTab === 'suntec_store' && <SuntecStoreTab />}
      </div>
    </div>
  );
};

export default Extensions;
