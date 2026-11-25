import React, { useEffect, useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getClients } from '../../services/contentService';

/**
 * ClientsSection Component
 * Lấy danh sách đối tác qua Content Service (mô phỏng REST API)
 */
export default function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getClients().then(data => setClients(data));
  }, []);

  return (
    <section 
      aria-label="Khách hàng đối tác của chúng tôi"
      className="w-full max-w-[1140px] mx-auto px-4 mt-20 select-none"
    >
      {/* 1. TIÊU ĐỀ SECTION */}
      <SectionTitle 
        subtitle="IN ẤN THẮNG LỢI"
        title="KHÁCH HÀNG CỦA CHÚNG TÔI"
        showWatermark={true}
      />

      {/* 2. DẢI LOGO ĐỐI TÁC */}
      <div className="relative flex items-center justify-between mt-12">
        
        {/* Nút Prev */}
        <button 
          type="button"
          onClick={() => setCurrentPage(prev => (prev === 0 ? 3 : prev - 1))}
          className="w-8 h-8 rounded-full border border-gray-200 bg-white shadow-xs hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-primary transition-colors focus:outline-none flex-shrink-0"
          aria-label="Đối tác trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Danh sách 6 khung logo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mx-3 w-full">
          {clients.map((client) => (
            <div 
              key={client.id}
              className="h-[74px] bg-white rounded-lg border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-purple-200 transition-all duration-200 flex items-center justify-center p-3 cursor-pointer group"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="max-h-[42px] max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Nút Next */}
        <button 
          type="button"
          onClick={() => setCurrentPage(prev => (prev === 3 ? 0 : prev + 1))}
          className="w-8 h-8 rounded-full border border-gray-200 bg-white shadow-xs hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-primary transition-colors focus:outline-none flex-shrink-0"
          aria-label="Đối tác tiếp theo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* 3. 4 CHẤM PHÂN TRANG */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {[0, 1, 2, 3].map((dot) => (
          <button
            key={dot}
            type="button"
            onClick={() => setCurrentPage(dot)}
            className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none ${
              dot === currentPage 
                ? "bg-brand-primary scale-125" 
                : "border border-brand-primary bg-transparent hover:bg-purple-100"
            }`}
            aria-label={`Trang đối tác ${dot + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
