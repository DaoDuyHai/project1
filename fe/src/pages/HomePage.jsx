import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import ServicesSection from '../components/home/ServicesSection';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsSection from '../components/home/NewsSection';
import ClientsSection from '../components/home/ClientsSection';

/**
 * HomePage Component (Desktop - 1)
 * Tập hợp đầy đủ toàn bộ các section của Trang chủ In Ấn Thắng Lợi theo thiết kế Figma
 */
export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. HERO BANNER (Rectangle 6: 1440x539.62px) */}
      <HeroBanner />

      {/* 2. DỊCH VỤ IN ẤN (Tiêu đề, Tabs danh mục, Lưới 15 thẻ Card & Phân trang) */}
      <ServicesSection />

      {/* 3. CHÚNG TÔI LÀ AI & CHÚNG TÔI LÀM GÌ? (Ảnh xưởng 508x351px & Giới thiệu) */}
      <AboutSection />

      {/* 4. VÌ SAO LỰA CHỌN CHÚNG TÔI (4 Thẻ tính năng icon nổi) */}
      <WhyChooseUsSection />

      {/* 5. KHÁCH HÀNG NÓI VỀ CHÚNG TÔI (Khối nền tím, ảnh chân dung & trích dẫn) */}
      <TestimonialsSection />

      {/* 6. TIN TỨC MỚI NHẤT (1 Bài lớn tiêu điểm + 3 Bài nhỏ bên phải) */}
      <NewsSection />

      {/* 7. KHÁCH HÀNG CỦA CHÚNG TÔI (Dải logo các đối tác: Dior, YSL, VnExpress, Ngân hàng...) */}
      <ClientsSection />
    </div>
  );
}
