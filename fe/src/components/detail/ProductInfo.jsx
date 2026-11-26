import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Info, Phone, Send } from 'lucide-react';
import QuoteModal from './QuoteModal';

/**
 * ProductInfo Component
 * Cung cấp thông tin chi tiết, bảng thông số, giá tham khảo và nút CTA Báo giá
 * Chuẩn hóa Semantic HTML5 theo tiêu chí VICO:
 * - Tiêu đề sản phẩm dùng thẻ <h1>
 * - Phân cấp dữ liệu bằng thẻ <table> hoặc dl/dt/dd chuẩn SEO
 */
export default function ProductInfo({ product }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  if (!product) return null;

  const {
    title = "Danh thiếp in giấy couche/Bristol 300gsm",
    sku = "VT001",
    rating = 5,
    priceFormatted = "155.000",
    priceUnit = "/hộp",
    priceNote = "(Giá tham khảo)",
    priceGuideText = "Quý khách xem bảng giá chi tiết dưới đây",
    priceLinks = [],
    specs = [],
    hotline = "091 8585 505",
    perks = [],
  } = product;

  return (
    <section aria-label="Thông tin chi tiết sản phẩm" className="w-full flex flex-col justify-start select-none">
      
      {/* 1. TIÊU ĐỀ SẢN PHẨM: Dùng thẻ <h1> chuẩn SEO cho trang chi tiết */}
      <h1 className="text-xl md:text-2xl font-bold text-[#1f2937] leading-snug tracking-tight">
        {title}
      </h1>

      {/* 2. ĐÁNH GIÁ SAO VÀ MÃ SẢN PHẨM */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <span className="text-xs text-gray-400">
          Mã sản phẩm: <strong className="font-semibold text-gray-500">{sku}</strong>
        </span>
      </div>

      {/* 3. GIÁ THAM KHẢO */}
      <div className="mt-3.5 flex items-baseline flex-wrap">
        <span className="text-2xl md:text-3xl font-extrabold text-[#cc0000] tracking-tight">
          {priceFormatted}
        </span>
        <span className="text-xs md:text-sm font-medium text-gray-600 ml-1">
          {priceUnit}
        </span>
        <span className="text-xs md:text-sm font-normal text-gray-400 ml-2">
          {priceNote}
        </span>
      </div>

      {/* 4. HƯỚNG DẪN XEM BẢNG GIÁ CHI TIẾT */}
      <div className="mt-3 space-y-1.5">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
          <Info className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
          <span>{priceGuideText}</span>
        </p>
        <div className="space-y-1 pl-5">
          {priceLinks.map((link, idx) => (
            <Link 
              key={idx}
              to={link.href || "/bang-gia"}
              className="flex items-center gap-1 text-xs font-semibold text-[#0284c7] hover:underline"
            >
              <span>&rarr;</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. BẢNG THÔNG TIN SẢN PHẨM (SPECS TABLE) */}
      <div className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2 border-b pb-1.5 border-gray-200">
          THÔNG TIN SẢN PHẨM
        </h2>
        <table className="w-full text-xs text-left border-collapse">
          <tbody>
            {specs.map((item, idx) => (
              <tr 
                key={idx} 
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
              >
                <th scope="row" className="py-2 pr-3 font-medium text-gray-500 w-[110px] whitespace-nowrap">
                  {item.label}
                </th>
                <td className="py-2 text-gray-800 font-semibold">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6. NÚT KÊU GỌI HÀNH ĐỘNG (CTA HOTLINE & MODAL BÁO GIÁ) */}
      <div className="mt-6 flex flex-wrap items-center gap-3 max-w-[480px]">
        <button 
          type="button"
          onClick={() => setIsQuoteOpen(true)}
          className="flex-1 min-w-[200px] bg-[#cc0000] hover:bg-[#b30000] active:scale-[0.99] text-white py-3 px-5 rounded-[3px] font-bold text-center text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Yêu Cầu Báo Giá</span>
        </button>

        <a 
          href={`tel:${hotline.replace(/\s+/g, '')}`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-[3px] font-semibold text-center text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#cc0000]" />
          <span>{hotline}</span>
        </a>
      </div>

      {/* MODAL TIẾP NHẬN YÊU CẦU BÁO GIÁ */}
      <QuoteModal 
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        product={product}
      />

      {/* 7. HAI HUY HIỆU CAM KẾT (PERKS) */}
      {perks.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-8 max-w-[480px]">
          {perks.map((perk, pIdx) => (
            <div key={pIdx} className="flex items-center gap-2.5">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <img 
                  src={perk.icon} 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-800 leading-tight">
                  {perk.title}
                </span>
                <span className="text-[11px] text-gray-500 leading-tight mt-0.5">
                  {perk.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
