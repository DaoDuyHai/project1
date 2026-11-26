import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { getFullImageUrl } from '../../services/apiClient';
import { uploadAdminImage } from '../../services/adminCatalogService';

export default function ImageUploadField({
  label = 'Hình ảnh',
  value = '',
  folder = 'products',
  onChange,
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');
    try {
      const res = await uploadAdminImage(file, folder);
      if (res?.url) {
        onChange(res.url);
      }
    } catch (err) {
      setUploadError(err.message || 'Tải ảnh lên thất bại.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const previewSrc = value ? getFullImageUrl(value) : '';

  return (
    <div>
      <label className="block font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-200 bg-gray-50/60">
        <div className="w-16 h-16 rounded-lg border border-gray-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
          {previewSrc ? (
            <img src={previewSrc} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-300" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:border-brand-primary hover:text-brand-primary text-xs font-semibold text-gray-700 cursor-pointer transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang tải lên...
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" /> Chọn ảnh từ máy
              </>
            )}
          </button>

          <p className="mt-1 text-[11px] text-gray-500 truncate">
            {value ? `Đã lưu: ${value}` : 'Chấp nhận JPG, PNG, WEBP, GIF (tối đa 5MB)'}
          </p>

          {uploadError && (
            <p className="mt-1 text-[11px] text-red-600">{uploadError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
