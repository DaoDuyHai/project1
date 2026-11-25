import React, { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import { getProducts } from '../../services/productService';

/**
 * ProductGrid Component
 * Lấy dữ liệu 15 sản phẩm theo danh mục và phân trang từ Backend
 */
export default function ProductGrid({ categoryId = 'all' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    getProducts({
      categoryId: categoryId === 'all' ? null : categoryId,
      page: currentPage + 1,
      pageSize: 15,
    }).then(data => {
      setProducts(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [categoryId, currentPage]);

  return (
    <div 
      className="w-full max-w-[1440px] mx-auto min-h-[766.09px] pt-[37.13px] pb-[36px] flex flex-col justify-between items-center select-none"
    >
      {/* 1. LƯỚI 15 THẺ SẢN PHẨM */}
      <div className="w-full flex justify-center px-[47.91px]">
        {loading ? (
          <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Đang tải sản phẩm từ máy chủ...</span>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-gray-500">
            <p className="text-sm font-medium">Chưa có sản phẩm nào trong danh mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[22.43px] gap-y-[20px] justify-items-center">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                href={`/san-pham/${product.id}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. THANH PHÂN TRANG 4 CHẤM TRÒN */}
      <div className="mt-8 flex items-center justify-center gap-2.5 h-[15px]">
        {[0, 1, 2, 3].map((dotIndex) => {
          const isActive = currentPage === dotIndex;
          return (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setCurrentPage(dotIndex)}
              className={`w-[13px] h-[13px] rounded-full transition-all duration-200 focus:outline-none ${
                isActive 
                  ? "bg-brand-primary border border-brand-primary shadow-xs scale-105" 
                  : "border-1.5 border-brand-primary bg-transparent hover:bg-brand-primary/20"
              }`}
              style={{
                borderWidth: isActive ? '1px' : '1.5px',
                borderColor: '#532470',
              }}
              aria-label={`Trang ${dotIndex + 1}`}
              title={`Trang ${dotIndex + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
