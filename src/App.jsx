import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login.jsx';
import DataView from './components/DataView.jsx';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
      <div className="container">
        <div className="nav">
          <h1 className="header">Web Scraper Assignment</h1>
          {user ? (
            <div className="row">
              <img src={user.picture} alt="avatar" style={{ width: 28, height: 28, borderRadius: 999 }} />
              <span className="subtle">{user.name}</span>
              <button className="btn btn-ghost" onClick={() => setUser(null)}>Logout</button>
            </div>
          ) : null}
        </div>

        {/* if user not logged in show login page if not show data page */}
        {!user ? (
          <Login onLogin={setUser} />
        ) : (
          <DataView />
        )}


      </div>
    </GoogleOAuthProvider>
  )
}
