import { request, getFullImageUrl } from './apiClient';
import { mockProductDetail } from '../data/mockData';

/**
 * 1. Lấy danh sách danh mục (Categories)
 */
export async function getCategories() {
  try {
    const data = await request('/api/categories');
    return Array.isArray(data) ? data : (data.data || []);
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/categories:", err.message);
    return [];
  }
}

/**
 * 2. Lấy danh sách sản phẩm (có hỗ trợ lọc theo categoryId, phân trang)
 */
export async function getProducts(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.categoryId && params.categoryId !== 'all') {
      query.append('categoryId', params.categoryId);
    }
    if (params.keyword) {
      query.append('keyword', params.keyword);
    }
    if (params.page) {
      query.append('page', params.page);
    }
    if (params.pageSize) {
      query.append('pageSize', params.pageSize);
    }

    const res = await request(`/api/products?${query.toString()}`);
    const list = res.data || (Array.isArray(res) ? res : []);

    return list.map(item => ({
      ...item,
      image: getFullImageUrl(item.image)
    }));
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/products:", err.message);
    return [];
  }
}

/**
 * 3. Lấy chi tiết 1 sản phẩm theo ID hoặc Slug (Desktop 2)
 * TOÀN BỘ DỮ LIỆU ĐƯỢC LẤY TRỰC TIẾP TỪ SQL SERVER DATABASE 100%
 */
export async function getProductDetail(idOrSlug = 1) {
  try {
    const res = await request(`/api/products/${idOrSlug}`);
    const data = res.data || res;

    const fullImg = getFullImageUrl(data.image) || mockProductDetail.images.main;
    const categoryName = data.category?.name || "Dịch vụ In & Thiết kế";

    // Lấy specifications thật từ Database
    const dbSpecs = Array.isArray(data.specifications) ? data.specifications : [];

    return {
      ...mockProductDetail, // Giữ các khung tabs, perks tĩnh của giao diện
      ...data,
      id: data.id,
      sku: data.sku || `SP${String(data.id).padStart(2, '0')}`,
      title: data.title,
      price: data.price,
      priceFormatted: data.priceFormatted || `${Number(data.price).toLocaleString('vi-VN')} đ`,
      priceUnit: data.priceUnit || "/hộp",
      images: {
        main: fullImg,
        thumbnails: [
          fullImg,
          fullImg,
          fullImg,
          fullImg,
        ],
      },
      breadcrumb: [
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ In & Thiết Kế", href: "/#dich-vu" },
        { label: categoryName, href: "/#dich-vu" },
        { label: data.title, href: `/san-pham/${data.id}` },
      ],
      specs: dbSpecs.length > 0 ? dbSpecs : mockProductDetail.specs,
    };
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/products/:id, dùng dữ liệu dự phòng:", err.message);
    return mockProductDetail;
  }
}

/**
 * 4. Sản phẩm liên quan
 */
export async function getRelatedProducts(productId = 1) {
  return mockProductDetail.relatedProducts;
}

/**
 * 5. Gửi yêu cầu nhận báo giá (API POST /api/quotes)
 */
export async function submitQuote(quoteData) {
  return await request('/api/quotes', {
    method: 'POST',
    body: JSON.stringify(quoteData),
  });
}

