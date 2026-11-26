import { request, getFullImageUrl } from './apiClient';
import detailMain from '../assets/detail/detail-main.png';
import {
  DEFAULT_PRODUCT_SPECS,
  PRODUCT_DETAIL_PERKS,
  PRODUCT_DETAIL_TABS,
} from '../constants/staticContent';

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
 * TOÀN BỘ DỮ LIỆU & SẢN PHẨM LIÊN QUAN LẤY TRỰC TIẾP TỪ SQL SERVER
 */
export async function getProductDetail(idOrSlug = 1) {
  try {
    const res = await request(`/api/products/${idOrSlug}`);
    const data = res.data || res;

    const fullImg = getFullImageUrl(data.image) || detailMain;
    const categoryName = data.category?.name || "Dịch vụ In & Thiết kế";

    // Lấy specifications thật từ Database
    const dbSpecs = Array.isArray(data.specifications) ? data.specifications : [];

    // Lấy sản phẩm liên quan chuẩn theo CategoryId từ Backend
    const relatedProducts = await getRelatedProducts(data.id);

    return {
      ...data,
      id: data.id,
      sku: data.sku || `SP${String(data.id).padStart(2, '0')}`,
      title: data.title,
      rating: 5,
      price: data.price,
      priceFormatted: data.priceFormatted || `${Number(data.price).toLocaleString('vi-VN')} đ`,
      priceUnit: data.priceUnit || "/hộp",
      priceNote: "(Giá tham khảo)",
      priceGuideText: "Quý khách xem bảng giá chi tiết dưới đây",
      perks: PRODUCT_DETAIL_PERKS,
      tabs: PRODUCT_DETAIL_TABS,
      priceLinks: [
        { label: `Xem bảng giá ${categoryName}`, href: `/bang-gia?categoryId=${data.categoryId || 'all'}` },
        { label: "Xem toàn bộ bảng giá dịch vụ in ấn", href: "/bang-gia" },
      ],
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
        { label: "Dịch vụ In & Thiết Kế", href: "/#dich-vu" },
        { label: categoryName, href: `/?categoryId=${data.categoryId || 'all'}#dich-vu` },
        { label: data.title, href: `/san-pham/${data.id}`, current: true },
      ],
      specs: dbSpecs.length > 0 ? dbSpecs : DEFAULT_PRODUCT_SPECS,
      relatedProducts,
    };
  } catch (err) {
    console.warn("[API] Không kết nối được Backend /api/products/:id:", err.message);
    return null;
  }
}

/**
 * 4. Sản phẩm liên quan theo CategoryId (GET /api/products/:id/related)
 */
export async function getRelatedProducts(productId = 1, limit = 4) {
  try {
    const res = await request(`/api/products/${productId}/related?limit=${limit}`);
    const list = res.data || (Array.isArray(res) ? res : []);

    return list.map(item => ({
      id: item.id,
      title: item.title,
      image: getFullImageUrl(item.image),
      price: item.price,
      priceText: item.price > 0
        ? `${item.priceFormatted || `${Number(item.price).toLocaleString('vi-VN')} đ`}${item.priceUnit || ''}`
        : "Liên hệ",
      sameCategory: item.sameCategory,
      badges: item.sameCategory ? [{ type: "new", label: "Cùng danh mục" }] : [],
      rating: 5,
    }));
  } catch (err) {
    console.warn("[API] Không lấy được sản phẩm liên quan:", err.message);
    return [];
  }
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

