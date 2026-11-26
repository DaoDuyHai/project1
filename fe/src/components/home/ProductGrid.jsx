import React, { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import { getProducts } from '../../services/productService';

/**
 * ProductGrid Component
 * Lấy dữ liệu 15 sản phẩm theo danh mục và phân trang từ Backend
 */
export default function ProductGrid({ categoryId = 'all', keyword = '' }) {
  const [products, setProducts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [categoryId, keyword]);

  useEffect(() => {
    let isMounted = true;
    if (products.length === 0) {
      setInitialLoading(true);
    } else {
      setIsSwitching(true);
    }

    getProducts({
      categoryId: categoryId === 'all' ? null : categoryId,
      keyword: keyword || null,
      page: currentPage + 1,
      pageSize: 15,
    }).then(data => {
      if (!isMounted) return;
      setProducts(data);
      setInitialLoading(false);
      setIsSwitching(false);
    }).catch(() => {
      if (!isMounted) return;
      setInitialLoading(false);
      setIsSwitching(false);
    });

    return () => {
      isMounted = false;
    };
  }, [categoryId, keyword, currentPage]);

  return (
    <div 
      className="w-full max-w-[1440px] mx-auto pt-[37.13px] pb-[36px] flex flex-col justify-between items-center select-none"
    >
      {/* 1. LƯỚI SẢN PHẨM (Giữ danh sách cũ làm mờ nhẹ khi đổi tab để không bị nháy trắng) */}
      <div className="w-full flex justify-center px-[47.91px] min-h-[240px] items-start">
        {initialLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[22.43px] gap-y-[20px] justify-items-center w-full">
            {[...Array(15)].map((_, idx) => (
              <div
                key={idx}
                className="w-[250.89px] h-[205.21px] rounded-[2px] border border-[#eeeeee] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="w-full min-h-[240px] flex flex-col items-center justify-center text-gray-500">
            <p className="text-sm font-medium">Chưa có sản phẩm nào trong danh mục này.</p>
          </div>
        ) : (
          <div
            key={`${categoryId}-${keyword}-${currentPage}`}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[22.43px] gap-y-[20px] justify-items-center transition-opacity duration-200 animate-in fade-in ${
              isSwitching ? 'opacity-50 pointer-events-none' : 'opacity-100'
            }`}
          >
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
