import { request } from './apiClient';

// Sản phẩm & Bảng giá (AdminOnly)
export async function createAdminProduct(payload) {
  return await request('/api/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateAdminProduct(id, payload) {
  return await request(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminProduct(id) {
  return await request(`/api/products/${id}`, {
    method: 'DELETE',
  });
}

// Tin tức (AdminOnly)
export async function createAdminNews(payload) {
  return await request('/api/news', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateAdminNews(id, payload) {
  return await request(`/api/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminNews(id) {
  return await request(`/api/news/${id}`, {
    method: 'DELETE',
  });
}

// Upload ảnh (AdminOnly)
export async function uploadAdminImage(file, folder = 'products') {
  const formData = new FormData();
  formData.append('file', file);
  return await request(`/api/uploads/image?folder=${encodeURIComponent(folder)}`, {
    method: 'POST',
    body: formData,
  });
}

// Thông tin công ty (AdminOnly)
export async function updateAdminCompanyInfo(payload) {
  return await request('/api/company-info', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
