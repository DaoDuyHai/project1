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
    <div className="w-full bg-brand-primary h-[48px] flex items-center justify-center select-none shadow-sm">
      <div className="w-full max-w-[1302px] h-full px-4 lg:px-0 flex items-center">
        <div className="flex items-center gap-3 lg:gap-5 w-full h-full justify-between overflow-x-auto no-scrollbar">
          {categoryList.map((tab, idx) => {
            const tabId = typeof tab === 'object' ? tab.id : tab;
            const tabName = typeof tab === 'object' ? tab.name : tab;
            const isActive = String(activeTab) === String(tabId);

            return (
              <button
                key={tabId || idx}
                type="button"
                onClick={() => onSelectTab(tabId)}
                className={`relative px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-none ${
                  isActive
                    ? "bg-white text-brand-primary shadow-sm scale-[1.02]"
                    : "text-white/90 hover:text-white hover:bg-white/15"
                }`}
              >
                {tabName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
