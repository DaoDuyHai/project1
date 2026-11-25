// ==============================================================================
// MOCK DATA TẬP TRUNG (CHUẨN HÓA ĐỊNH HƯỚNG KẾT NỐI RESTFUL BACKEND)
// ==============================================================================

// 1. Assets Logo & Icons
import logoImg from '../assets/logo-tl.png';
import iconQuality from '../assets/icon-quality.png';
import iconPrice from '../assets/icon-price.png';
import iconConsult from '../assets/icon-consult.png';
import iconDelivery from '../assets/icon-delivery.png';

// 2. Assets 15 Sản phẩm Trang chủ
import p1 from '../assets/products/p1.png';
import p2 from '../assets/products/p2.png';
import p3 from '../assets/products/p3.png';
import p4 from '../assets/products/p4.png';
import p5 from '../assets/products/p5.png';
import p6 from '../assets/products/p6.png';
import p7 from '../assets/products/p7.png';
import p8 from '../assets/products/p8.png';
import p9 from '../assets/products/p9.png';
import p10 from '../assets/products/p10.png';
import p11 from '../assets/products/p11.png';
import p12 from '../assets/products/p12.png';
import p13 from '../assets/products/p13.png';
import p14 from '../assets/products/p14.png';
import p15 from '../assets/products/p15.png';

// 3. Assets Khách hàng & Tin tức & Đối tác
import customerAvatar from '../assets/customer-avatar.png';
import newsFeatured from '../assets/news-featured.png';
import news1 from '../assets/news-1.png';
import news2 from '../assets/news-2.png';
import news3 from '../assets/news-3.png';

import clientAvac from '../assets/client-avac.png';
import clientYsl from '../assets/client-ysl.jpg';
import clientVnexpress from '../assets/client-vnexpress.jpg';
import clientDior from '../assets/client-dior.jpg';
import clientBank1 from '../assets/client-bank1.jpg';
import clientBank2 from '../assets/client-bank2.jpg';

// 4. Assets Trang Chi Tiết Sản Phẩm (Desktop 2)
import detailMain from '../assets/detail/detail-main.png';
import detailThumb1 from '../assets/detail/detail-thumb-1.png';
import detailThumb2 from '../assets/detail/detail-thumb-2.png';
import detailThumb3 from '../assets/detail/detail-thumb-3.png';
import detailThumb4 from '../assets/detail/detail-thumb-4.png';
import detailPerkQuality from '../assets/detail/detail-perk-quality.png';
import detailPerkDelivery from '../assets/detail/detail-perk-delivery.png';
import related1 from '../assets/detail/related-1.png';
import related2 from '../assets/detail/related-2.png';
import related3 from '../assets/detail/related-3.png';
import related4 from '../assets/detail/related-4.png';

/**
 * 1. Danh mục dịch vụ in ấn
 */
export const mockCategories = [
  { id: 'all', name: "Tất cả", slug: "tat-ca" },
  { id: 'digital', name: "In kỹ thuật số", slug: "in-ky-thuat-so" },
  { id: 'large-format', name: "In khổ lớn", slug: "in-kho-lon" },
  { id: 'photocopy', name: "Photocopy", slug: "photocopy" },
  { id: 'school', name: "Khối trường học", slug: "khoi-truong-hoc" },
  { id: 'scan', name: "Scan", slug: "scan" },
  { id: 'finishing', name: "Gia công sau in", slug: "gia-cong-sau-in" },
  { id: 'carbon', name: "In Hóa đơn Cacbon", slug: "in-hoa-don-cacbon" },
];

/**
 * 2. Lưới 15 thẻ sản phẩm Trang chủ
 */
