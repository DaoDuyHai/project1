/**
 * API Client kết nối ASP.NET Core Backend
 * Base URL: http://localhost:5234
 */

export const API_BASE_URL = 'http://localhost:5234';

/**
 * Hàm gọi API tổng quát dùng fetch (tự động đính kèm JWT Bearer Token nếu có)
 */
export async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('tl_admin_token');
  const isFormData = options.body instanceof FormData;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('tl_admin_token');
      localStorage.removeItem('tl_admin_user');
    }
    const err = new Error(payload?.message || `API Error: ${response.status} ${response.statusText}`);
    err.status = response.status;
    throw err;
  }

  return payload;
}

/**
 * Xử lý đường dẫn ảnh từ Backend (nếu là /uploads/products/p1.png thì gắn thêm base URL)
 */
export function getFullImageUrl(imagePath) {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  return `${API_BASE_URL}${imagePath}`;
}
