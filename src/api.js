import API_BASE_URL from './config'

/**
 * Generic API request handler
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  console.log("Correct API : ", API_BASE_URL)
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
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
export const submitAudit = (payload) => { // <-- Accepts the whole object as 'payload'
  return apiRequest('/audit/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), // <-- Correctly stringifies the flat object
  });
};

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

/**
 * Generate PDF report for an audit
 */
export const generateAuditPDF = async (trackingId) => {
  return apiRequest('/audit/generate-pdf', {
    method: 'POST',
    body: JSON.stringify({ trackingId })
  })
}

/**
 * Download PDF file
 */
export const downloadPDF = async (downloadUrl, filename) => {
  try {
    const response = await fetch(downloadUrl, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'audit_report.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    return { success: true }
  } catch (error) {
    console.error('PDF download failed:', error)
    throw error
  }
}

/**
 * Submit contact form
 */
export const submitContact = async (formData) => {
  return apiRequest('/contact/submit', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
}