export const mockProducts = [
  { id: 1, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p1, categoryId: 'all', price: 115000, slug: 'danh-thiep-in-giay-couche-bristol-300gsm' },
  { id: 2, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p2, categoryId: 'all', price: 150000, slug: 'in-giay-moi-thiep-cuoi-2' },
  { id: 3, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p3, categoryId: 'all', price: 95000, slug: 'in-giay-moi-thiep-cuoi-3' },
  { id: 4, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p4, categoryId: 'all', price: 210000, slug: 'in-giay-moi-thiep-cuoi-4' },
  { id: 5, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p5, categoryId: 'all', price: 85000, slug: 'in-giay-moi-thiep-cuoi-5' },
  { id: 6, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p6, categoryId: 'all', price: 45000, slug: 'in-giay-moi-thiep-cuoi-6' },
  { id: 7, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p7, categoryId: 'all', price: 350000, slug: 'in-giay-moi-thiep-cuoi-7' },
  { id: 8, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p8, categoryId: 'all', price: 70000, slug: 'in-giay-moi-thiep-cuoi-8' },
  { id: 9, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p9, categoryId: 'all', price: 65000, slug: 'in-giay-moi-thiep-cuoi-9' },
  { id: 10, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p10, categoryId: 'all', price: 180000, slug: 'in-giay-moi-thiep-cuoi-10' },
  { id: 11, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p11, categoryId: 'all', price: 290000, slug: 'in-giay-moi-thiep-cuoi-11' },
  { id: 12, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p12, categoryId: 'all', price: 120000, slug: 'in-giay-moi-thiep-cuoi-12' },
  { id: 13, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p13, categoryId: 'all', price: 160000, slug: 'in-giay-moi-thiep-cuoi-13' },
  { id: 14, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p14, categoryId: 'all', price: 135000, slug: 'in-giay-moi-thiep-cuoi-14' },
  { id: 15, title: "IN GIẤY MỜI - THIỆP CƯỚI", image: p15, categoryId: 'all', price: 55000, slug: 'in-giay-moi-thiep-cuoi-15' },
];

/**
 * 3. Dữ liệu Chi tiết Sản phẩm (Desktop 2 - Figma)
 */
export const mockProductDetail = {
  id: 1,
  sku: "VT001",
  title: "Danh thiếp in giấy couche/Bristol 300gsm",
  rating: 5,
  price: 155000,
  priceFormatted: "155.000",
  priceUnit: "/hộp",
  priceNote: "(Giá tham khảo)",
  priceGuideText: "Quý khách xem bảng giá chi tiết dưới đây",
  priceLinks: [
    { label: "Bảng giá in Nhanh Card Visit", href: "#bang-gia-nhanh" },
    { label: "Bảng giá in Offset Card Visit", href: "#bang-gia-offset" },
  ],
  specs: [
    { label: "Kích thước", value: "5.5 x 9 (cm)" },
    { label: "Loại giấy", value: "Giấy Couche định lượng 300gsm" },
    { label: "Số mặt in", value: "In 2 mặt 4 màu" },
    { label: "Gia công", value: "Cán mờ 2 mặt, đóng hộp Mika" },
  ],
  hotline: "0123 456 789",
  perks: [
    {
      icon: detailPerkQuality,
      title: "Cam kết hài lòng",
      desc: "Chất lượng uy tín",
    },
    {
      icon: detailPerkDelivery,
      title: "Giao hàng",
      desc: "Nhanh chóng, tiện lợi",
    },
  ],
  images: {
    main: detailMain,
    thumbnails: [
      detailThumb1,
      detailThumb2,
      detailThumb3,
      detailThumb4,
    ],
  },
  breadcrumb: [
    { label: "Dịch vụ In & Thiết Kế", href: "/#dich-vu" },
    { label: "In Văn phòng", href: "/#van-phong" },
    { label: "In Card Visit", href: null, current: true },
  ],
  tabs: [
    {
      id: "info",
      title: "THÔNG TIN SẢN PHẨM",
      heading: "MÔ TẢ SẢN PHẨM",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "certificate",
      title: "CHỨNG NHẬN",
      heading: "CHỨNG NHẬN TIÊU CHUẨN CHẤT LƯỢNG",
      content:
        "Hệ thống máy in và mực in đạt tiêu chuẩn chứng chỉ ISO 9001:2015 và FSC về bảo vệ môi trường, đảm bảo độ chuẩn màu sắc lên tới 98% theo hệ màu CMYK quốc tế.",
    },
    {
      id: "care",
      title: "HƯỚNG DẪN BẢO QUẢN",
      heading: "HƯỚNG DẪN BẢO QUẢN ẤN PHẨM",
      content:
        "Bảo quản sản phẩm nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và nhiệt độ cao hoặc độ ẩm trên 80% để giữ cho màng cán mờ và màu mực luôn sắc nét.",
    },
    {
      id: "shipping",
      title: "VẬN CHUYỂN & ĐỔI TRẢ",
      heading: "CHÍNH SÁCH VẬN CHUYỂN & ĐỔI TRẢ",
      content:
        "Giao hàng nhanh nội thành trong 24h. Hỗ trợ đổi trả hoặc in lại 100% miễn phí nếu phát sinh lỗi kỹ thuật in, lệch màu hoặc lỗi gia công từ phía xưởng.",
    },
  ],
  relatedProducts: [
    {
      id: 101,
      title: "Card name polime",
      image: related1,
      priceText: "Liên hệ",
      badges: [
        { type: "discount", label: "-17%" },
        { type: "new", label: "Mới" },
      ],
      rating: null,
    },
    {
      id: 102,
      title: "Standee hội nghị, event",
      image: related2,
      priceText: "Liên hệ",
      badges: [],
      rating: 4.5,
    },
    {
      id: 103,
      title: "Thư mời",
      image: related3,
      priceText: "Liên hệ",
      badges: [
        { type: "discount", label: "-17%" },
        { type: "new", label: "Mới" },
      ],
      rating: 4,
    },
    {
      id: 104,
      title: "Tờ rơi",
      image: related4,
      priceText: "Liên hệ",
      badges: [],
      rating: 4,
    },
  ],
};

