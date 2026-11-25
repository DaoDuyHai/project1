import React, { useState } from 'react';

/**
 * ProductTabs Component
 * Hệ thống 4 Tab thông tin sản phẩm theo Figma:
 * - THÔNG TIN SẢN PHẨM (Mặc định active màu tím thương hiệu #532470)
 * - CHỨNG NHẬN
 * - HƯỚNG DẪN BẢO QUẢN
 * - VẬN CHUYỂN & ĐỔI TRẢ
 */
export default function ProductTabs({ tabs = [] }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || 'info');

  const currentTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <section aria-label="Mô tả và chính sách sản phẩm" className="w-full mt-12 select-none">
      
      {/* 1. DẢI TAB TIÊU ĐỀ */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 bg-[#e9ecef] rounded-t-[2px] overflow-hidden text-center text-xs md:text-[13px] font-bold">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              className={`py-3.5 px-3 transition-colors duration-150 uppercase tracking-wide focus:outline-none ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-sm' 
                  : 'bg-[#e5e7eb] text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* 2. KHUNG NỘI DUNG CHI TIẾT CỦA TAB ĐANG CHỌN */}
      <div className="w-full bg-[#fcfcfc] border border-t-0 border-gray-200 py-10 px-6 md:px-12 text-center rounded-b-[2px]">
        {currentTab && (
          <div className="max-w-[880px] mx-auto animate-in fade-in duration-200">
            <h2 className="text-xl md:text-2xl font-black text-[#111111] uppercase tracking-wide mb-4">
              {currentTab.heading}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-[800px] mx-auto">
              {currentTab.content}
            </p>
          </div>
        )}
      </div>

    </section>
  );
}
