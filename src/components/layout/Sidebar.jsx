import React, { useState } from "react";
import { LuChevronDown, LuSearch, LuFileText, LuPlus, LuUserPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openQueues, setOpenQueues] = useState(true);

  const queues = [
    { name: "Credit Notes", count: 1 },
    { name: "Debit Notes", count: 2 },
    { name: "Delivery Notes", count: 1 },
    { name: "Pro Forma Invoices", count: 2 },
    { name: "Purchase Orders", count: 5 },
    { name: "Tax Invoices (EU)", count: 4 },
    { name: "Tax Invoices (UK)", count: 3 },
    { name: "Tax Invoices (US)", count: 5 }
  ];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-inner" style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* TOP TITLE ROW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>All Documents</h2>
          <button style={{ 
            background: 'rgba(204, 85, 0, 0.1)', 
            border: '1px solid rgba(204, 85, 0, 0.2)', 
            color: '#CC5500', 
            borderRadius: '6px', 
            padding: '4px 8px', 
            fontSize: '11px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            <LuPlus size={12}/> Add
          </button>
        </div>

        {/* SEARCH ROW */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'var(--surface2)', 
            borderRadius: '6px', 
            padding: '6px 12px', 
            flex: 1,
            border: '1px solid var(--border)'
          }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginRight: '6px' }}>Sort</span>
            <LuChevronDown size={14} style={{ color: 'var(--text-secondary)' }}/>
            <div style={{ flex: 1 }}></div>
            <LuSearch size={14} style={{ color: 'var(--text-secondary)' }}/>
          </div>
        </div>

        {/* TREE VIEW */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '12px' }} onClick={() => setOpenQueues(!openQueues)}>
            <LuFileText style={{ color: 'var(--text-secondary)' }} />
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Suntec <span style={{color: '#CC5500'}}>[23]</span></span>
            <div style={{ flex: 1 }}></div>
            <LuChevronDown style={{ 
              color: 'var(--text-secondary)', 
              transform: openQueues ? 'rotate(180deg)' : 'rotate(0deg)', 
              transition: 'transform 0.3s' 
            }} />
          </div>

          {openQueues && (
            <div style={{ position: 'relative', marginLeft: '9px', paddingLeft: '16px', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {queues.map(q => (
                <div key={q.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', cursor: 'pointer', position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: '-16px', 
                    top: '50%', 
                    width: '10px', 
                    height: '1px', 
                    background: 'var(--border)' 
                  }}></div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>{q.name}</span>
                  <span style={{ 
                    background: '#CC5500', 
                    color: '#fff', 
                    borderRadius: '50%', 
                    width: '18px', 
                    height: '18px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '10px', 
                    fontWeight: 'bold' 
                  }}>{q.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM BUTTON */}
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <button style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '10px',
            color: 'var(--text-primary)',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = '#CC5500'}
          onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <LuUserPlus size={16} /> Invite New Colleague
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;