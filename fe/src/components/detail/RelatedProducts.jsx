import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

/**
 * RelatedProducts Component ("Có thể bạn cũng thích")
 * Chuẩn hóa Semantic HTML5 theo tiêu chí VICO:
 * - Dùng thẻ <section> với <h2> cho tiêu đề mục
 * - Từng thẻ sản phẩm dùng thẻ <article> và <h3> cho tên sản phẩm
 * - Hiển thị huy hiệu giảm giá, huy hiệu "Mới", giá "Liên hệ" và đánh giá sao
 */
export default function RelatedProducts({ products = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading" className="w-full mt-14 mb-16 select-none">
      
      {/* 1. TIÊU ĐỀ SECTION */}
      <h2 
        id="related-products-heading"
        className="text-lg md:text-xl font-bold text-[#111111] tracking-tight mb-5"
      >
        Có thể bạn cũng thích
      </h2>

      {/* 2. LƯỚI 4 SẢN PHẨM LIÊN QUAN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <article 
            key={item.id}
            className="group relative bg-white border border-gray-100 rounded-[2px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-200 overflow-hidden flex flex-col"
          >
            <Link 
              to={`/san-pham/${item.id}`} 
              className="flex flex-col h-full focus:outline-none"
            >
              
              {/* KHUNG ẢNH SẢN PHẨM (Tỷ lệ vuông 269x269 chuẩn Figma) */}
              <div className="relative w-full aspect-square bg-[#f8f9fa] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* HUY HIỆU BADGES Ở GÓC TRÊN BÊN PHẢI (NẾU CÓ) */}
                {item.badges && item.badges.length > 0 && (
                  <div className="absolute top-2 right-2 flex flex-col items-end gap-1 pointer-events-none z-10">
                    {item.badges.map((b, bIdx) => (
                      <span
                        key={bIdx}
                        className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[2px] leading-tight shadow-xs ${
                          b.type === 'discount' 
                            ? 'bg-[#e53935]' 
                            : 'bg-[#1e88e5]'
                        }`}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* THÔNG TIN: TÊN SẢN PHẨM + GIÁ + SAO */}
              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <h3 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>

                <div className="mt-2.5 flex items-center justify-between">
                  {/* GIÁ "LIÊN HỆ" ĐỎ NỔI BẬT */}
                  <span className="text-xs md:text-sm font-bold text-[#cc0000]">
                    {item.priceText || "Liên hệ"}
                  </span>

                  {/* ĐÁNH GIÁ SAO (NẾU CÓ) */}
                  {item.rating && (
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, sIdx) => {
                        const isFilled = sIdx < Math.floor(item.rating);
                        return (
                          <Star
                            key={sIdx}
                            className={`w-3 h-3 ${isFilled ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

            </Link>
          </article>
        ))}
      </div>

    </section>
  );
}
