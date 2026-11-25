import React, { useState, useEffect } from 'react';

/**
 * ProductGallery Component
 * Hiển thị ảnh lớn sản phẩm kèm 4 ảnh thumbnail bên dưới
 * Chuẩn Figma Desktop 2:
 * - Ảnh chính tỷ lệ vuông ~581x581px
 * - 4 ảnh thumbnail bên dưới có viền active khi chọn
 */
export default function ProductGallery({ images, title = "Hình ảnh sản phẩm" }) {
  const defaultThumbnails = images?.thumbnails || [];
  const initialMain = images?.main || (defaultThumbnails.length > 0 ? defaultThumbnails[0] : null);
  
  const [selectedImage, setSelectedImage] = useState(initialMain);
  const [activeIndex, setActiveIndex] = useState(0);

  // Tự động cập nhật ảnh chính khi chuyển sang sản phẩm khác
  useEffect(() => {
    setSelectedImage(initialMain);
    setActiveIndex(0);
  }, [initialMain]);

  const handleSelect = (img, index) => {
    setSelectedImage(img);
    setActiveIndex(index);
  };

  return (
    <div className="w-full select-none">
      {/* 1. KHUNG ẢNH CHÍNH (Figma: ~581px x 581px) */}
      <div className="relative w-full aspect-square max-w-[581px] bg-white rounded-[2px] overflow-hidden border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center">
        <img 
          src={selectedImage || initialMain} 
          alt={title} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* 2. DẢI 4 THUMBNAIL BÊN DƯỚI */}
      {defaultThumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-3.5 max-w-[581px]">
          {defaultThumbnails.map((thumb, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(thumb, idx)}
                className={`relative aspect-[131/123] w-full rounded-[2px] overflow-hidden border transition-all duration-200 focus:outline-none ${
                  isActive 
                    ? 'border-brand-primary ring-2 ring-brand-primary/20 shadow-sm scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                }`}
                aria-label={`Xem ảnh ${idx + 1}`}
              >
                <img 
                  src={thumb} 
                  alt={`${title} thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
