import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-[#eef0f3] flex justify-center items-start overflow-x-hidden w-full">
      {/* 
        MASTER CANVAS CONTAINER (1440PX FIXED ARTBOARD)
      */}
      <div className="w-full max-w-[1440px] bg-white min-h-screen flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.06)] relative">
        {/* Tự động cuộn lên đầu trang khi chuyển trang */}
        <ScrollToTop />

        {/* 1. HEADER CHUNG (Figma: 1440px x 164px) */}
        <Header />

        {/* 2. KHU VỰC NỘI DUNG CHÍNH (ĐIỀU HƯỚNG ROUTING) */}
        <main className="w-full flex-1">
          <Routes>
            {/* Desktop 1: Trang chủ */}
            <Route path="/" element={<HomePage />} />
            
            {/* Desktop 2: Trang Chi Tiết Sản Phẩm */}
            <Route path="/san-pham/:id" element={<ProductDetailPage />} />
            <Route path="/san-pham" element={<ProductDetailPage />} />

            {/* Trang Danh Sách Tin Tức */}
            <Route path="/tin-tuc" element={<NewsListPage />} />

            {/* Trang Chi Tiết Tin Tức */}
            <Route path="/tin-tuc/:id" element={<NewsDetailPage />} />

            {/* Đường dẫn mặc định fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* 3. CHÂN TRANG FOOTER CHUNG (Figma: 1440px) */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