/**
 * 4. 4 Lợi thế nổi bật (Vì sao lựa chọn chúng tôi)
 */
export const mockWhyChooseUs = [
  {
    id: 1,
    icon: iconQuality,
    title: "Chất lượng uy tín",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    id: 2,
    icon: iconPrice,
    title: "Giá cả cạnh tranh",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    id: 3,
    icon: iconConsult,
    title: "Tư vấn tận tâm",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    id: 4,
    icon: iconDelivery,
    title: "Giao hàng nhanh chóng",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
];

/**
 * 5. Đánh giá của khách hàng (Testimonials)
 */
export const mockTestimonials = [
  {
    id: 1,
    name: "Chị Nguyễn Thị Mai",
    role: "TGĐ công ty Thương mại & Dịch vụ Baobab",
    avatar: customerAvatar,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum d",
  },
  {
    id: 2,
    name: "Anh Trần Minh Tuấn",
    role: "Giám đốc Marketing - Tập đoàn Nova",
    avatar: customerAvatar,
    quote: "Dịch vụ in ấn tại Thắng Lợi luôn làm tôi hài lòng về cả tốc độ lẫn độ sắc nét của màu sắc. Đội ngũ hỗ trợ nhiệt tình, tư vấn chất liệu giấy cực kỳ chuẩn xác cho từng loại ấn phẩm của công ty chúng tôi.",
  },
];

/**
 * 6. Tin tức mới nhất (1 bài lớn + 3 bài nhỏ)
 */
export const mockNews = {
  featured: {
    id: 'featured-1',
    image: newsFeatured,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la...",
    createdAt: "2026-11-25",
  },
  articles: [
    {
      id: 1,
      image: news1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      createdAt: "2026-11-24",
    },
    {
      id: 2,
      image: news2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      createdAt: "2026-11-23",
    },
    {
      id: 3,
      image: news3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ...",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      createdAt: "2026-11-22",
    },
  ],
};

/**
 * 7. Khách hàng đối tác
 */
export const mockClients = [
  { id: 1, name: "AVAC", logo: clientAvac },
  { id: 2, name: "Saint Laurent", logo: clientYsl },
  { id: 3, name: "VnExpress", logo: clientVnexpress },
  { id: 4, name: "Dior", logo: clientDior },
  { id: 5, name: "Ngân Hàng", logo: clientBank1 },
  { id: 6, name: "INVEI Bank", logo: clientBank2 },
];

/**
 * 8. Thông tin doanh nghiệp (Header & Footer)
 */
export const mockCompanyInfo = {
  name: "CÔNG TY CP TM VÀ DV IN ẤN THẮNG LỢI",
  logo: logoImg,
  address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit ame",
  hotline: "0123.456.789",
  email: "suppor@info.com",
  copyright: "© 2026 In Thắng Lợi. Designed by VicoGroup. All Rights Reserved.",
  quickLinks: [
    { label: "Dịch Vụ In & Thiết Kế", href: "#dich-vu" },
    { label: "Hệ Thống Máy Móc", href: "#he-thong-may-moc" },
    { label: "Bảng Giá", href: "#bang-gia" },
    { label: "Tin Tức", href: "#tin-tuc" },
  ],
};
