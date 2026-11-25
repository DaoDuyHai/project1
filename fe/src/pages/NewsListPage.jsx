import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowRight, Tag } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Breadcrumb from '../components/detail/Breadcrumb';
import { getNews } from '../services/newsService';

/**
 * NewsListPage Component
 * Trang danh sách toàn bộ tin tức In Ấn Thắng Lợi (/tin-tuc)
 * Hỗ trợ nạp toàn bộ danh sách bài viết từ Backend C#
 */
export default function NewsListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNews(1, 20)
      .then((data) => {
        setArticles(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức mới nhất", href: "/tin-tuc" }
  ];

  return (
    <div className="w-full bg-white pb-20 animate-in fade-in duration-200">
      {/* 1. BREADCRUMB */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 mt-6">
        {/* TIÊU ĐỀ SECTION */}
        <div className="text-center my-8">
          <SectionTitle 
            subtitle="IN ẤN THẮNG LỢI"
            title="BẢN TIN CHUYÊN NGÀNH IN ẤN"
            showWatermark={true}
          />
          <p className="text-xs text-gray-500 mt-2">
            Cập nhật những xu hướng công nghệ in, kiến thức bao bì và cẩm nang thiết kế mới nhất
          </p>
        </div>

        {/* LƯỚI BÀI VIẾT */}
        {loading ? (
          <div className="w-full min-h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Đang tải tin tức...</span>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="w-full min-h-[200px] flex items-center justify-center text-gray-400 text-sm">
            Chưa có bài viết nào được đăng tải.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {articles.map((item) => (
              <article 
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Ảnh bài viết */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {item.isFeatured && (
                      <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        Nổi bật
                      </span>
                    )}
                  </div>

                  {/* Nội dung tóm tắt */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.createdAt}
                      </span>
                      {item.views > 0 && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {item.views}
                        </span>
                      )}
                    </div>

                    <h2 className="text-sm font-bold text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h2>

                    <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                      {item.summary || item.desc}
                    </p>
                  </div>
                </div>

                {/* Nút đọc tiếp */}
                <div className="p-5 pt-0">
                  <Link 
                    to={`/tin-tuc/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary group-hover:translate-x-1 transition-all"
                  >
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
