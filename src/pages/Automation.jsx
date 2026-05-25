import { useState } from 'react';
import './Automation.css';
import { 
  LuInfo, LuCalendarDays, LuChevronDown, LuChevronRight, 
  LuFileText, LuUser, LuFile, LuSquareCheck, LuList, LuLink,
  LuCopy, LuEye, LuAsterisk, LuEllipsis, LuSearch, 
  LuCheck, LuBan, LuTrash2, LuSettings, LuLayoutTemplate,
  LuArrowLeft, LuFileOutput
} from "react-icons/lu";

const fieldsList = [
  { label: 'Document ID', id: 'document_id', visible: true, exported: true, required: false },
  { label: 'Issue Date', id: 'date_issue', visible: true, exported: true, required: false },
  { label: 'Document Type', id: 'document_type', visible: true, exported: true, required: false },
  { label: 'Document Language', id: 'language', visible: true, exported: true, required: false },
  { label: 'Purchase Order Number', id: 'order_id', visible: true, exported: false, required: false },
  { label: 'Customer ID', id: 'customer_id', visible: true, exported: false, required: false },
  { label: 'Due Date', id: 'date_due', visible: true, exported: false, required: false },
  { label: 'Tax Point Date', id: 'date_uzp', visible: true, exported: false, required: false },
  { label: 'Vendor Order ID', id: 'sender_order_id', visible: true, exported: false, required: false },
  { label: 'Delivery Note ID', id: 'delivery_note_id', visible: true, exported: false, required: false }
];

const tabInfo = {
  basic: {
    title: "Basic Settings",
    subtitle: "Get a quick overview, manage notifications, and configure document splitting."
  },
  fields: {
    title: "Fields",
    subtitle: "Customize the fields you need to capture from a document, calculate from other fields, or manually fill during document review."
  },
  rules: {
    title: "Rules & Actions",
    subtitle: "Configure rules and actions for automated processing."
  },
  emails: {
    title: "Emails",
    subtitle: "Streamline your workflow by directing invoices to designated email address and unleash smart email automation with customizable rules."
  },
  automation: {
    title: "Automation",
    subtitle: "Set up document processing automation. Any interaction with controls will give you estimates to guide your decisions before you save it."
  },
  access: {
    title: "Access",
    subtitle: "Ensure data security and control by defining who can access and work with documents in the queue."
  }
};

const Toggle = ({ checked, onChange }) => (
  <div className={`custom-toggle ${checked ? 'on' : 'off'}`} onClick={onChange}>
    <div className="toggle-circle"></div>
  </div>
);

