import { request, getFullImageUrl } from './apiClient';
import { mockNews } from '../data/mockData';

/**
 * News Service
 * Kết nối API Tin tức từ Backend C#
 */

/**
 * 1. Lấy danh sách tin tức (hỗ trợ phân trang)
 */
export async function getNews(page = 1, pageSize = 10) {
  try {
    const res = await request(`/api/news?page=${page}&pageSize=${pageSize}`);
    const data = res.data || res;

    return {
      featured: data.featured ? {
        ...data.featured,
        image: getFullImageUrl(data.featured.image)
      } : mockNews.featured,
      articles: Array.isArray(data.articles) ? data.articles.map(art => ({
        ...art,
        image: getFullImageUrl(art.image)
      })) : mockNews.articles,
      items: Array.isArray(data.items) ? data.items.map(item => ({
        ...item,
        image: getFullImageUrl(item.image)
      })) : [],
      meta: data.meta || { page, pageSize, totalCount: 10, totalPages: 1 }
    };
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/news, dùng mockData:", err.message);
    return {
      featured: mockNews.featured,
      articles: mockNews.articles,
      items: [
        { ...mockNews.featured, desc: mockNews.featured.excerpt },
        ...mockNews.articles
      ],
      meta: { page: 1, pageSize: 10, totalCount: 4, totalPages: 1 }
    };
  }
}

/**
 * 2. Lấy chi tiết 1 bài viết tin tức theo ID
 */
export async function getNewsById(id = 1) {
  try {
    const res = await request(`/api/news/${id}`);
    const data = res.data || res;

    return {
      ...data,
      image: getFullImageUrl(data.image),
      related: Array.isArray(data.related) ? data.related.map(r => ({
        ...r,
        image: getFullImageUrl(r.image)
      })) : []
    };
  } catch (err) {
    console.warn(`[API] Không kết nối được Backend /api/news/${id}, dùng mock:`, err.message);
    const mockFound = mockNews.articles.find(a => a.id === Number(id)) || {
      ...mockNews.featured,
      id: Number(id),
      desc: mockNews.featured.excerpt
    };

    return {
      id: mockFound.id,
      title: mockFound.title,
      summary: mockFound.desc || mockNews.featured.excerpt,
      content: `
        <p>Ngành in ấn hiện đại đang chứng kiến bước chuyển mình mạnh mẽ với sự kết hợp giữa công nghệ in offset tiên tiến và công nghệ in kỹ thuật số tốc độ cao.</p>
        <p>Tại xưởng In Ấn Thắng Lợi, mỗi ấn phẩm đều trải qua quy trình kiểm soát màu sắc nghiêm ngặt theo chuẩn hệ màu CMYK và máy đo màu chuyên dụng, đảm bảo độ đồng đều lên đến 98% giữa các lô hàng.</p>
        <h3>Các ưu thế vượt trội khi in ấn tại xưởng:</h3>
        <ul>
          <li><strong>Hệ thống máy in hiện đại:</strong> Nhập khẩu trực tiếp từ Nhật Bản và Đức.</li>
          <li><strong>Chất liệu đa dạng:</strong> Từ giấy Couche, Bristol, Ivory cho đến các dòng giấy mỹ thuật cao cấp dập gân.</li>
          <li><strong>Gia công hoàn thiện tỉ mỉ:</strong> Ép kim vi tính, bế nổi 3D, phủ UV định hình, cán màng chống nước.</li>
        </ul>
        <p>Quý khách hàng có nhu cầu tư vấn thiết kế và nhận báo giá ưu đãi số lượng lớn, vui lòng liên hệ ngay với đội ngũ kỹ thuật viên của In Ấn Thắng Lợi để được hỗ trợ chu đáo nhất.</p>
      `,
      image: mockFound.image,
      views: 1250,
      createdAt: mockFound.createdAt,
      related: mockNews.articles.filter(a => a.id !== Number(id))
    };
  }
}
