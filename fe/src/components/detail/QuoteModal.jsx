import React, { useState } from 'react';
import { X, CheckCircle, Send, Phone, User, Hash, MessageSquare } from 'lucide-react';
import { submitQuote } from '../../services/productService';

/**
 * QuoteModal Component
 * Modal tiếp nhận yêu cầu báo giá từ khách hàng (API POST /api/quotes)
 */
export default function QuoteModal({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    quantity: 100,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    if (!formData.phoneNumber.trim() || formData.phoneNumber.trim().length < 9) {
      setError('Vui lòng nhập số điện thoại hợp lệ (ít nhất 9 chữ số).');
      return;
    }

    setLoading(true);

    try {
      await submitQuote({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        productId: product?.id || null,
        quantity: Number(formData.quantity) || 100,
        notes: formData.notes,
      });

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 animate-in zoom-in-75">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Gửi Yêu Cầu Thành Công!
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Cảm ơn <strong>{formData.fullName}</strong>! Yêu cầu báo giá cho sản phẩm <strong>"{product?.title}"</strong> đã được chuyển trực tiếp tới hệ thống xưởng in Thắng Lợi.
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              📞 Nhân viên kinh doanh sẽ liên hệ qua SĐT <strong>{formData.phoneNumber}</strong> trong ít phút!
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-8 py-2.5 rounded-full bg-brand-primary text-white text-xs font-semibold hover:bg-brand-800 transition-colors"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                TƯ VẤN & BÁO GIÁ TẬN XƯỞNG
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-2">
                Yêu Cầu Báo Giá Nhanh
              </h2>
              {product && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  Sản phẩm: <span className="font-semibold text-brand-primary">{product.title}</span>
                </p>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-3.5">
              {/* Họ và tên */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    required
                  />
                </div>
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Số điện thoại nhận báo giá <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Ví dụ: 0912 345 678"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    required
                  />
                </div>
              </div>

              {/* Số lượng cần in */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Số lượng dự kiến (hộp / cuốn / m²)
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
              </div>

              {/* Ghi chú yêu cầu */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Yêu cầu quy cách (Kích thước, cán màng, hạn lấy...)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Ví dụ: Cần in giấy Couche 300gsm, giao hàng trước thứ 6..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-xl bg-accent-red hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang gửi yêu cầu...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi Yêu Cầu Báo Giá Ngay</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
