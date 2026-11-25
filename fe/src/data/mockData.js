// ==============================================================================
// MOCK DATA TẬP TRUNG (DÀNH CHO CÁC MODULE GIAO DIỆN CHƯA CÓ BACKEND)
// Các module Categories, Products, News, Testimonials, Quotes ĐÃ CHUYỂN HOÀN TOÀN SANG BACKEND .NET
// ==============================================================================

// 1. Assets Logo & Icons hệ thống
import logoImg from '../assets/logo-tl.png';
import iconQuality from '../assets/icon-quality.png';
import iconPrice from '../assets/icon-price.png';
import iconConsult from '../assets/icon-consult.png';
import iconDelivery from '../assets/icon-delivery.png';

// 2. Assets Đối tác & Khách hàng
import clientAvac from '../assets/client-avac.png';
import clientYsl from '../assets/client-ysl.jpg';
import clientVnexpress from '../assets/client-vnexpress.jpg';
import clientDior from '../assets/client-dior.jpg';
import clientBank1 from '../assets/client-bank1.jpg';
import clientBank2 from '../assets/client-bank2.jpg';

// 3. Assets Chi tiết sản phẩm (Perks & Related)
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
 * 1. Dữ liệu tĩnh bổ trợ Trang Chi Tiết Sản Phẩm (Tabs, Perks, Related)
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
        "Quy trình in ấn sử dụng công nghệ in offset nhiều màu hoặc in kỹ thuật số hiện đại, cho chất lượng bản in sắc nét, màu sắc tươi sáng chuẩn dải màu CMYK.",
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
 * 2. 4 Lợi thế nổi bật (Vì sao lựa chọn chúng tôi)
 */
export const mockWhyChooseUs = [
  {
    id: 1,
    icon: iconQuality,
    title: "Chất lượng uy tín",
    desc: "Công nghệ in offset và kỹ thuật số hiện đại chuẩn quốc tế.",
  },
  {
    id: 2,
    icon: iconPrice,
    title: "Giá cả cạnh tranh",
    desc: "Giá gốc tận xưởng, không qua trung gian thương mại.",
  },
  {
    id: 3,
    icon: iconConsult,
    title: "Tư vấn tận tâm",
    desc: "Đội ngũ kỹ thuật viên giàu kinh nghiệm hỗ trợ 24/7.",
  },
  {
    id: 4,
    icon: iconDelivery,
    title: "Giao hàng nhanh chóng",
    desc: "Đảm bảo đúng tiến độ, hỗ trợ giao hỏa tốc trong ngày.",
  },
];

/**
 * 3. Khách hàng đối tác
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
 * 4. Thông tin doanh nghiệp (Header & Footer)
 */
export const mockCompanyInfo = {
  name: "CÔNG TY CP TM VÀ DV IN ẤN THẮNG LỢI",
  logo: logoImg,
  address: "Số 53-A22 Khu đô thị Geleximco, Lê Trọng Tấn, Hà Đông, Hà Nội",
  hotline: "091 8585 505",
  email: "support@inanthangloi.vn",
  copyright: "© 2026 In Thắng Lợi. Designed by VicoGroup. All Rights Reserved.",
  quickLinks: [
    { label: "Dịch Vụ In & Thiết Kế", href: "#dich-vu" },
    { label: "Hệ Thống Máy Móc", href: "#he-thong-may-moc" },
    { label: "Bảng Giá", href: "#bang-gia" },
    { label: "Tin Tức", href: "#tin-tuc" },
  ],
};
