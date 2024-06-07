// index.js

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import io from 'socket.io-client';

const socket = io('http://localhost:1942'); // Adjust URL as per your server setup

const root = createRoot(document.getElementById('app'));
root.render(
  <StrictMode>
    <App socket={socket} /> {/* Pass socket instance to App */}
  </StrictMode>
);
