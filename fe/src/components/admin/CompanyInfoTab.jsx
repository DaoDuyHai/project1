import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { getCompanyInfo } from '../../services/contentService';
import { updateAdminCompanyInfo } from '../../services/adminCatalogService';

export default function CompanyInfoTab() {
  const [formData, setFormData] = useState({
    companyName: '',
    shortName: '',
    slogan: '',
    address: '',
    hotline: '',
    email: '',
    facebookUrl: '',
    youtubeUrl: '',
    copyright: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCompanyInfo()
      .then((data) => {
        setFormData({
          companyName: data.name || '',
          shortName: data.shortName || '',
          slogan: data.slogan || '',
          address: data.address || '',
          hotline: data.hotline || '',
          email: data.email || '',
          facebookUrl: data.facebookUrl || '',
          youtubeUrl: data.youtubeUrl || '',
          copyright: data.copyright || '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      await updateAdminCompanyInfo(formData);
      setMessage('Đã cập nhật thông tin công ty thành công! Header & Footer sẽ hiển thị dữ liệu mới.');
    } catch (err) {
      setError(err.message || 'Cập nhật thất bại.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-xs text-gray-400">
        Đang tải cấu hình doanh nghiệp...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs max-w-[780px]">
      <div className="mb-5">
        <h2 className="text-base font-bold text-gray-900">Cấu Hình Thông Tin Doanh Nghiệp</h2>
        <p className="text-xs text-gray-500">Chỉnh sửa thông tin hiển thị tại Header và Footer toàn trang</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">{error}</div>
      )}
      {message && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Tên đầy đủ công ty *</label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Tên hiển thị ngắn *</label>
            <input
              type="text"
              required
              value={formData.shortName}
              onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Hotline *</label>
            <input
              type="text"
              required
              value={formData.hotline}
              onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Địa chỉ xưởng / văn phòng *</label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Slogan *</label>
            <input
              type="text"
              required
              value={formData.slogan}
              onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Bản quyền chân trang *</label>
            <input
              type="text"
              required
              value={formData.copyright}
              onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Facebook URL</label>
            <input
              type="text"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">YouTube URL</label>
            <input
              type="text"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-800 text-white font-semibold cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? 'Đang lưu...' : 'Lưu thông tin công ty'}
          </button>
        </div>
      </form>
    </div>
  );
}
