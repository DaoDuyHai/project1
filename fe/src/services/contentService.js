import { request, getFullImageUrl } from './apiClient';
import { WHY_CHOOSE_US_ITEMS } from '../constants/staticContent';
import logoImg from '../assets/logo-tl.png';

const DEFAULT_COMPANY_INFO = {
  name: "CÔNG TY CP TM VÀ DV IN ẤN THẮNG LỢI",
  shortName: "THẮNG LỢI",
  slogan: "Professional Printing Solutions",
  logo: logoImg,
  address: "Số 53-A22 Khu đô thị Geleximco, Lê Trọng Tấn, Hà Đông, Hà Nội",
  hotline: "0123.456.789",
  email: "support@inanthangloi.vn",
  facebookUrl: "#facebook",
  youtubeUrl: "#youtube",
  copyright: "© 2026 In Thắng Lợi. Designed by VicoGroup. All Rights Reserved.",
  quickLinks: [
    { label: "Dịch Vụ In & Thiết Kế", href: "/#dich-vu" },
    { label: "Hệ Thống Máy Móc", href: "/he-thong-may-moc" },
    { label: "Bảng Giá", href: "/bang-gia" },
    { label: "Tin Tức", href: "/tin-tuc" },
  ],
};

/**
 * 1. Lấy danh sách đánh giá khách hàng trực tiếp từ Backend C# (SQL Server)
 */
export async function getTestimonials() {
  try {
    const res = await request('/api/testimonials');
    const list = res.data || (Array.isArray(res) ? res : []);

    return list.map(item => ({
      ...item,
      avatar: getFullImageUrl(item.avatar)
    }));
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/testimonials:", err.message);
    return [];
  }
}

/**
 * 2. 4 Lý do chọn Thắng Lợi (Nội dung tĩnh)
 */
export async function getWhyChooseUs() {
  return WHY_CHOOSE_US_ITEMS;
}

/**
 * 3. Danh sách khách hàng đối tác trực tiếp từ Backend C# (SQL Server)
 */
export async function getClients() {
  try {
    const res = await request('/api/clients');
    const list = res.data || (Array.isArray(res) ? res : []);

    return list.map(item => ({
      ...item,
      logo: getFullImageUrl(item.logo)
    }));
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/clients:", err.message);
    return [];
  }
}

/**
 * 4. Thông tin doanh nghiệp trực tiếp từ Backend C# (SQL Server)
 */
export async function getCompanyInfo() {
  try {
    const res = await request('/api/company-info');
    const data = res.data || res;

    return {
      ...DEFAULT_COMPANY_INFO,
      ...data,
      logo: logoImg,
      quickLinks: DEFAULT_COMPANY_INFO.quickLinks
    };
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/company-info:", err.message);
    return DEFAULT_COMPANY_INFO;
  }
}

/**
 * 5. Danh sách hệ thống máy móc thiết bị từ Backend C# (SQL Server)
 */
export async function getMachines(category = 'all') {
  try {
    const query = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await request(`/api/machines${query}`);
    const list = res.data || (Array.isArray(res) ? res : []);

    return list.map(item => ({
      ...item,
      imageUrl: item.imageUrl ? getFullImageUrl(item.imageUrl) : ''
    }));
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/machines:", err.message);
    return [];
  }
}
