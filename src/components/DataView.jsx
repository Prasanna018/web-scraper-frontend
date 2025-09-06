import React, { useEffect, useState } from 'react'
import { scrape } from '../api'

export default function DataView() {
  // states for managing the ui 
  const [tag, setTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)




  async function load() {
    setLoading(true); setError(null)
    try {
      const res = await scrape(tag || undefined)
      setData(res)
    } catch (e) {
      setError(e?.response?.data?.detail || e.message)
    } finally {
      setLoading(false)
    }
  }

  // on every render it loads the data
  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="row" style={{ marginBottom: 16 }}>
        <input className="input" placeholder="Optional tag (e.g., life, love, inspirational)"
          value={tag} onChange={(e) => setTag(e.target.value)} />
        <button className="btn btn-primary" onClick={load} disabled={loading}>
          {loading ? <span className="spinner"></span> : 'Refresh'}
        </button>
      </div>

      {/* showing the error  */}
      {error && <div className="card" style={{ borderColor: '#6b1d1d' }}>Error: {error}</div>}

      {/* if data show using cards if not null */}
      {!data ? null : (
        <>
          <div className="subtle" style={{ marginBottom: 12 }}>
            Source: {data.source} · {data.count} quotes
          </div>
          <div className="card-grid">
            {data.data.map((q, i) => (
              <div key={i} className="card">
                <div className="quote">“{q.text}”</div>
                <div className="subtle" style={{ marginTop: 8 }}>— {q.author}</div>
                <div style={{ marginTop: 8 }}>
                  {q.tags.map((t, j) => <span key={j} className="tag">#{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
