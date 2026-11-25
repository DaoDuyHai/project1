import React, { useState, useEffect } from 'react';
import SectionTitle from '../common/SectionTitle';
import CategoryTabs from './CategoryTabs';
import ProductGrid from './ProductGrid';
import { getCategories } from '../../services/productService';

/**
 * ServicesSection Component (Khu vực DỊCH VỤ IN ẤN)
 */
export default function ServicesSection() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

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

  return (
    <section 
      id="dich-vu"
      aria-label="Dịch vụ in ấn"
      className="w-full flex flex-col items-center"
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
          onSelectTab={(catId) => setSelectedCategoryId(catId)}
        />
      </div>

      {/* 3. LƯỚI 15 SẢN PHẨM & PHÂN TRANG (LỌC THEO TAB CATEGORY ĐANG CHỌN) */}
      <div className="w-full mt-[18.88px]">
        <ProductGrid categoryId={selectedCategoryId} />
      </div>
    </section>
  );
}
