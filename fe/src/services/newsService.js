import { request, getFullImageUrl } from './apiClient';

/**
 * News Service
 * Kết nối API Tin tức từ Backend C# (SQL Server)
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
      } : null,
      articles: Array.isArray(data.articles) ? data.articles.map(art => ({
        ...art,
        image: getFullImageUrl(art.image)
      })) : [],
      items: Array.isArray(data.items) ? data.items.map(item => ({
        ...item,
        image: getFullImageUrl(item.image)
      })) : [],
      meta: data.meta || { page, pageSize, totalCount: 0, totalPages: 1 }
    };
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/news:", err.message);
    return {
      featured: null,
      articles: [],
      items: [],
      meta: { page: 1, pageSize: 10, totalCount: 0, totalPages: 1 }
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
    console.warn(`[API] Không kết nối được Backend /api/news/${id}:`, err.message);
    return null;
  }
}
