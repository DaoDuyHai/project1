import React, { useEffect, useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { getCompanyInfo } from '../../services/contentService';

/**
 * Footer Component
 * 
 * Khớp 100% bản mẫu media_1795587373321_31468553.png:
 * - Cột 1: Logo TL căn giữa, 2 dòng tên công ty màu tím, khung viền chữ nhật 4 ô mạng xã hội [ f | t | i | y ]
 * - Cột 2, 3, 4: Tiêu đề in hoa màu tím + thanh gạch ngang màu cam (#f59e0b) bên dưới
 * - Đáy chân trang: Dải tím © 2026 In Thắng Lợi. Designed by VicoGroup. All Rights Reserved.
 */
export default function Footer() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // Gọi hàm service mô phỏng gọi API
    getCompanyInfo().then(data => setCompany(data));
  }, []);

  if (!company) return null;

  return (
    <footer className="w-full bg-[#f7f7f7] border-t border-gray-200 mt-20 select-none">
      
      {/* KHUNG NỘI DUNG CHÍNH (4 CỘT) */}
      <div className="w-full max-w-[1140px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 items-start">
          
          {/* ==============================================================
              CỘT 1: LOGO, TÊN CÔNG TY & KHUNG MẠNG XÃ HỘI
          ============================================================== */}
          <div className="flex flex-col items-center text-center">
            {/* Logo giọt mực TL */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <img 
                src={company.logo} 
                alt="Logo Thắng Lợi" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* 2 dòng tên công ty màu tím in hoa */}
            <div className="mt-3 text-brand-primary font-bold text-xs tracking-wider leading-tight uppercase">
              <div>CÔNG TY CP TM VÀ DV</div>
              <div className="mt-0.5">IN ẤN THẮNG LỢI</div>
            </div>

            {/* Khung ô chữ nhật 4 mạng xã hội liền nhau [ f | t | in | yt ] */}
            <div className="mt-5 inline-flex border border-gray-300 rounded-[1px] bg-white shadow-2xs">
              <a 
                href="#facebook" 
                className="w-9 h-8 border-r border-gray-300 flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#twitter" 
                className="w-9 h-8 border-r border-gray-300 flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#instagram" 
                className="w-9 h-8 border-r border-gray-300 flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#youtube" 
                className="w-9 h-8 flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ==============================================================
              CỘT 2: LIÊN HỆ
          ============================================================== */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-primary">
              LIÊN HỆ
            </h4>
            {/* Thanh gạch cam */}
            <div className="w-9 h-[2px] bg-[#f59e0b] mt-1.5 mb-4 rounded-full" />

            <div className="text-xs text-[#333333] leading-relaxed space-y-2">
              <p>
                <strong className="text-black font-bold">Địa chỉ:</strong> {company.address}
              </p>
              <p>
                <strong className="text-black font-bold">Hotline:</strong> {company.hotline}
              </p>
              <p>
                <strong className="text-black font-bold">Email:</strong> {company.email}
              </p>
            </div>
          </div>

          {/* ==============================================================
              CỘT 3: LIÊN KẾT NHANH
          ============================================================== */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-primary">
              LIÊN KẾT NHANH
            </h4>
            {/* Thanh gạch cam */}
            <div className="w-9 h-[2px] bg-[#f59e0b] mt-1.5 mb-4 rounded-full" />

            <ul className="text-xs text-[#333333] space-y-2.5 list-none p-0 m-0">
              {company.quickLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:text-brand-primary transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ==============================================================
              CỘT 4: FANPAGE
          ============================================================== */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-brand-primary">
              FANPAGE
            </h4>
            {/* Thanh gạch cam */}
            <div className="w-9 h-[2px] bg-[#f59e0b] mt-1.5 mb-4 rounded-full" />

            {/* Khung xám Fanpage theo đúng ảnh mẫu */}
            <div 
              className="w-full h-[120px] bg-[#d9d9d9] rounded-[1px] border border-gray-300/40"
              aria-label="Khung nhúng Fanpage"
            />
          </div>

        </div>
      </div>

      {/* DẢI BẢN QUYỀN MÀU TÍM Ở ĐÁY */}
      <div className="w-full bg-[#532470] text-white py-3 px-4 text-center text-xs font-normal tracking-wide">
        {company.copyright}
      </div>

    </footer>
  );
}
