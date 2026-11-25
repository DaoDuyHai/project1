import React from 'react';
import watermarkImg from '../../assets/section-watermark.png';

/**
 * Reusable SectionTitle Component
 * 
 * Thông số kỹ thuật chuẩn Figma:
 * - Group 11: Width: 360px, Height: 62px, Top: 759px, Left: 540px
 * - Watermark: Width: 120.47px, Height: 100.75px (Layer Logo-TL 1 từ Figma)
 * 
 * @param {string} subtitle - Dòng chữ nhỏ ("IN ẤN THẮNG LỢI")
 * @param {string} title - Tiêu đề chính lớn ("DỊCH VỤ IN ẤN")
 * @param {boolean} showWatermark - Hiển thị logo TL chìm phía sau
 * @param {string} className - Class bổ sung
 */
export default function SectionTitle({
  subtitle = "IN ẤN THẮNG LỢI",
  title = "DỊCH VỤ IN ẤN",
  showWatermark = true,
  className = "",
}) {
  return (
    <div 
      className={`relative w-[360px] h-[62px] mx-auto flex flex-col items-center justify-between select-none text-center ${className}`}
    >
      {/* 
        1. WATERMARK CHUẨN FIGMA
        - Kích thước chính xác: 120.47px × 100.75px
        - Sử dụng file gốc Logo-TL 1.png (không có chữ phụ bên dưới)
        - Vị trí: Đỉnh nhô lên trên dòng chữ khoảng 22px
      */}
      {showWatermark && (
        <div 
          className="absolute -top-[22px] left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
          style={{ width: '120.47px', height: '100.75px' }}
        >
          <img 
            src={watermarkImg} 
            alt="" 
            className="w-full h-full object-contain select-none"
          />
        </div>
      )}

      {/* 2. DÒNG CHỮ NHỎ: IN ẤN THẮNG LỢI (Font thanh thoát, chữ in hoa, tracking giãn đều) */}
      <span className="relative z-10 text-[13px] font-medium uppercase text-brand-primary tracking-[0.24em] leading-none pt-1">
        {subtitle}
      </span>

      {/* 3. TIÊU ĐỀ LỚN: DỊCH VỤ IN ẤN (Font-bold 700 chuẩn, không bị béo phì, màu đen) */}
      <h2 className="relative z-10 text-[28px] font-bold uppercase text-black tracking-normal leading-none pb-0.5">
        {title}
      </h2>
    </div>
  );
}
