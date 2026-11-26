import { request } from './apiClient';

export async function getAdminQuotes(status = 'all') {
  const query = status && status !== 'all' ? `?status=${encodeURIComponent(status)}` : '';
  const res = await request(`/api/quotes${query}`);
  return res.data || (Array.isArray(res) ? res : []);
}

export async function updateAdminQuoteStatus(id, status) {
  return await request(`/api/quotes/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
