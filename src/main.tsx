import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './state/Store.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
  <Provider store={store}>
    
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
      
    </Auth0Provider>
  

    </Provider>
  </React.StrictMode>
    
)
