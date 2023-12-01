import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './routes/main/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
