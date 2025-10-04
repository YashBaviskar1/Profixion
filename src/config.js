const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
  || "http://34.14.205.106/api";

export default API_BASE_URL;
