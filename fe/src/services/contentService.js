import { request, getFullImageUrl, simulatedFetch } from './apiClient';
import { 
  mockWhyChooseUs, 
  mockTestimonials, 
  mockClients, 
  mockCompanyInfo 
} from '../data/mockData';

/**
 * 1. Lấy danh sách đánh giá khách hàng trực tiếp từ Backend C# (SQL Server)
 */
export async function getTestimonials() {
  try {
    const res = await request('/api/testimonials');
    const list = res.data || (Array.isArray(res) ? res : mockTestimonials);

    return list.map(item => ({
      ...item,
      avatar: getFullImageUrl(item.avatar)
    }));
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/testimonials, dùng mockData:", err.message);
    return mockTestimonials;
  }
}

/**
 * 2. 4 Lý do chọn Thắng Lợi (Nội dung tĩnh)
 */
export async function getWhyChooseUs() {
  const res = await simulatedFetch(() => mockWhyChooseUs);
  return res.data;
}

/**
 * 3. Danh sách khách hàng đối tác (Nội dung tĩnh)
 */
export async function getClients() {
  const res = await simulatedFetch(() => mockClients);
  return res.data;
}

/**
 * 4. Thông tin công ty liên hệ
 */
export async function getCompanyInfo() {
  const res = await simulatedFetch(() => mockCompanyInfo);
  return res.data;
}
