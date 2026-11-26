import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { getCompanyInfo } from '../../services/contentService';
import { getCategories } from '../../services/productService';
import { scrollToTargetId } from '../common/ScrollToTop';

// Import chính xác các file ảnh asset bạn đã xuất từ Figma:
import logoImg from '../../assets/logo-tl.png';
import homeIcon from '../../assets/home-icon.png';
import searchIcon from '../../assets/search-icon.png';
import headphoneIcon from '../../assets/headphone-icon.png';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [company, setCompany] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCompanyInfo().then(data => setCompany(data));
    getCategories().then(data => {
      if (Array.isArray(data)) setCategories(data);
    });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchText.trim();
    setSearchOpen(false);
    setMobileMenuOpen(false);
    if (q) {
      navigate(`/?keyword=${encodeURIComponent(q)}#dich-vu`);
    } else {
      navigate('/#dich-vu');
    }
    if (location.pathname === '/') {
      setTimeout(() => scrollToTargetId('dich-vu'), 50);
    }
  };

  // Đảm bảo bấm cùng 1 nút nhiều lần liên tiếp vẫn cuộn chuẩn xác tới đúng vị trí
  const handleHomeOrHashClick = (e, hashId = null, keepRouterNav = false) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);

    if (!hashId) {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Nút LIÊN HỆ luôn cuộn xuống Footer ngay tại trang đang đứng
    if (hashId === 'lien-he') {
      e.preventDefault();
      scrollToTargetId('lien-he');
      return;
    }

    // Nếu đang ở trang chủ và không cần đổi query (?categoryId=), cuộn trực tiếp không làm giật Router
    if (location.pathname === '/' && !keepRouterNav) {
      e.preventDefault();
      scrollToTargetId(hashId);
    }
  };

  const hotlineText = company?.hotline || '0123.456.789';
  const hotlineHref = `tel:${hotlineText.replace(/[^0-9+]/g, '')}`;
  const sloganText = company?.slogan || 'Professional Printing Solutions';
  const shortNameText = company?.shortName || 'THẮNG LỢI';

  const navLinks = [
    { name: 'GIỚI THIỆU', to: '/#gioi-thieu' },
    {
      name: 'DỊCH VỤ IN & THIẾT KẾ',
      to: '/#dich-vu',
      hasDropdown: true,
    },
    { name: 'HỆ THỐNG MÁY MÓC', to: '/he-thong-may-moc' },
    { name: 'BẢNG GIÁ', to: '/bang-gia' },
    { name: 'TIN TỨC', to: '/tin-tuc' },
    { name: 'LIÊN HỆ', to: '/#lien-he' },
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
            <Link to="/" onClick={(e) => handleHomeOrHashClick(e)} className="flex items-center gap-3.5 group select-none">
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
                  {shortNameText}
                </span>
              </div>
            </Link>

            {/* CỘT GIỮA: SLOGAN CHỮ NGHỆ THUẬT */}
            <div className="hidden md:flex items-center justify-center flex-1 px-4">
              <span 
                className="font-cursive text-3xl lg:text-[40px] text-brand-primary font-normal tracking-wide select-none drop-shadow-xs"
                style={{ fontFamily: '"Alex Brush", "Dancing Script", cursive' }}
              >
                {sloganText}
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
                  href={hotlineHref} 
                  className="text-base md:text-lg font-bold text-accent-red hover:underline tracking-wide leading-tight whitespace-nowrap"
                >
                  {hotlineText}
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
                onClick={(e) => handleHomeOrHashClick(e)}
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
              <Link 
                to="/#gioi-thieu"
                onClick={(e) => handleHomeOrHashClick(e, 'gioi-thieu')}
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                GIỚI THIỆU
              </Link>

              {/* 3. DỊCH VỤ IN & THIẾT KẾ */}
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <Link 
                  to="/#dich-vu"
                  onClick={(e) => handleHomeOrHashClick(e, 'dich-vu')}
                  className="flex items-center gap-1 text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
                >
                  DỊCH VỤ IN & THIẾT KẾ
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </Link>

                {/* Dropdown danh mục động từ Backend */}
                {servicesDropdownOpen && (
                  <div className="absolute top-[28px] left-0 w-64 bg-white text-gray-800 shadow-2xl rounded-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      to="/#dich-vu"
                      onClick={(e) => handleHomeOrHashClick(e, 'dich-vu', true)}
                      className="block px-4 py-2.5 text-xs font-semibold text-brand-primary hover:bg-purple-50 transition-colors border-b border-gray-50"
                    >
                      Tất cả dịch vụ in ấn
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/?categoryId=${cat.id}#dich-vu`}
                        onClick={(e) => handleHomeOrHashClick(e, 'dich-vu', true)}
                        className="block px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-primary transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. HỆ THỐNG MÁY MÓC */}
              <Link 
                to="/he-thong-may-moc"
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                HỆ THỐNG MÁY MÓC
              </Link>

              {/* 5. BẢNG GIÁ */}
              <Link 
                to="/bang-gia"
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                BẢNG GIÁ
              </Link>

              {/* 6. TIN TỨC */}
              <Link 
                to="/tin-tuc"
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                TIN TỨC
              </Link>

              {/* 7. LIÊN HỆ */}
              <Link 
                to="/#lien-he"
                onClick={(e) => handleHomeOrHashClick(e, 'lien-he')}
                className="text-[13px] font-semibold tracking-wider text-white/95 hover:text-white transition-colors"
              >
                LIÊN HỆ
              </Link>

              {/* 8. Icon Search (ảnh Vector 2 từ Figma) */}
              <div className="relative flex items-center">
                <button 
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
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
                  <form
                    onSubmit={handleSearchSubmit}
                    className="absolute top-[32px] right-0 w-72 bg-white text-gray-800 p-2 rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 focus-within:border-brand-primary">
                      <img src={searchIcon} alt="" className="w-3.5 h-3.5 opacity-40" />
                      <input 
                        type="text" 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Tìm kiếm sản phẩm, dịch vụ..."
                        className="w-full text-xs outline-none text-gray-700 placeholder-gray-400"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="text-[11px] font-semibold text-white bg-brand-primary px-2.5 py-1 rounded cursor-pointer hover:bg-brand-800"
                      >
                        Tìm
                      </button>
                    </div>
                  </form>
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
              onClick={(e) => handleHomeOrHashClick(e)}
            >
              <img src={homeIcon} alt="" className="w-4 h-4 brightness-0 invert" /> TRANG CHỦ
            </Link>

            {navLinks.map((item, index) => {
              const hashId = item.to.includes('#') ? item.to.split('#')[1] : null;
              return (
                <div key={index} className="space-y-1">
                  <Link
                    to={item.to}
                    className="block px-3 py-2 rounded-lg font-semibold text-xs tracking-wider hover:bg-white/10"
                    onClick={(e) => handleHomeOrHashClick(e, hashId)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && categories.length > 0 && (
                    <div className="pl-6 space-y-1 border-l-2 border-purple-400/40 ml-3">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/?categoryId=${cat.id}#dich-vu`}
                          className="block py-1 text-xs text-purple-200 hover:text-white"
                          onClick={(e) => handleHomeOrHashClick(e, 'dich-vu', true)}
                        >
                          • {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Ô tìm kiếm trên mobile */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="flex items-center gap-2 bg-purple-900/60 border border-purple-700 rounded-lg px-3 py-2">
                <img src={searchIcon} alt="" className="w-4 h-4 brightness-0 invert opacity-70" />
                <input 
                  type="text" 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Tìm kiếm dịch vụ in..."
                  className="bg-transparent text-xs text-white placeholder-purple-300 outline-none w-full"
                />
              </div>
            </form>
          </div>
        )}

      </div>
    </header>
  );
}
