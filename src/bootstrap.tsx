
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Mount function to start up the app
export function mount(containerId: string = 'root') {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }
  
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  return root;
}

// Unmount function to clean up
export function unmount(containerId: string = 'root') {
  const container = document.getElementById(containerId);
  
  if (container) {
    ReactDOM.createRoot(container).unmount();
  }
}

// Auto-mount when not being used as a library
if (process.env.NODE_ENV !== 'production') {
  mount();
}
