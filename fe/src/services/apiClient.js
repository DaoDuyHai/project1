/**
 * API Client kết nối ASP.NET Core Backend
 * Base URL: http://localhost:5234
 */

export const API_BASE_URL = 'http://localhost:5234';

const SIMULATED_DELAY_MS = 100;

/**
 * Hàm giả lập cho các service chưa nối API (content, news...)
 */
export async function simulatedFetch(dataGetter) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: dataGetter(),
        status: 200,
        message: "Success",
      });
    }, SIMULATED_DELAY_MS);
  });
}

/**
 * Hàm gọi API tổng quát dùng fetch
 */
export async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
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