const Automation = () => {
  const [activeMainTab, setActiveMainTab] = useState('basic');
  const [activeField, setActiveField] = useState(null);
  
  // Automation tab states
  const [automationLevel, setAutomationLevel] = useState('never');
  const [threshold, setThreshold] = useState('97.5%');

  const renderAutomation = () => (
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
            Go to <span style={{color: 'var(--accent)', cursor: 'pointer'}} onClick={() => setActiveMainTab('fields')}>fields</span> tab to configure threshold overrides selected fields.
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

  const renderBasicSettings = () => (
    <div className="auto-content">
      <div className="info-ribbon">
        <div className="ribbon-item">
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}><LuFileText /> Credit notes</div>
          <div className="more-info-badge">More Info <LuInfo size={12} /></div>
        </div>
        <div className="ribbon-item">
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}><LuUser /> 1 Assigned user</div>
          <div className="more-info-badge">More Info <LuInfo size={12} /></div>
        </div>
        <div className="ribbon-item">
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}><LuFile /> 1 Document</div>
          <div className="more-info-badge">More Info <LuInfo size={12} /></div>
        </div>
        <div className="ribbon-item">
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}><LuSquareCheck /> 17 Enabled fields to capture</div>
          <div className="more-info-badge">More Info <LuInfo size={12} /></div>
        </div>
        <div className="ribbon-item">
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}><LuList /> 53 Fields to capture</div>
          <div className="more-info-badge">More Info <LuInfo size={12} /></div>
        </div>
        <div className="ribbon-item">
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}><LuLink /> 0 Attached extensions</div>
          <div className="more-info-badge">More Info <LuInfo size={12} /></div>
        </div>
      </div>

      <div className="accordion-panel">
        <div className="accordion-header"><LuChevronDown /> General</div>
        <div className="accordion-body">
           <div className="form-row">
             <div className="form-label">Name</div>
             <div className="form-control"><input className="auto-input" type="text" value="Credit Notes" readOnly/></div>
           </div>
           <div className="form-row">
             <div className="form-label">Document regional format <LuInfo size={12} style={{marginLeft:'4px'}}/></div>
             <div className="form-control">
               <select className="auto-select">
                 <option>English (United States)</option>
               </select>
             </div>
           </div>
           <div className="form-row">
             <div className="form-label">Annotation session timeout <LuInfo size={12} style={{marginLeft:'4px'}}/></div>
             <div className="form-control" style={{display: 'flex', gap: '8px', alignItems:'center'}}>
               <input className="auto-input" style={{width: '60px'}} type="text" value="01" readOnly/> h
               <input className="auto-input" style={{width: '60px'}} type="text" value="00" readOnly/> m
               <input className="auto-input" style={{width: '60px'}} type="text" value="00" readOnly/> s
             </div>
           </div>
           <div className="form-row">
             <div className="form-label">Email inbox <LuInfo size={12} style={{marginLeft:'4px'}}/></div>
             <div className="form-control" style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'13px'}}>
               <strong>suntec-418cb2@suntec1.app</strong> <LuCopy style={{cursor:'pointer'}} />
             </div>
           </div>
           <div className="form-row">
             <div className="form-label">Allow uploads <LuInfo size={12} style={{marginLeft:'4px'}}/></div>
             <div className="form-control"><Toggle checked={true} /></div>
           </div>
           <div className="form-row">
             <div className="form-label">Queue ID</div>
             <div className="form-control" style={{fontSize:'13px'}}><strong>2540256</strong></div>
           </div>
        </div>
      </div>

      <div className="accordion-panel">
        <div className="accordion-header"><LuChevronDown /> Document</div>
        <div className="accordion-body">
           <div className="form-row">
             <div className="form-label">Split batch files <LuInfo size={12} style={{marginLeft:'4px'}}/></div>
             <div className="form-control">
               <select className="auto-select"><option>Suggest</option></select>
             </div>
           </div>
           <div className="form-row" style={{alignItems:'flex-start'}}>
             <div className="form-label" style={{width:'auto', marginRight:'16px'}}>
               <Toggle checked={false} />
             </div>
             <div className="form-control" style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
               <div>
                 <div style={{fontSize:'13px', marginBottom:'8px'}}>Enable delete recommendations to reduce billable documents</div>
                 <div style={{fontSize:'12px', color:'var(--text-secondary)', lineHeight:'1.5', maxWidth:'600px'}}>You don't have to pay for all documents you receive. Easily avoid being charged for unwanted documents by deleting recommended documents matching defined criteria.</div>
               </div>
               <button className="btn-outline" style={{display:'flex', alignItems:'center', gap:'6px'}}><LuSettings size={14}/> Edit criteria</button>
             </div>
           </div>
        </div>
      </div>

      <div className="accordion-panel">
        <div className="accordion-header"><LuChevronDown /> Notifications</div>
        <div className="accordion-body">
           <p style={{fontSize:'13px', color:'var(--text-secondary)', marginBottom:'24px'}}>Get notified about selected events to your email address of choice.</p>
           <div className="form-row">
             <div className="form-label">Email address</div>
             <div className="form-control"><input className="auto-input" type="text" placeholder="Email" /></div>
           </div>
           <div className="form-row" style={{alignItems:'flex-start'}}>
             <div className="form-label">Events to notify you about</div>
             <div className="form-control" style={{display:'flex', flexDirection:'column', gap:'16px'}}>
               <div style={{display:'flex', justifyContent:'space-between', maxWidth:'300px', fontSize:'13px', alignItems:'center'}}>
                 <strong>Unprocessable attachments</strong> <Toggle checked={false} />
               </div>
               <div style={{display:'flex', justifyContent:'space-between', maxWidth:'300px', fontSize:'13px', alignItems:'center'}}>
                 <strong>Postponed documents</strong> <Toggle checked={false} />
               </div>
               <div style={{display:'flex', justifyContent:'space-between', maxWidth:'300px', fontSize:'13px', alignItems:'center'}}>
                 <strong>Deleted documents</strong> <Toggle checked={false} />
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="accordion-panel"><div className="accordion-header"><LuChevronRight /> Confirmed state <LuInfo size={14} style={{color:'var(--text-secondary)', marginLeft:'4px'}}/></div></div>
      <div className="accordion-panel"><div className="accordion-header"><LuChevronRight /> Advanced</div></div>
      <div className="accordion-panel"><div className="accordion-header"><LuChevronRight /> AI Engine</div></div>
    </div>
  );

  const renderFields = () => (
    <div className="auto-content">
      <div className="field-section">
        <div className="field-section-header"><LuChevronDown /> Basic Settings</div>
        <div className="field-section-body">
          {fieldsList.map((f, i) => (
            <div className="field-row" key={i} onClick={() => setActiveField(f)}>
              <div className="field-icon"><LuLayoutTemplate /></div>
              <div className="field-name">{f.label}</div>
              <div className="field-id">{f.id}</div>
              <div className="field-actions">
                <LuEye className={f.visible ? 'active' : ''} />
                <LuFileOutput className={f.exported ? 'active' : ''} />
                <LuAsterisk className={f.required ? 'active' : ''} />
                <LuEllipsis />
                {i === 0 && <div className="nav-circle"><LuChevronRight size={14} /></div>}
              </div>
            </div>
          ))}
          <div style={{padding:'16px', display:'flex', justifyContent:'flex-end'}}>
            <button className="btn-purple">Add Field</button>
          </div>
        </div>
      </div>
      <div className="field-section"><div className="field-section-header"><LuChevronRight /> Payment Instructions</div></div>
      <div className="field-section"><div className="field-section-header"><LuChevronRight /> Totals and Subtotals</div></div>
      <div className="field-section"><div className="field-section-header"><LuChevronRight /> Line Items</div></div>
      <div className="field-section"><div className="field-section-header"><LuChevronRight /> Other</div></div>
    </div>
  );

  const renderEmails = () => (
    <div className="auto-content">
      <div className="alert-box">
        <LuInfo size={18} />
        <div>
          By sending documents to your inbox email address, documents get processed automatically to your queue. You can provide this address to your suppliers and they can send the documents directly to your Suntec inbox. <span style={{color:'var(--accent)', cursor:'pointer', textDecoration:'underline'}}>Find more information</span>
        </div>
      </div>

      <div className="accordion-panel">
        <div className="accordion-header"><LuChevronDown /> General</div>
        <div className="accordion-body">
           <div className="form-row">
             <div className="form-label">Name</div>
             <div className="form-control" style={{fontSize:'13px', display:'flex', alignItems:'center', gap:'8px'}}>
               <strong>suntec-418cb2@suntec1.app</strong> <LuCopy style={{cursor:'pointer'}}/>
             </div>
           </div>
           <div className="form-row">
             <div className="form-label">Email prefix <LuInfo size={12} style={{marginLeft:'4px'}}/></div>
             <div className="form-control"><input className="auto-input" type="text" value="Suntec" readOnly /></div>
           </div>
           <div className="form-row">
             <div className="form-label">Email name <LuInfo size={12} style={{marginLeft:'4px'}}/></div>
             <div className="form-control"><input className="auto-input" type="text" value="Credit notes" readOnly /></div>
           </div>
        </div>
      </div>

      <div className="accordion-panel">
        <div className="accordion-header"><LuChevronDown /> Sender Allowlist and Denylist</div>
        <div className="accordion-body">
           <p style={{fontSize:'13px', color:'var(--text-secondary)', marginBottom:'24px', marginLeft:'250px'}}>Filter all emails coming to your inbox based on the sender's email address.</p>
           <div className="form-row" style={{marginLeft:'250px', marginBottom:'16px'}}>
             <Toggle checked={false} /> <strong style={{fontSize:'13px', marginLeft:'12px'}}>Allowlist – only accept emails from a specified list of email addresses</strong>
           </div>
           <div className="form-row" style={{marginLeft:'250px'}}>
             <Toggle checked={false} /> <strong style={{fontSize:'13px', marginLeft:'12px'}}>Denylist – block emails from a specified list of addresses</strong>
           </div>
        </div>
      </div>

      <div className="accordion-panel">
        <div className="accordion-header"><LuChevronDown /> Smart Email Automation</div>
        <div className="accordion-body">
           <div className="upgrade-banner">
             <span className="upgrade-badge">Available after Upgrade</span> Save your time with automatic processing rules based on the email contents!
           </div>
           <p style={{fontSize:'13px', color:'var(--text-secondary)', marginBottom:'24px'}}>Save your time with automatic processing rules based on the email contents!</p>
           
           <div className="email-action-row">
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
               <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                 <Toggle checked={true} /> <strong style={{fontSize:'13px'}}>Attachment filtering</strong>
               </div>
               <button className="btn-outline" style={{display:'flex', alignItems:'center', gap:'6px'}}><LuSettings size={14}/> Filtering Rules</button>
             </div>
             <p style={{fontSize:'12px', color:'var(--text-secondary)', lineHeight:'1.5'}}>Automatically delete attachments such as company logos and pictures. Filtering rules are preset with recommended values that filter out typical irrelevant email attachments. You can fine-tune filterings rules in the settings.</p>
           </div>

           <div className="email-action-row">
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
               <strong style={{fontSize:'13px'}}>Notify the sender of emails without processable attachments.</strong>
               <div style={{display:'flex', gap:'8px'}}>
                 <button className="btn-outline" style={{fontSize:'11px', padding:'4px 8px'}}>Automate: Off</button>
                 <button className="btn-outline" style={{fontSize:'11px', padding:'4px 8px', display:'flex', gap:'6px', alignItems:'center'}}><LuLayoutTemplate size={12}/> Edit Template</button>
               </div>
             </div>
             <p style={{fontSize:'12px', color:'var(--text-secondary)', lineHeight:'1.5'}}>Occasionally, people forget to attach a document or the document is damaged. Suntec can respond automatically in these cases so the vendor can immediately send a correct document. You can always check the response in the <span style={{color:'var(--accent)', cursor:'pointer', textDecoration:'underline'}}>Email dashboard.</span></p>
           </div>

           <h4 style={{fontSize:'14px', margin:'24px 0 12px'}}>Email templates</h4>
           <p style={{fontSize:'12px', color:'var(--text-secondary)', marginBottom:'16px'}}>If you need to send a certain type of email repeatedly, create a template. You can set up automatic sending based on a trigger.</p>
           
           {['Annotation status change - confirmed', 'Annotation status change - exported', 'Annotation status change - received'].map((tpl, i) => (
             <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0'}}>
               <span style={{fontSize:'13px'}}>{tpl}</span>
               <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                 <button className="btn-outline" style={{fontSize:'11px', padding:'4px 8px'}}>Automate: Off</button>
                 <button className="btn-outline" style={{fontSize:'11px', padding:'4px 8px', display:'flex', gap:'6px', alignItems:'center'}}><LuLayoutTemplate size={12}/> Edit Template</button>
                 <LuTrash2 size={14} style={{color:'var(--text-secondary)', cursor:'pointer'}} />
               </div>
             </div>
           ))}
           <button className="btn-outline" style={{marginTop:'16px', fontSize:'12px', display:'flex', alignItems:'center', gap:'6px'}}><LuLayoutTemplate size={12}/> Create a new template</button>
        </div>
      </div>

      <div className="accordion-panel">
        <div className="accordion-header"><LuChevronDown /> Document Rejection</div>
        <div className="accordion-body">
           <p style={{fontSize:'12px', color:'var(--text-secondary)', marginBottom:'24px'}}>Every document can be rejected by you or other users in your organization. After rejection, we send an email back to the sender of the document indicating that it has been rejected, along with a custom note you may add at the time of rejection.</p>
           
           <div className="email-action-row" style={{marginBottom:'24px'}}>
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
               <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                 <Toggle checked={true} /> <strong style={{fontSize:'13px'}}>Manual rejections</strong>
               </div>
               <button className="btn-outline" style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', padding:'4px 8px'}}><LuLayoutTemplate size={12}/> Edit Template</button>
             </div>
             <p style={{fontSize:'12px', color:'var(--text-secondary)', lineHeight:'1.5'}}>Turning this option on will show annotators the reject function so they can reject documents manually. It also displays the Rejected tab on the document dashboard.</p>
           </div>

           <h4 style={{fontSize:'14px', margin:'24px 0 12px'}}>Rejection email templates</h4>
           <p style={{fontSize:'12px', color:'var(--text-secondary)', marginBottom:'16px'}}>If you need to send a certain type of email repeatedly, create a template. You can set up automatic sending based on a trigger.</p>
           <p style={{fontSize:'12px', color:'var(--text-secondary)', marginBottom:'16px'}}>There are currently no email templates.</p>
           <button className="btn-outline" style={{fontSize:'12px', display:'flex', alignItems:'center', gap:'6px'}}><LuLayoutTemplate size={12}/> Create a new rejection template</button>
        </div>
      </div>
    </div>
  );

  const renderAccess = () => (
    <div className="auto-content">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
        <h3 style={{fontSize:'16px', fontWeight:'600'}}>Users</h3>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
          <button className="btn-outline" style={{display:'flex', alignItems:'center', gap:'6px'}}><LuCheck size={14}/> Enable All</button>
          <button className="btn-outline" style={{display:'flex', alignItems:'center', gap:'6px'}}><LuBan size={14}/> Disable All</button>
          <div className="search-box">
            <input type="text" placeholder="Search User" className="auto-input" style={{width:'200px', paddingRight:'32px'}} />
            <LuSearch className="search-icon" />
          </div>
        </div>
      </div>

      <div className="users-list">
        <div className="user-row">
          <div className="user-info">
            <div className="user-name">John Smith</div>
            <div className="user-email">johnsmith@gmail.com</div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'24px'}}>
            <div className="user-role-badge">Admin</div>
            <Toggle checked={true} />
          </div>
        </div>
        <div className="user-row">
          <div className="user-info">
            <div className="user-name">Samantha William</div>
            <div className="user-email">samantha@gmail.com</div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'24px'}}>
            <div className="user-role-badge">Manager</div>
            <Toggle checked={true} />
          </div>
        </div>
        <div className="user-row">
          <div className="user-info">
            <div className="user-name">Karen Hope</div>
            <div className="user-email">karen-hope@gmail.com</div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'24px'}}>
            <div className="user-role-badge">Viewer</div>
            <Toggle checked={false} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFieldDetail = () => (
    <div className="auto-content" style={{gap: '16px'}}>
      <div className="toggle-row">
        <div className="toggle-row-left">
          <LuEye className="toggle-row-icon" size={20} />
          <div>
            <div style={{fontSize:'14px', fontWeight:'600', marginBottom:'4px'}}>Visible</div>
            <div style={{fontSize:'12px', color:'var(--text-secondary)'}}>Visibility of the field on the validation screen.</div>
          </div>
        </div>
        <Toggle checked={true} />
      </div>

      <div className="toggle-row">
        <div className="toggle-row-left">
          <LuFileOutput className="toggle-row-icon" size={20} />
          <div>
            <div style={{fontSize:'14px', fontWeight:'600', marginBottom:'4px'}}>Exported</div>
            <div style={{fontSize:'12px', color:'var(--text-secondary)'}}>Include the field in a manual export.</div>
          </div>
        </div>
        <Toggle checked={true} />
      </div>

      <div className="toggle-row">
        <div className="toggle-row-left">
          <LuAsterisk className="toggle-row-icon gray" size={20} />
          <div>
            <div style={{fontSize:'14px', fontWeight:'600', marginBottom:'4px'}}>Required</div>
            <div style={{fontSize:'12px', color:'var(--text-secondary)'}}>The field has to have a value before confirmation.</div>
          </div>
        </div>
        <Toggle checked={false} />
      </div>

      <div className="accordion-panel" style={{marginTop:'8px'}}>
        <div className="accordion-header" style={{flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}><LuChevronDown /> Type & Source</div>
          <div style={{fontSize:'12px', color:'var(--text-secondary)', fontWeight:'normal', marginLeft:'24px'}}>Customize your AI engine settings by selecting field types and defining document sources for streamlined document processing.</div>
        </div>
        <div className="accordion-body" style={{paddingTop:'16px'}}>
          <div className="form-row" style={{marginBottom:'12px'}}>
            <div className="form-label">Field Type</div>
            <div className="form-control"><select className="auto-select"><option>Simple Value</option></select></div>
          </div>
          <div className="form-row" style={{marginBottom:'12px'}}>
            <div className="form-label">Value Source</div>
            <div className="form-control"><select className="auto-select"><option>Captured</option></select></div>
          </div>
          <div className="form-row" style={{marginBottom:'0'}}>
            <div className="form-label">Editing</div>
            <div className="form-control"><select className="auto-select"><option>Enabled</option></select></div>
          </div>
        </div>
      </div>

      <div className="accordion-panel">
        <div className="accordion-header" style={{flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}><LuChevronDown /> Captured by AI engine</div>
          <div style={{fontSize:'12px', color:'var(--text-secondary)', fontWeight:'normal', marginLeft:'24px'}}>If you want to edit data type go to <span style={{color:'var(--accent)', cursor:'pointer', textDecoration:'underline'}}>engine field settings.</span></div>
        </div>
        <div className="accordion-body" style={{paddingTop:'16px'}}>
          <div className="form-row" style={{marginBottom:'12px'}}>
            <div className="form-label">Engine name:</div>
            <div className="form-control" style={{fontSize:'13px'}}><strong>Credit notes</strong></div>
          </div>
          <div className="form-row" style={{marginBottom:'12px'}}>
            <div className="form-label">Label of AI engine field:</div>
            <div className="form-control" style={{fontSize:'13px'}}><strong>Document ID</strong></div>
          </div>
          <div className="form-row" style={{marginBottom:'12px'}}>
            <div className="form-label">Data type:</div>
            <div className="form-control" style={{fontSize:'13px'}}><strong>String types - String</strong></div>
          </div>
          <div className="form-row" style={{marginBottom:'24px'}}>
            <div className="form-label">Pre-trained field ID:</div>
            <div className="form-control" style={{fontSize:'13px'}}><strong>document_id</strong></div>
          </div>

          <div className="form-row" style={{marginBottom:'24px'}}>
            <div className="form-label"></div>
            <div className="form-control">
              <div style={{background:'var(--surface2)', padding:'16px', borderRadius:'8px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontSize:'12px', color:'var(--text-secondary)'}}>This section is connected to existing engine field.<br/>Use engine settings to edit this.</div>
                <button className="btn-outline" style={{fontSize:'12px', padding:'6px 12px', display:'flex', alignItems:'center', gap:'6px'}}><LuSettings size={14}/> Go to Settings</button>
              </div>
            </div>
          </div>

          <div className="form-row" style={{alignItems:'flex-start'}}>
            <div className="form-label" style={{marginTop:'8px'}}>Threshold</div>
            <div className="form-control">
              <input type="number" className="auto-input" value="0" readOnly style={{marginBottom:'8px'}} />
              <div style={{fontSize:'11px', color:'var(--text-secondary)', lineHeight:'1.5'}}>The field will be automated if the AI confidence is above the threshold; manual validation will be required otherwise. This only applies to queues with "confident automation" enabled.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (activeField) {
    return (
      <div className="auto-page">
        <div className="auto-breadcrumb" onClick={() => setActiveField(null)} style={{cursor:'pointer', color:'var(--text-secondary)'}}>
          <LuArrowLeft style={{verticalAlign:'middle', marginRight:'4px'}}/> Settings <span style={{ margin: '0 6px' }}>/</span> Queues <span style={{ margin: '0 6px' }}>/</span> Credit Notes (Suntec) <span style={{ margin: '0 6px' }}>/</span> Basic Information <span style={{ margin: '0 6px' }}>/</span> {activeField.label}
        </div>

        <div className="auto-header-area">
          <div className="auto-title-row" style={{marginBottom: 0}}>
            <div>
              <h1 className="auto-title">{activeField.label}</h1>
            </div>
            <div className="auto-header-actions">
               <button className="btn-outline">Edit JSON</button>
               <button className="btn-outline" style={{display:'flex', alignItems:'center', gap:'6px'}}><LuTrash2 size={14}/> Delete</button>
               <button className="btn-purple" onClick={() => setActiveField(null)}>Save</button>
            </div>
          </div>
        </div>

      <div className="auto-surface-card">
        <div className="auto-tabs-bar">
          <div className="auto-tabs">
            <button className="auto-tab active">Field Detail</button>
          </div>
        </div>
        <div className="auto-surface-card-inner">
          {renderFieldDetail()}
        </div>
      </div>
    </div>
  );
  }

  return (
    <div className="auto-page">
      <div className="auto-breadcrumb">
        Settings <span style={{ margin: '0 6px' }}>/</span> Queues <span style={{ margin: '0 6px' }}>/</span> Credit Notes (Suntec) <span style={{ margin: '0 6px' }}>/</span> {tabInfo[activeMainTab]?.title}
      </div>

      <div className="auto-header-area">
        <div className="auto-title-row">
          <div>
            <h1 className="auto-title">{tabInfo[activeMainTab]?.title}</h1>
            <p className="auto-subtitle">{tabInfo[activeMainTab]?.subtitle}</p>
          </div>
          <div className="auto-header-actions">
             {activeMainTab === 'fields' && (
               <>
                 <button className="btn-outline">Edit JSON</button>
                 <button className="btn-outline">Reorder Sections</button>
                 <button className="btn-purple">Add Section</button>
               </>
             )}
             {activeMainTab === 'basic' && (
               <button className="btn-purple">Open Documents</button>
             )}
          </div>
        </div>
      </div>

      <div className="auto-surface-card">
        <div className="auto-tabs-bar">
          <div className="auto-tabs">
            <button className={`auto-tab ${activeMainTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveMainTab('basic')}>Basic Settings</button>
            <button className={`auto-tab ${activeMainTab === 'fields' ? 'active' : ''}`} onClick={() => setActiveMainTab('fields')}>Fields</button>
            <button className={`auto-tab ${activeMainTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveMainTab('rules')}>Rules & Actions</button>
            <button className={`auto-tab ${activeMainTab === 'emails' ? 'active' : ''}`} onClick={() => setActiveMainTab('emails')}>Emails</button>
            <button className={`auto-tab ${activeMainTab === 'automation' ? 'active' : ''}`} onClick={() => setActiveMainTab('automation')}>Automation</button>
            <button className={`auto-tab ${activeMainTab === 'access' ? 'active' : ''}`} onClick={() => setActiveMainTab('access')}>Access</button>
          </div>
        </div>
        <div className="auto-surface-card-inner">
          {activeMainTab === 'basic' && renderBasicSettings()}
          {activeMainTab === 'fields' && renderFields()}
          {activeMainTab === 'emails' && renderEmails()}
          {activeMainTab === 'access' && renderAccess()}
          {activeMainTab === 'automation' && renderAutomation()}
          {activeMainTab === 'rules' && <div className="auto-content"><div style={{textAlign:'center', padding:'48px 0', color:'var(--text-secondary)'}}>Rules & Actions tab is currently under construction.</div></div>}
        </div>
      </div>
    </div>
  );
};

export default Automation;
