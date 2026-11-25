import React from 'react';
import defaultBanner from '../../assets/hero-banner-tet.png';

/**
 * HeroBanner Component
 * 
 * Chuẩn hóa theo tiêu chí VICO:
 * - Bổ sung thẻ <h1> (chuẩn SEO & Accessibility theo tiêu chí HTML5 của VICO)
 * - Tối ưu tỷ lệ khung hình responsive theo các mốc màn hình
 */
export default function HeroBanner({
  image = defaultBanner,
  alt = "In Lịch Tết 2027 - Giá cả hợp lý, tối ưu ngân sách - In Ấn Thắng Lợi",
  href = "#dich-vu",
  className = "",
}) {
  const content = (
    <div className="relative w-full overflow-hidden bg-gray-50 shadow-xs">
      {/* Thẻ <h1> semantic cho toàn trang web, ẩn thị giác nhưng chuẩn Accessibility */}
      <h1 className="sr-only">
        In Ấn Thắng Lợi - Dịch Vụ In Ấn & Thiết Kế Chuyên Nghiệp Tại TP.HCM
      </h1>

      <img
        src={image}
        alt={alt}
        className="w-full h-auto object-cover object-center select-none"
        style={{
          aspectRatio: '1440 / 539.62',
          maxHeight: '539.62px',
        }}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );

  return (
    <section 
      aria-label="Banner Quảng Cáo Lịch Tết 2027"
      className={`w-full max-w-[1440px] mx-auto ${className}`}
    >
      {href ? (
        <a href={href} className="block group cursor-pointer focus:outline-none">
          {content}
        </a>
      ) : (
        content
      )}
    </section>
  );
}
