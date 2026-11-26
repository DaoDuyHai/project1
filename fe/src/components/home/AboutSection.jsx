import React from 'react';
import { Link } from 'react-router-dom';
import factoryImg from '../../assets/about-factory.png';
import patternImg from '../../assets/about-pattern.png';
import watermarkImg from '../../assets/section-watermark.png';

/**
 * AboutSection Component
 * 
 * Chuẩn hóa Semantic HTML5 theo tiêu chí VICO:
 * - Sử dụng thẻ <section> có aria-label
 * - Danh sách đặc điểm nổi bật dùng thẻ danh sách <ul> và <li>
 * - Đoạn văn dùng <p>, tiêu đề dùng <h2>
 */
export default function AboutSection() {
  const highlightsCol1 = [
    "Giấy chất lượng cao",
    "Giao hàng trong 24h",
  ];

  const highlightsCol2 = [
    "Mực thân thiện môi trường",
    "Dịch vụ thiết kế",
  ];

  return (
    <section 
      id="gioi-thieu"
      aria-label="Giới thiệu xưởng in Thắng Lợi"
      className="w-full max-w-[1060px] mx-auto px-4 mt-14 lg:mt-16 select-none scroll-mt-[180px]"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        
        {/* ==============================================================
            CỘT TRÁI: KHỐI CHỮ & THÔNG TIN (Rộng ~465px)
        ============================================================== */}
        <div className="w-full lg:w-[465px] flex-shrink-0 flex flex-col items-start justify-center">
          
          {/* 1. KHỐI TIÊU ĐỀ (Watermark + Subtitle + Main Title) */}
          <div className="relative">
            {/* Watermark giọt mực TL */}
            <div 
              className="absolute -top-[24px] left-[12px] pointer-events-none select-none z-0"
              style={{ width: '108px', height: '90px' }}
            >
              <img 
                src={watermarkImg} 
                alt="" 
                className="w-full h-full object-contain select-none"
              />
            </div>

            {/* Subtitle */}
            <span className="relative z-10 text-[13px] font-medium uppercase text-brand-primary tracking-[0.24em] block">
              IN ẤN THẮNG LỢI
            </span>

            {/* Main Title: <h2> phân cấp */}
            <h2 className="relative z-10 text-[28px] sm:text-[31px] font-bold uppercase text-black tracking-tight leading-[1.25] mt-2">
              CHÚNG TÔI LÀ AI<br />& CHÚNG TÔI LÀM GÌ?
            </h2>
          </div>

          {/* 2. ĐOẠN VĂN BẢN GIỚI THIỆU (<p>) */}
          <p className="text-[13.5px] leading-[1.65] text-[#555555] mt-5 max-w-[440px]">
            In Ấn Thắng Lợi là xưởng in sáng tạo chuyên biến ý tưởng của bạn thành hiện thực. 
            Từ danh thiếp cao cấp đến in ấn biển quảng cáo quy mô lớn, chúng tôi kết hợp nghệ thủ 
            công truyền thống với công nghệ hiện đại.
          </p>

          {/* 3. CHECKLIST ĐẶC ĐIỂM NỔI BẬT: Dùng <ul> và <li> chuẩn HTML5 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-6 w-full max-w-[430px]">
            {/* Cột 1 */}
            <ul className="space-y-3 list-none p-0 m-0">
              {highlightsCol1.map((item, index) => (
                <li key={index} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" aria-hidden="true" />
                  <span className="text-[13px] font-medium text-gray-700 whitespace-nowrap">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Cột 2 */}
            <ul className="space-y-3 list-none p-0 m-0">
              {highlightsCol2.map((item, index) => (
                <li key={index} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" aria-hidden="true" />
                  <span className="text-[13px] font-medium text-gray-700 whitespace-nowrap">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. NÚT KÊU GỌI HÀNH ĐỘNG: XEM THÊM */}
          <div className="mt-7">
            <Link
              to="/gioi-thieu"
              className="inline-flex items-center justify-center px-7 py-2 rounded-full bg-brand-primary text-white text-xs font-medium tracking-wider hover:bg-brand-800 hover:shadow-md transition-all duration-200 focus:outline-none"
            >
              Xem thêm
            </Link>
          </div>

        </div>

        {/* ==============================================================
            CỘT PHẢI: HÌNH ẢNH XƯỞNG IN (508x351px) + PATTERN LÓT NỀN
        ============================================================== */}
        <div className="w-full lg:w-[508px] flex-shrink-0 flex items-center justify-center pl-2 pt-2">
          <figure className="relative w-[508px] h-[351px] m-0">
            
            {/* Lớp pattern trang trí kẻ ô (pattern.png) */}
            <div 
              className="absolute -top-[14px] -left-[18px] w-[514px] h-[368px] pointer-events-none select-none z-0 hidden sm:block opacity-75"
              aria-hidden="true"
            >
              <img 
                src={patternImg} 
                alt="" 
                className="w-full h-full object-cover rounded-[1px]"
              />
            </div>

            {/* Khung ảnh xưởng in công nghiệp (508x351px) */}
            <div className="relative z-10 w-[508px] h-[351px] overflow-hidden rounded-[1px] shadow-[0_3px_15px_rgba(0,0,0,0.06)] bg-white">
              <img 
                src={factoryImg} 
                alt="Xưởng in công nghiệp hiện đại Thắng Lợi" 
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
            </div>

          </figure>
        </div>

      </div>
    </section>
  );
}
