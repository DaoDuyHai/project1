import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import { getNews } from '../../services/newsService';

/**
 * NewsSection Component
 * Hiển thị khối Tin tức Trang chủ (1 bài lớn tiêu điểm + 3 bài nhỏ)
 * Click vào bất kỳ bài nào sẽ dẫn sang trang Chi tiết tin tức (/tin-tuc/:id)
 * Nút "Xem thêm" dẫn sang trang Danh sách toàn bộ tin tức (/tin-tuc)
 */
export default function NewsSection() {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    getNews().then(data => setNewsData(data));
  }, []);

  if (!newsData) {
    return (
      <div className="w-full max-w-[1140px] mx-auto py-12 text-center text-xs text-gray-400">
        Đang tải tin tức...
      </div>
    );
  }

  const { featured, articles } = newsData;

  return (
    <section 
      id="tin-tuc"
      aria-label="Tin tức mới nhất"
      className="w-full max-w-[1140px] mx-auto px-4 mt-20 select-none"
    >
      {/* 1. TIÊU ĐỀ SECTION */}
      <SectionTitle 
        subtitle="IN ẤN THẮNG LỢI"
        title="TIN TỨC MỚI NHẤT"
        showWatermark={true}
      />

      {/* 2. LƯỚI TIN TỨC: 1 BÀI LỚN + 3 BÀI NHỎ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-12">
        
        {/* BÀI VIẾT LỚN TIÊU ĐIỂM (Ảnh lớn bên trái) */}
        {featured && (
          <Link 
            to={`/tin-tuc/${featured.id}`} 
            className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 flex flex-col cursor-pointer block"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
              <img 
                src={featured.image} 
                alt={featured.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Lớp phủ gradient chữ ở đáy ảnh theo thiết kế */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-brand-primary text-white px-2 py-0.5 rounded w-max mb-2">
                  Tiêu điểm
                </span>
                <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-2 group-hover:text-purple-200 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-xs text-white/75 mt-2 line-clamp-2 leading-relaxed">
                  {featured.excerpt || featured.desc}
                </p>
                <div className="flex items-center gap-3 mt-3 text-[11px] text-white/60">
                  <span>📅 {featured.createdAt}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* 3 BÀI VIẾT NHỎ (Bên phải) */}
        <div className="flex flex-col justify-between gap-4">
          {articles.map((article) => (
            <Link 
              key={article.id}
              to={`/tin-tuc/${article.id}`}
              className="group bg-white rounded-xl p-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer block"
            >
              {/* Thumbnail ảnh */}
              <div className="w-[125px] sm:w-[135px] h-[88px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Nội dung bài viết */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-medium text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                    Tin in ấn
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {article.createdAt}
                  </span>
                </div>
                <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {article.desc || article.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* 3. NÚT XEM THÊM (Chuyển sang trang /tin-tuc) */}
      <div className="mt-10 flex justify-center">
        <Link
          to="/tin-tuc"
          className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-brand-primary text-white text-xs font-semibold tracking-wider hover:bg-brand-800 hover:shadow-md transition-all duration-200 focus:outline-none"
        >
          Xem thêm bài viết
        </Link>
      </div>
    </section>
  );
}
