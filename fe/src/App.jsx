import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage';
import MachinesPage from './pages/MachinesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#eef0f3] flex justify-center items-start overflow-x-clip w-full">
      <div className="w-full max-w-[1440px] bg-white min-h-screen flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.06)] relative">
        <Header />
        <main className="w-full flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* KHU VỰC QUẢN TRỊ NỘI BỘ (CHỈ TRUY CẬP TRỰC TIẾP QUA LINK /admin) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* WEBSITE CÔNG KHAI */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/san-pham/:id" element={<PublicLayout><ProductDetailPage /></PublicLayout>} />
        <Route path="/san-pham" element={<PublicLayout><ProductDetailPage /></PublicLayout>} />
        <Route path="/tin-tuc" element={<PublicLayout><NewsListPage /></PublicLayout>} />
        <Route path="/tin-tuc/:id" element={<PublicLayout><NewsDetailPage /></PublicLayout>} />
        <Route path="/gioi-thieu" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/he-thong-may-moc" element={<PublicLayout><MachinesPage /></PublicLayout>} />
        <Route path="/bang-gia" element={<PublicLayout><PricingPage /></PublicLayout>} />
        <Route path="*" element={<PublicLayout><HomePage /></PublicLayout>} />
      </Routes>
    </>
  );
}

export default App;
