import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Share2, Tag } from 'lucide-react';
import { getNewsById } from '../services/newsService';
import Breadcrumb from '../components/detail/Breadcrumb';

/**
 * NewsDetailPage Component
 * Trang Chi tiết bài viết tin tức In Ấn Thắng Lợi
 * Tải trực tiếp dữ liệu từ SQL Server qua getNewsById(:id)
 */
export default function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getNewsById(id || 1)
      .then((data) => {
        if (isMounted) {
          setArticle(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải bài viết:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-gray-500">Đang tải bài viết...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">Không tìm thấy bài viết</h2>
          <Link to="/tin-tuc" className="mt-4 inline-block text-brand-primary underline text-sm">
            Quay lại danh sách tin tức
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: article.title, href: `/tin-tuc/${article.id}` }
  ];

  return (
    <div className="w-full bg-white pb-16 animate-in fade-in duration-200">
      {/* 1. THANH BREADCRUMB */}
      <Breadcrumb items={breadcrumbItems} />

      {/* 2. KHUNG NỘI DUNG CHÍNH (Max-width 1000px căn giữa chuẩn đọc bài viết) */}
      <div className="w-full max-w-[1000px] mx-auto px-4 lg:px-0 mt-6">
        
        {/* Nút quay lại */}
        <Link 
          to="/tin-tuc" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-brand-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách tin tức
        </Link>

        {/* TIÊU ĐỀ BÀI VIẾT */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1f2937] leading-tight tracking-tight">
          {article.title}
        </h1>

        {/* THÔNG TIN METADATA (Ngày đăng, lượt xem, chuyên mục) */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pb-4 border-b border-gray-100 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5 font-medium text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5" /> Tin tức & Kỹ thuật in
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400" /> {article.createdAt}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-gray-400" /> {article.views || 1200} lượt xem
          </span>
        </div>

        {/* ẢNH ĐẠI DIỆN NỔI BẬT */}
        <div className="w-full mt-6 rounded-2xl overflow-hidden shadow-sm bg-gray-50 max-h-[500px]">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* ĐOẠN TÓM TẮT SÁP NHẬP (LEAD PARAGRAPH) */}
        {article.summary && (
          <div className="mt-8 p-5 bg-purple-50/60 border-l-4 border-brand-primary rounded-r-xl">
            <p className="text-sm md:text-base font-semibold text-gray-800 italic leading-relaxed">
              "{article.summary}"
            </p>
          </div>
        )}

        {/* NỘI DUNG CHI TIẾT BÀI VIẾT (HỖ TRỢ HTML / PROSE) */}
        <div 
          className="mt-8 prose prose-purple max-w-none text-gray-700 leading-relaxed text-sm md:text-base space-y-4"
          dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.summary}</p>` }}
        />

        {/* 3. BÀI VIẾT LIÊN QUAN */}
        {article.related && article.related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.related.map((rel) => (
                <Link 
                  key={rel.id} 
                  to={`/tin-tuc/${rel.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="w-full aspect-[16/10] overflow-hidden bg-gray-50">
                    <img 
                      src={rel.image} 
                      alt={rel.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-brand-primary line-clamp-2 leading-snug">
                      {rel.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 mt-3 block">
                      📅 {rel.createdAt}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
