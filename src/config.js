const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || "  https://c67e713be943.ngrok-free.app/api";

export default API_BASE_URL;