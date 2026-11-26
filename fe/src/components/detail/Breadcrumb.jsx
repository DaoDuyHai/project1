import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

/**
 * Breadcrumb Component
 * Chuẩn hóa Semantic HTML5 theo tiêu chí VICO:
 * - Dùng thẻ <nav aria-label="Breadcrumb"> và thẻ <ol> / <li>
 * - Hỗ trợ phân cấp điều hướng chuẩn UX/UI
 */
export default function Breadcrumb({ items = [] }) {
  const defaultItems = [
    { label: "Dịch vụ In & Thiết Kế", href: "/#dich-vu" },
    { label: "In Văn phòng", href: "/#van-phong" },
    { label: "In Card Visit", href: null, current: true },
  ];

  const rawItems = items.length > 0 ? items : defaultItems;
  const breadcrumbs = rawItems.filter(
    (crumb, idx) => !(idx === 0 && crumb.label?.trim().toLowerCase() === 'trang chủ')
  );

  return (
    <nav aria-label="Breadcrumb" className="w-full py-4 text-xs select-none">
      <div className="w-full max-w-[1130px] mx-auto px-4 lg:px-0 flex items-center flex-wrap gap-1.5 text-gray-500">
        
        {/* Nút về Trang chủ với Icon Home */}
        <Link 
          to="/" 
          className="flex items-center gap-1 hover:text-brand-primary transition-colors text-gray-600"
          title="Trang chủ"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Trang chủ</span>
        </Link>

        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1 || crumb.current;
          return (
            <React.Fragment key={idx}>
              <span className="text-gray-400 text-[11px]">/</span>
              {isLast ? (
                <span 
                  className="font-medium text-[#0284c7] hover:underline cursor-pointer"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.href || "/"} 
                  className="hover:text-brand-primary transition-colors text-gray-600"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}

      </div>
    </nav>
  );
}
