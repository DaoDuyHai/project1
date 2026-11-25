import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/detail/Breadcrumb';
import ProductGallery from '../components/detail/ProductGallery';
import ProductInfo from '../components/detail/ProductInfo';
import ProductTabs from '../components/detail/ProductTabs';
import RelatedProducts from '../components/detail/RelatedProducts';
import { getProductDetail } from '../services/productService';

/**
 * ProductDetailPage Component (Desktop 2 - Figma)
 * Trang Chi tiết sản phẩm In Ấn Thắng Lợi
 * Chuẩn hóa Kiến trúc VICO:
 * - Gọi dữ liệu bất đồng bộ qua Service API (getProductDetail)
 * - Tách module component rõ ràng: Breadcrumb, Gallery, Info, Tabs, Related
 * - Tuân thủ cấu trúc Semantic HTML5 và kích thước 1130px chuẩn Figma
 */
export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getProductDetail(id || 1)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
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
          <span className="text-sm font-medium text-gray-500">Đang tải chi tiết sản phẩm...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">Không tìm thấy sản phẩm</h2>
          <a href="/" className="mt-4 inline-block text-brand-primary underline text-sm">
            Quay lại trang chủ
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white animate-in fade-in duration-200">
      
      {/* 1. THANH ĐIỀU HƯỚNG BREADCRUMB */}
      <Breadcrumb items={product.breadcrumb} />

      {/* 2. KHUNG NỘI DUNG CHÍNH (Max-width 1130px căn giữa theo Figma) */}
      <div className="w-full max-w-[1130px] mx-auto px-4 lg:px-0">
        
        {/* PHẦN TRÊN: 2 CỘT (CỘT TRÁI: GALLERY ẢNH, CỘT PHẢI: THÔNG TIN VÀ NÚT BÁO GIÁ) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mt-2">
          {/* CỘT 1: GALLERY ẢNH */}
          <div>
            <ProductGallery 
              images={product.images} 
              title={product.title} 
            />
          </div>

          {/* CỘT 2: THÔNG TIN CHI TIẾT & BÁO GIÁ */}
          <div>
            <ProductInfo 
              product={product} 
            />
          </div>
        </div>

        {/* PHẦN GIỮA: HỆ THỐNG 4 TAB MÔ TẢ & CHÍNH SÁCH */}
        <ProductTabs 
          tabs={product.tabs} 
        />

        {/* PHẦN DƯỚI: SẢN PHẨM LIÊN QUAN ("CÓ THỂ BẠN CŨNG THÍCH") */}
        <RelatedProducts 
          products={product.relatedProducts} 
        />

      </div>

    </div>
  );
}
