import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

// Import chính xác các file ảnh asset bạn đã xuất từ Figma:
import logoImg from '../../assets/logo-tl.png';
import homeIcon from '../../assets/home-icon.png';
import searchIcon from '../../assets/search-icon.png';
import headphoneIcon from '../../assets/headphone-icon.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  // Danh sách menu chính xác theo Figma:
  // [Home Icon] | GIỚI THIỆU | DỊCH VỤ IN & THIẾT KẾ | HỆ THỐNG MÁY MÓC | BẢNG GIÁ | TIN TỨC | LIÊN HỆ | [Search Icon]
  const navLinks = [
    { name: 'GIỚI THIỆU', href: '#gioi-thieu' },
    { 
      name: 'DỊCH VỤ IN & THIẾT KẾ', 
      href: '#dich-vu',
      hasDropdown: true,
      subItems: [
        'Ấn phẩm bao bì (Hộp giấy, Túi giấy)',
        'Ấn phẩm văn phòng (Namecard, Folder, Tiêu đề thư)',
        'Bảng hiệu quảng cáo',
        'Tem nhãn decal',
        'Quà tặng doanh nghiệp',
        'In lịch Tết 2027',
      ]
    },
    { name: 'HỆ THỐNG MÁY MÓC', href: '#he-thong-may-moc' },
    { name: 'BẢNG GIÁ', href: '#bang-gia' },
    { name: 'TIN TỨC', href: '#tin-tuc' },
    { name: 'LIÊN HỆ', href: '#lien-he' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      
      {/* 
        FRAME TỔNG FIGMA:
        - Width: 1440px
        - Height: 164px
      */}
      <div className="w-full max-w-[1440px] mx-auto relative">
        
        {/* ==============================================================
            1. TOP BAR (Height: 114px, từ top: 0px -> 114px)
            Căn khung chuẩn nội dung 1130px (left: 155px, right: 155px)
        ============================================================== */}
        <div className="h-[114px] px-4 lg:px-0">
          <div className="w-full max-w-[1130px] mx-auto h-full flex items-center justify-between">
            
            {/* CỘT TRÁI: LOGO & TÊN CÔNG TY */}
            <Link to="/" className="flex items-center gap-3.5 group select-none">
              <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
                <img 
                  src={logoImg} 
                  alt="Logo Thắng Lợi" 
                  className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[11px] md:text-xs font-semibold uppercase text-brand-700 tracking-wider">
                  CÔNG TY CP TM VÀ DV IN ẤN
                </span>
                <span className="text-2xl md:text-[28px] font-black uppercase text-brand-primary tracking-tight leading-none mt-0.5">
                  THẮNG LỢI
                </span>
              </div>
            </Link>

            {/* CỘT GIỮA: SLOGAN CHỮ NGHỆ THUẬT */}
            <div className="hidden md:flex items-center justify-center flex-1 px-4">
              <span 
                className="font-cursive text-3xl lg:text-[40px] text-brand-primary font-normal tracking-wide select-none drop-shadow-xs"
                style={{ fontFamily: '"Alex Brush", "Dancing Script", cursive' }}
              >
                Professional Printing Solutions
              </span>
            </div>

            {/* CỘT PHẢI: HOTLINE TƯ VẤN VỚI ICON TAI NGHE FIGMA */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100">
                <img 
                  src={headphoneIcon} 
                  alt="Hotline icon" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500 leading-tight">
                  Hotline:
                </span>
                <a 
                  href="tel:0123456789" 
                  className="text-base md:text-lg font-bold text-accent-red hover:underline tracking-wide leading-tight whitespace-nowrap"
                >
                  0123.456.789
                </a>
              </div>

              {/* Toggle Menu cho Mobile */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="ml-2 p-2 rounded-lg text-brand-primary hover:bg-purple-50 lg:hidden focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* ==============================================================
            2. NAVIGATION BAR (Height: 50px, từ top: 114px -> 164px)
            Background full chiều rộng màu tím (#532470)
            
            FIGMA SPEC CỦA DẢI MENU:
            - width: 1130px
            - height: 20px
            - top: 129px (114px top bar + 15px padding top = 129px)
            - left: 155px (căn giữa trong frame 1440px: (1440 - 1130) / 2 = 155px)
        ============================================================== */}
        <nav className="hidden lg:block bg-brand-primary text-white h-[50px] relative">
          <div className="w-full max-w-[1130px] mx-auto h-full flex items-center justify-between">
            
            {/* Menu Items Row (Height: 20px chuẩn Figma) */}
            <div className="w-full h-[20px] flex items-center justify-between select-none">
              
              {/* 1. Icon Home (ảnh Vector 1 từ Figma) */}
              <Link 
                to="/" 
                className="flex items-center justify-center hover:opacity-80 transition-opacity"
                title="Trang chủ"
              >
                <img 
                  src={homeIcon} 
                  alt="Trang chủ" 
                  className="w-[20px] h-[18px] object-contain brightness-0 invert"
                />
              </Link>

              {/* 2. GIỚI THIỆU */}
              <a 
                href="#gioi-thieu"
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                GIỚI THIỆU
              </a>

              {/* 3. DỊCH VỤ IN & THIẾT KẾ */}
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <a 
                  href="#dich-vu"
                  className="flex items-center gap-1 text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
                >
                  DỊCH VỤ IN & THIẾT KẾ
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </a>

                {/* Dropdown danh mục */}
                {servicesDropdownOpen && (
                  <div className="absolute top-[28px] left-0 w-72 bg-white text-gray-800 shadow-2xl rounded-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {navLinks[1].subItems.map((sub, sIdx) => (
                      <a
                        key={sIdx}
                        href="#dich-vu"
                        className="block px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-primary transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. HỆ THỐNG MÁY MÓC */}
              <a 
                href="#he-thong-may-moc"
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                HỆ THỐNG MÁY MÓC
              </a>

              {/* 5. BẢNG GIÁ */}
              <a 
                href="#bang-gia"
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                BẢNG GIÁ
              </a>

              {/* 6. TIN TỨC */}
              <Link 
                to="/tin-tuc"
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                TIN TỨC
              </Link>

              {/* 7. LIÊN HỆ */}
              <a 
                href="#lien-he"
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                LIÊN HỆ
              </a>

              {/* 8. Icon Search (ảnh Vector 2 từ Figma) */}
              <div className="relative flex items-center">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none"
                  title="Tìm kiếm"
                >
                  <img 
                    src={searchIcon} 
                    alt="Tìm kiếm" 
                    className="w-[17px] h-[17px] object-contain brightness-0 invert"
                  />
                </button>

                {/* Search Bar Popup khi click icon kính lúp */}
                {searchOpen && (
                  <div className="absolute top-[32px] right-0 w-64 bg-white text-gray-800 p-2 rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 focus-within:border-brand-primary">
                      <img src={searchIcon} alt="" className="w-3.5 h-3.5 opacity-40" />
                      <input 
                        type="text" 
                        placeholder="Tìm kiếm sản phẩm, dịch vụ..."
                        className="w-full text-xs outline-none text-gray-700 placeholder-gray-400"
                        autoFocus
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </nav>

        {/* ==============================================================
            3. MOBILE RESPONSIVE DRAWER
        ============================================================== */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-primary text-white border-t border-purple-800 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="pb-2 border-b border-purple-800/60 mb-2">
              <span className="font-cursive text-2xl text-purple-200 block text-center">
                Professional Printing Solutions
              </span>
            </div>
            
            <Link 
              to="/" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src={homeIcon} alt="" className="w-4 h-4 brightness-0 invert" /> TRANG CHỦ
            </Link>

            {navLinks.map((item, index) => (
              <div key={index} className="space-y-1">
                <a
                  href={item.href}
                  className="block px-3 py-2 rounded-lg font-semibold text-xs tracking-wider hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
                {item.hasDropdown && (
                  <div className="pl-6 space-y-1 border-l-2 border-purple-400/40 ml-3">
                    {item.subItems.map((sub, sIdx) => (
                      <a
                        key={sIdx}
                        href="#dich-vu"
                        className="block py-1 text-xs text-purple-200 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        • {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Ô tìm kiếm trên mobile */}
            <div className="pt-2">
              <div className="flex items-center gap-2 bg-purple-900/60 border border-purple-700 rounded-lg px-3 py-2">
                <img src={searchIcon} alt="" className="w-4 h-4 brightness-0 invert opacity-70" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm dịch vụ in..."
                  className="bg-transparent text-xs text-white placeholder-purple-300 outline-none w-full"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
