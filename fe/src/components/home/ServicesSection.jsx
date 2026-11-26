import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import CategoryTabs from './CategoryTabs';
import ProductGrid from './ProductGrid';
import { getCategories } from '../../services/productService';

/**
 * ServicesSection Component (Khu vực DỊCH VỤ IN ẤN)
 */
export default function ServicesSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);

  const selectedCategoryId = searchParams.get('categoryId') || 'all';
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    getCategories().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCategories([
          { id: "all", name: "Tất cả" },
          ...data
        ]);
      }
    });
  }, []);

  const handleSelectTab = (catId) => {
    const next = new URLSearchParams(searchParams);
    if (String(catId) === 'all') {
      next.delete('categoryId');
    } else {
      next.set('categoryId', String(catId));
    }
    setSearchParams(next, { replace: true });
  };

  const handleClearKeyword = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('keyword');
    setSearchParams(next, { replace: true });
  };

  return (
    <section 
      id="dich-vu"
      aria-label="Dịch vụ in ấn"
      className="w-full flex flex-col items-center scroll-mt-[170px]"
    >
      {/* 1. TIÊU ĐỀ SECTION */}
      <div className="mt-[55px]">
        <SectionTitle 
          subtitle="IN ẤN THẮNG LỢI"
          title="DỊCH VỤ IN ẤN"
          showWatermark={true}
        />
      </div>

      {/* 2. THANH DANH MỤC TABS ĐỘNG TỪ BACKEND */}
      <div className="w-full mt-[51px]">
        <CategoryTabs 
          tabs={categories}
          activeTab={selectedCategoryId}
          onSelectTab={handleSelectTab}
        />
      </div>

      {/* HIỂN THỊ TRẠNG THÁI TÌM KIẾM NẾU CÓ */}
      {keyword && (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
          <span>
            Đang tìm kiếm: <strong className="text-brand-primary">"{keyword}"</strong>
          </span>
          <button
            type="button"
            onClick={handleClearKeyword}
            className="text-red-500 hover:underline font-semibold ml-1 cursor-pointer"
          >
            Xóa lọc
          </button>
        </div>
      )}

      {/* 3. LƯỚI 15 SẢN PHẨM & PHÂN TRANG (LỌC THEO TAB CATEGORY VÀ TỪ KHÓA) */}
      <div className="w-full mt-[18.88px]">
        <ProductGrid categoryId={selectedCategoryId} keyword={keyword} />
      </div>
    </section>
  );
}
