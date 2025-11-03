const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || "https://5b5f00283544.ngrok-free.app/api";

export default API_BASE_URL;