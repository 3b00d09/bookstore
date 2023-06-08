import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'

const clerkPublicKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

      <BrowserRouter>
        <ClerkProvider publishableKey={clerkPublicKey}>
          <App />
      </ClerkProvider>
    </BrowserRouter>
,
)
