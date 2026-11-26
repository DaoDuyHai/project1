import iconQuality from '../assets/icon-quality.png';
import iconPrice from '../assets/icon-price.png';
import iconConsult from '../assets/icon-consult.png';
import iconDelivery from '../assets/icon-delivery.png';
import detailPerkQuality from '../assets/detail/detail-perk-quality.png';
import detailPerkDelivery from '../assets/detail/detail-perk-delivery.png';

export const WHY_CHOOSE_US_ITEMS = [
  {
    id: 1,
    icon: iconQuality,
    title: 'Chất lượng uy tín',
    desc: 'Công nghệ in offset và kỹ thuật số hiện đại chuẩn quốc tế.',
  },
  {
    id: 2,
    icon: iconPrice,
    title: 'Giá cả cạnh tranh',
    desc: 'Giá gốc tận xưởng, không qua trung gian thương mại.',
  },
  {
    id: 3,
    icon: iconConsult,
    title: 'Tư vấn tận tâm',
    desc: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm hỗ trợ 24/7.',
  },
  {
    id: 4,
    icon: iconDelivery,
    title: 'Giao hàng nhanh chóng',
    desc: 'Đảm bảo đúng tiến độ, hỗ trợ giao hỏa tốc trong ngày.',
  },
];

export const PRODUCT_DETAIL_PERKS = [
  {
    icon: detailPerkQuality,
    title: 'Cam kết hài lòng',
    desc: 'Chất lượng uy tín',
  },
  {
    icon: detailPerkDelivery,
    title: 'Giao hàng',
    desc: 'Nhanh chóng, tiện lợi',
  },
];

export const DEFAULT_PRODUCT_SPECS = [
  { label: 'Chất lượng in', value: 'Chuẩn màu CMYK sắc nét' },
  { label: 'Thời gian hoàn thành', value: 'Giao nhanh từ 24h - 48h' },
];

export const PRODUCT_DETAIL_TABS = [
  {
    id: 'info',
    title: 'THÔNG TIN SẢN PHẨM',
    heading: 'MÔ TẢ SẢN PHẨM',
    content:
      'Quy trình in ấn sử dụng công nghệ in offset nhiều màu hoặc in kỹ thuật số hiện đại, cho chất lượng bản in sắc nét, màu sắc tươi sáng chuẩn dải màu CMYK.',
  },
  {
    id: 'certificate',
    title: 'CHỨNG NHẬN',
    heading: 'CHỨNG NHẬN TIÊU CHUẨN CHẤT LƯỢNG',
    content:
      'Hệ thống máy in và mực in đạt tiêu chuẩn chứng chỉ ISO 9001:2015 và FSC về bảo vệ môi trường, đảm bảo độ chuẩn màu sắc lên tới 98% theo hệ màu CMYK quốc tế.',
  },
  {
    id: 'care',
    title: 'HƯỚNG DẪN BẢO QUẢN',
    heading: 'HƯỚNG DẪN BẢO QUẢN ẤN PHẨM',
    content:
      'Bảo quản sản phẩm nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và nhiệt độ cao hoặc độ ẩm trên 80% để giữ cho màng cán mờ và màu mực luôn sắc nét.',
  },
  {
    id: 'shipping',
    title: 'VẬN CHUYỂN & ĐỔI TRẢ',
    heading: 'CHÍNH SÁCH VẬN CHUYỂN & ĐỔI TRẢ',
    content:
      'Giao hàng nhanh nội thành trong 24h. Hỗ trợ đổi trả hoặc in lại 100% miễn phí nếu phát sinh lỗi kỹ thuật in, lệch màu hoặc lỗi gia công từ phía xưởng.',
  },
];
