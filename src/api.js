const API_BASE_URL = 'http://localhost:3001/api'

/**
 * Generic API request handler
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }
  
  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error)
    throw error
  }
}

/**
 * Submit a profile URL for audit
 */
export const submitAudit = async (profileUrl) => {
  return apiRequest('/audit/submit', {
    method: 'POST',
    body: JSON.stringify({ profileUrl }),
  })
}

/**
 * Get all audits
 */
export const getAudits = async () => {
  return apiRequest('/audit/list')
}

/**
 * Get audit status by tracking ID
 */
export const getAuditStatus = async (trackingId) => {
  return apiRequest(`/audit/status/${trackingId}`)
}

/**
 * Get audit results by tracking ID
 */
export const getAuditResults = async (trackingId) => {
  return apiRequest(`/audit/results/${trackingId}`)
}
