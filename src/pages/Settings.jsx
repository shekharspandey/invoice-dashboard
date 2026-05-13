import { useState } from "react";
import { LuUser, LuLayoutList, LuTags, LuActivity, LuAlignLeft, LuSquareCheck, LuEllipsis, LuDownload } from "react-icons/lu";
import "./Settings.css";

const fieldData = [
  { id: "Basic_info_section", queues: 8, label: "Basic Information (1), Basic Information...", labelCount: 2, fieldType: "Section", fieldTypeCount: 8, dataType: "", viewSource: "Not Set", viewSourceCount: 8, isSection: true },
  { id: "document_id", queues: 8, label: "Document ID (8)", fieldType: "Single Value", fieldTypeCount: 8, dataType: "String", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "date_issue", queues: 8, label: "Issue Date (8)", fieldType: "Single Value", fieldTypeCount: 8, dataType: "Date", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "document_type", queues: 8, label: "Document Type (8)", fieldType: "Single Value", fieldTypeCount: 8, dataType: "Options", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "langauge", queues: 8, label: "Document Language (8)", fieldType: "Single Value", fieldTypeCount: 8, dataType: "Options", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "date_due", queues: 8, label: "Due Date (8)", fieldType: "Single Value", fieldTypeCount: 8, dataType: "Date", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "order_id", queues: 8, label: "Order Number (6), Purchase Order...", labelCount: 2, fieldType: "Single Value", fieldTypeCount: 8, dataType: "String", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "customer_id", queues: 8, label: "Customer ID (7), Customer Number (1)", labelCount: 2, fieldType: "Single Value", fieldTypeCount: 8, dataType: "String", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "date_uzp", queues: 8, label: "Tax Point Date (8)", fieldType: "Single Value", fieldTypeCount: 8, dataType: "Date", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "amount_section", queues: 2, label: "Document ID (8)", fieldType: "Single Value", fieldTypeCount: 8, dataType: "String", dataTypeCount: 8, viewSource: "Captured", viewSourceCount: 8 },
  { id: "customer_id_1", queues: 2, label: "VAR & Amounts (2)", fieldType: "Section", fieldTypeCount: 2, dataType: "String", dataTypeCount: 8, viewSource: "Not Set", viewSourceCount: 8, isSection: true },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("field_manager");

  return (
    <div className="settings-page">
      <div className="settings-sidebar-custom">
        <h2 className="settings-sidebar-title">Settings</h2>
        <div className="settings-tabs">
          <button 
            className={`settings-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <LuUser /> Users
          </button>
          <button 
            className={`settings-tab ${activeTab === 'field_manager' ? 'active' : ''}`}
            onClick={() => setActiveTab('field_manager')}
          >
            <LuLayoutList /> Field Manager
          </button>
          <button 
            className={`settings-tab ${activeTab === 'labels' ? 'active' : ''}`}
            onClick={() => setActiveTab('labels')}
          >
            <LuTags /> Labels
          </button>
          <button 
            className={`settings-tab ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            <LuActivity /> Activities
          </button>
        </div>
      </div>

      <div className="settings-content-wrapper">
        <div className="settings-breadcrumb">
          Settings <span style={{ margin: '0 4px' }}>/</span> Field Managers
        </div>
        
        {activeTab === 'field_manager' && (
          <>
            <div className="settings-header">
              <div className="settings-header-left">
                <div className="settings-header-title">
                  <LuLayoutList style={{ color: '#9a9a92', fontSize: '20px' }} /> Field Manager
                </div>
                <div className="settings-header-desc">
                  Manage all fields in all queues at once. You can bulk edit, delete, copy settings etc.
                </div>
              </div>
              <button className="btn-add-field">Add Field</button>
            </div>

            <div className="fields-table-container">
              <table className="fields-table">
                <thead>
                  <tr>
                    <th>Field ID</th>
                    <th>Queues</th>
                    <th>Label</th>
                    <th>Field Type</th>
                    <th>Data Type</th>
                    <th>View Source</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="td-id">{row.id}</td>
                      <td>
                        <div className="queue-circle">{row.queues}</div>
                      </td>
                      <td>
                        {row.label}
                        {row.labelCount && <span className="label-count-circle">{row.labelCount}</span>}
                      </td>
                      <td>
                        <div className="cell-icon-text">
                          {!row.isSection && <LuEllipsis className="icon-orange" />}
                          <span>{row.fieldType} <span className="table-text-muted">({row.fieldTypeCount})</span></span>
                        </div>
                      </td>
                      <td>
                        {row.dataType && <span>{row.dataType} <span className="table-text-muted">({row.dataTypeCount})</span></span>}
                      </td>
                      <td>
                        <div className="cell-icon-text">
                          {row.viewSource === 'Captured' && <LuSquareCheck className="icon-orange" />}
                          <span>{row.viewSource} <span className="table-text-muted">({row.viewSourceCount})</span></span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        
        {activeTab !== 'field_manager' && (
          <div className="settings-header">
            <div className="settings-header-left">
              <div className="settings-header-title">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('_', ' ')}
              </div>
              <div className="settings-header-desc">
                Design for different tabs will be provided later.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
