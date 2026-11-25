import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable ProductCard Component
 * 
 * Chuẩn hóa Semantic HTML5 theo tiêu chí VICO:
 * - Sử dụng thẻ <article> cho từng đối tượng sản phẩm độc lập
 * - Tiêu đề dùng thẻ <h3> phân cấp ngữ nghĩa chuẩn sau <h2> của section
 * - Hỗ trợ liên kết trực tiếp sang trang Chi tiết sản phẩm (/san-pham/:id)
 */
export default function ProductCard({
  id = 1,
  image,
  title = "IN GIẤY MỜI - THIỆP CƯỚI",
  href = `/san-pham/${id}`,
  className = "",
}) {
  const targetLink = href || `/san-pham/${id}`;

  return (
    <article 
      className={`group relative block w-[250.89px] h-[205.21px] bg-white rounded-[2px] border border-[#eeeeee] shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-200 select-none overflow-hidden ${className}`}
    >
      <Link to={targetLink} className="block w-full h-full focus:outline-none">
        {/* 1. KHUNG ẢNH CHUẨN FIGMA (230.73 x 158.02px) */}
        <div 
          className="absolute top-[9.61px] left-[10.08px] w-[230.73px] h-[158.02px] overflow-hidden bg-gray-50 rounded-[1px]"
        >
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* 2. NHÃN CHỮ TIÊU ĐỀ: Dùng thẻ <h3> chuẩn Semantic */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[37.58px] flex items-center justify-center px-2"
        >
          <h3 className="text-[11px] font-semibold text-[#222222] text-center uppercase tracking-wide line-clamp-1 group-hover:text-brand-primary transition-colors m-0">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
