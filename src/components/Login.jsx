import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { verifyGoogle } from '../api'

export default function Login({ onLogin }) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
      <div className="card" style={{ padding: 24, maxWidth: 420, textAlign: 'center' }}>
        <h2 className="header" style={{ marginBottom: 8 }}>Welcome</h2>
        <p className="subtle" style={{ marginBottom: 16 }}>
          Sign in to access the scraping dashboard
        </p>
        <GoogleLogin
          onSuccess={async (cred) => {
            try {
              const res = await verifyGoogle(cred.credential)
              if (res?.ok) onLogin(res.user)
            } catch (e) {
              alert('Login failed: ' + (e?.response?.data?.detail || e.message))
            }
          }}
          onError={() => alert('Google login error')}
          useOneTap
        />
      </div>
    </div>
  )
}
