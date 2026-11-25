import React from 'react';

/**
 * CategoryTabs Component
 * 
 * Hỗ trợ hiển thị danh mục động từ Backend hoặc danh sách mặc định
 */
export default function CategoryTabs({
  activeTab = "all",
  onSelectTab = () => {},
  tabs = [],
}) {
  const defaultCategories = [
    { id: "all", name: "Tất cả" },
    { id: 1, name: "In Card Visit" },
    { id: 2, name: "In Catalogue" },
    { id: 3, name: "In Bao bì" },
    { id: 4, name: "In Tem nhãn" },
    { id: 5, name: "In Tờ rơi" },
  ];

  const categoryList = tabs && tabs.length > 0 ? tabs : defaultCategories;

  return (
    <div className="w-full bg-brand-primary h-[48px] flex items-center justify-center select-none shadow-sm overflow-hidden">
      <div className="w-full max-w-[1302px] h-[22px] px-4 lg:px-0 flex items-center justify-between">
        <div className="flex items-center gap-[36px] lg:gap-[49px] w-full justify-between overflow-x-auto no-scrollbar">
          {categoryList.map((tab, idx) => {
            const tabId = typeof tab === 'object' ? tab.id : tab;
            const tabName = typeof tab === 'object' ? tab.name : tab;
            const isActive = String(activeTab) === String(tabId);

            return (
              <button
                key={tabId || idx}
                type="button"
                onClick={() => onSelectTab(tabId)}
                className={`relative text-[13px] font-semibold tracking-wider whitespace-nowrap transition-all duration-200 focus:outline-none ${
                  isActive 
                    ? "text-white font-bold drop-shadow-sm" 
                    : "text-white/85 hover:text-white"
                }`}
              >
                {tabName}
                
                {/* Đường gạch chân khi tab active */}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-white rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
