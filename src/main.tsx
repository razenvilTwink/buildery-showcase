
<<<<<<< HEAD
import React from 'react';
=======
import React from 'react'
>>>>>>> f7c9ad954b3fba7163a1cce4cd05e13e963c0f01
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './hooks/useAuth.tsx'
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
