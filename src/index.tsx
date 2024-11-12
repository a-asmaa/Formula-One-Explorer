import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className='header' >
        
    <Space align="center" >
      <img src='/f1_logo.png' alt="formula-logo" style={{height: 25, width: 100}}/>

      <span style={{ fontWeight: "bold", fontSize: 20, }}>Formula One Explorer</span>

    </Space>
      {/* <a href="/seasons" style={{ textDecoration: "none", color: "white" }}>
        Seasons
      </a> */}
    </div>
    <App />
  </React.StrictMode>
);