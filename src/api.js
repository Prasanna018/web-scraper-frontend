import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

// auth
export async function verifyGoogle(id_token) {
  const { data } = await axios.post(`${API_BASE}/api/auth/google`, { id_token })
  return data
}

// web scraping
export async function scrape(tag) {
  const params = new URLSearchParams()
  if (tag) params.set('tag', tag)
  const url = `${API_BASE}/api/scrape${params.toString() ? `?${params.toString()}` : ''}`
  const { data } = await axios.get(url)
  return data
}
