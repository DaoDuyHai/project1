import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonials } from '../../services/contentService';

/**
 * TestimonialsSection Component
 * Lấy danh sách đánh giá qua Content Service (mô phỏng REST API)
 */
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getTestimonials().then(data => setTestimonials(data));
  }, []);

  if (testimonials.length === 0) {
    return (
      <section
        aria-label="Khách hàng nói về chúng tôi"
        className="w-full bg-[#532470] text-white py-16 lg:py-20 mt-20 min-h-[480px] flex items-center justify-center"
      >
        <div className="w-10 h-10 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      </section>
    );
  }

  const current = testimonials[currentSlide % testimonials.length];

  return (
    <section 
      aria-label="Khách hàng nói về chúng tôi"
      className="w-full bg-[#532470] text-white py-16 lg:py-20 mt-20 relative overflow-hidden select-none"
    >
      {/* Họa tiết lưới mờ trang trí phía sau */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 w-full max-w-[1140px] mx-auto px-4 lg:px-8">
        
        {/* Nút mũi tên Prev / Next 2 bên */}
        <div className="relative flex items-center justify-between">
          
          <button 
            type="button"
            onClick={() => setCurrentSlide(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            className="hidden md:flex absolute -left-8 lg:-left-10 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white items-center justify-center transition-all duration-200 focus:outline-none"
            aria-label="Lời nhận xét trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* KHUNG NỘI DUNG CHÍNH (Ảnh + Lời nhận xét) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-center mx-auto max-w-[960px]">
            
            {/* Cột trái: Ảnh chân dung khách hàng */}
            <div className="flex justify-center">
              <div className="w-[260px] lg:w-[300px] aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl border-2 border-white/10 bg-purple-900/40">
                <img 
                  src={current.avatar} 
                  alt={current.name} 
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Cột phải: Tiêu đề & Lời nhận xét */}
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold uppercase tracking-tight text-white leading-tight">
                KHÁCH HÀNG<br />NÓI VỀ CHÚNG TÔI
              </h2>

              <blockquote className="text-[13.5px] leading-relaxed text-purple-100/85 mt-6 border-l-2 border-purple-400/50 pl-4 italic">
                "{current.quote}"
              </blockquote>

              <div className="mt-6">
                <div className="text-base font-bold text-white tracking-wide">
                  {current.name}
                </div>
                <div className="text-xs text-purple-200/70 mt-0.5">
                  {current.role}
                </div>
              </div>
            </div>

          </div>

          <button 
            type="button"
            onClick={() => setCurrentSlide(prev => (prev + 1) % testimonials.length)}
            className="hidden md:flex absolute -right-8 lg:-right-10 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 text-white items-center justify-center transition-all duration-200 focus:outline-none"
            aria-label="Lời nhận xét tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* 4 Chấm phân trang ở đáy */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => setCurrentSlide(dot % testimonials.length)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 focus:outline-none ${
                dot === (currentSlide % 4)
                  ? "bg-white scale-125" 
                  : "border border-white/40 bg-transparent hover:bg-white/20"
              }`}
              aria-label={`Chuyển đến đánh giá ${dot + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
