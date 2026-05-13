import React, { useState } from "react";
import { LuSearch, LuCalendar, LuChevronDown, LuDownload, LuInfo, LuArrowUpRight, LuFileText, LuCircleCheck, LuExternalLink, LuCircleX, LuTrash2 } from "react-icons/lu";

const Statistics = () => {
  return (
    <div className="stats-content-wrapper">
      {/* MAIN CONTENT AREA */}
      <div className="stats-main-content">
        {/* TOP CONTROLS */}
        <div className="stats-header">
          <div className="control-group">
            <div className="control-btn date-picker">
              <LuCalendar />
              <span>1-4 Mar, 2026</span>
              <LuChevronDown />
            </div>
            <div className="control-btn select-box">
              <span>Days</span>
              <LuChevronDown />
            </div>
          </div>
          <button className="download-btn-premium">
            Download Usage Report
          </button>
        </div>

        {/* DOCUMENT USAGE CHART SECTION */}
        <div className="chart-card document-usage">
          <div className="card-header">
            <h3>Document Usage <LuInfo className="info-icon" /></h3>
            <div className="summary-pills">
              <div className="summary-pill imported">
                <div className="pill-icon"><LuFileText /></div>
                <div className="pill-data">
                  <span className="count">21</span>
                  <span className="label">Imported</span>
                </div>
              </div>
              <div className="summary-pill confirmed">
                <div className="pill-icon"><LuCircleCheck /></div>
                <div className="pill-data">
                  <span className="count">12</span>
                  <span className="label">Confirmed</span>
                </div>
              </div>
              <div className="summary-pill exported">
                <div className="pill-icon"><LuExternalLink /></div>
                <div className="pill-data">
                  <span className="count">4</span>
                  <span className="label">Exported with Review</span>
                </div>
              </div>
              <div className="summary-pill rejected">
                <div className="pill-icon"><LuCircleX /></div>
                <div className="pill-data">
                  <span className="count">0</span>
                  <span className="label">Rejected</span>
                </div>
              </div>
              <div className="summary-pill deleted">
                <div className="pill-icon"><LuTrash2 /></div>
                <div className="pill-data">
                  <span className="count">6</span>
                  <span className="label">Deleted</span>
                </div>
              </div>
            </div>
          </div>

          <div className="main-line-chart">
            {/* SVG Mockup for the Line Chart */}
            <svg viewBox="0 0 1000 300" className="chart-svg">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(val => (
                <g key={val}>
                  <text x="30" y={280 - (val * 2.5)} className="axis-label">{val}</text>
                  <line x1="50" y1={275 - (val * 2.5)} x2="980" y2={275 - (val * 2.5)} className="grid-line" />
                </g>
              ))}
              
              {/* Lines */}
              <path d="M50,200 L350,150 L650,180 L950,130" className="line-blue" />
              <path d="M50,230 L350,180 L650,130 L950,200" className="line-orange" />
              <path d="M50,250 L350,200 L650,240 L950,220" className="line-green" />
              <path d="M50,260 L350,265 L650,270 L950,268" className="line-red" />
              
              {/* Points */}
              <circle cx="50" cy="200" r="4" className="point-blue" />
              <circle cx="350" cy="150" r="4" className="point-blue" />
              <circle cx="650" cy="180" r="4" className="point-blue" />
              <circle cx="950" cy="130" r="4" className="point-blue" />

              {/* X-Axis labels */}
              <text x="50" y="295" className="axis-label">1 Mar</text>
              <text x="350" y="295" className="axis-label">2 Mar</text>
              <text x="650" y="295" className="axis-label">3 Mar</text>
              <text x="950" y="295" className="axis-label">4 Mar</text>
            </svg>
          </div>
        </div>

        {/* BOTTOM THREE CHARTS */}
        <div className="bottom-charts-grid">
          {/* Chart 2: Turnaround Time */}
          <div className="chart-card mini">
            <div className="card-header-mini">
              <h3>Document Turnaround Time <LuInfo className="info-icon" /></h3>
              <div className="mini-badge">
                <LuCircleCheck />
                <div className="badge-text">
                  <strong>15 Days, 2 Hours</strong>
                  <span>Average turnaround time</span>
                </div>
              </div>
            </div>
            <div className="mini-bar-chart">
               <svg viewBox="0 0 300 150">
                  <line x1="30" y1="130" x2="280" y2="130" className="grid-line" />
                  <rect x="60" y="80" width="30" height="50" className="bar-orange" />
                  <rect x="120" y="70" width="30" height="60" className="bar-orange" />
                  <rect x="180" y="40" width="30" height="90" className="bar-orange" />
                  <rect x="240" y="50" width="30" height="80" className="bar-orange" />
                  <text x="75" y="145" className="axis-label">1 Mar</text>
                  <text x="135" y="145" className="axis-label">2 Mar</text>
                  <text x="195" y="145" className="axis-label">3 Mar</text>
                  <text x="255" y="145" className="axis-label">4 Mar</text>
               </svg>
            </div>
          </div>

          {/* Chart 3: Corrections */}
          <div className="chart-card mini">
            <div className="card-header-mini">
              <h3>Corrections Per Document <LuInfo className="info-icon" /></h3>
              <div className="mini-badge">
                <LuFileText />
                <div className="badge-text">
                  <strong>8 Corrections</strong>
                  <span>Average corrections</span>
                </div>
              </div>
            </div>
            <div className="mini-bar-chart">
               <svg viewBox="0 0 300 150">
                  <line x1="30" y1="130" x2="280" y2="130" className="grid-line" />
                  <rect x="60" y="125" width="30" height="5" className="bar-orange" />
                  <rect x="120" y="100" width="30" height="30" className="bar-orange" />
                  <rect x="180" y="80" width="30" height="50" className="bar-orange" />
                  <rect x="240" y="80" width="30" height="50" className="bar-orange" />
                  <text x="75" y="145" className="axis-label">1 Mar</text>
                  <text x="135" y="145" className="axis-label">2 Mar</text>
                  <text x="195" y="145" className="axis-label">3 Mar</text>
                  <text x="255" y="145" className="axis-label">4 Mar</text>
               </svg>
            </div>
          </div>

          {/* Chart 4: On Time vs Late */}
          <div className="chart-card mini">
            <div className="card-header-mini">
              <h3>On Time vs. Late Documents <LuInfo className="info-icon" /></h3>
              <div className="dual-badge">
                 <div className="mini-badge-small ontime">
                    <LuCircleCheck />
                    <span><strong>7</strong> Ontime</span>
                 </div>
                 <div className="mini-badge-small late">
                    <LuInfo />
                    <span><strong>4</strong> Late</span>
                 </div>
              </div>
            </div>
            <div className="mini-bar-chart">
               <svg viewBox="0 0 300 150">
                  <line x1="30" y1="130" x2="280" y2="130" className="grid-line" />
                  {/* Stacked bars */}
                  <g>
                    <rect x="60" y="70" width="30" height="60" className="bar-ontime" />
                    <rect x="60" y="50" width="30" height="20" className="bar-late" />
                  </g>
                  <g>
                    <rect x="120" y="80" width="30" height="50" className="bar-ontime" />
                    <rect x="120" y="65" width="30" height="15" className="bar-late" />
                  </g>
                  <g>
                    <rect x="180" y="60" width="30" height="70" className="bar-ontime" />
                    <rect x="180" y="40" width="30" height="20" className="bar-late" />
                  </g>
                  <g>
                    <rect x="240" y="85" width="30" height="45" className="bar-ontime" />
                    <rect x="240" y="65" width="30" height="20" className="bar-late" />
                  </g>
                  <text x="75" y="145" className="axis-label">1 Mar</text>
                  <text x="135" y="145" className="axis-label">2 Mar</text>
                  <text x="195" y="145" className="axis-label">3 Mar</text>
                  <text x="255" y="145" className="axis-label">4 Mar</text>
               </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
