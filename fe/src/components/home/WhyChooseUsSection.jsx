import React, { useEffect, useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import { getWhyChooseUs } from '../../services/contentService';

/**
 * WhyChooseUsSection Component
 * Lấy danh sách lợi thế qua Content Service (mô phỏng REST API)
 */
export default function WhyChooseUsSection() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    getWhyChooseUs().then(data => setFeatures(data));
  }, []);

  return (
    <section 
      aria-label="Vì sao lựa chọn chúng tôi"
      className="w-full max-w-[1140px] mx-auto px-4 mt-20 select-none"
    >
      {/* 1. TIÊU ĐỀ SECTION */}
      <SectionTitle 
        subtitle="IN ẤN THẮNG LỢI"
        title="VÌ SAO LỰA CHỌN CHÚNG TÔI"
        showWatermark={true}
      />

      {/* 2. LƯỚI 4 CARD TÍNH NĂNG */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {features.map((item) => (
          <article 
            key={item.id}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(83,36,112,0.12)] hover:-translate-y-1 transition-all duration-300 p-6 pt-11 text-center flex flex-col items-center"
          >
            {/* Icon tròn nhô lên trên đỉnh card */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white shadow-md border border-purple-100 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110">
              <img 
                src={item.icon} 
                alt={item.title} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Tiêu đề đặc điểm */}
            <h3 className="text-sm font-bold text-gray-900 tracking-tight group-hover:text-brand-primary transition-colors">
              {item.title}
            </h3>

            {/* Đoạn mô tả */}
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
