import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { getNews, getNewsById } from '../../services/newsService';
import {
  createAdminNews,
  updateAdminNews,
  deleteAdminNews,
} from '../../services/adminCatalogService';
import ImageUploadField from './ImageUploadField';

const EMPTY_FORM = {
  title: '',
  summary: '',
  content: '',
  image: '',
  isFeatured: false,
};

export default function NewsManagerTab() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getNews(1, 50);
      setArticles(data?.items || []);
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách tin tức.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingItem('new');
    setFormData(EMPTY_FORM);
    setError('');
  };

  const openEdit = async (item) => {
    setError('');
    const detail = await getNewsById(item.id);
    setEditingItem(item);
    setFormData({
      title: detail?.title || item.title || '',
      summary: detail?.summary || item.summary || '',
      content: detail?.content || '',
      image: item.image?.replace('http://localhost:5234', '') || '/uploads/news/news-1.png',
      isFeatured: Boolean(detail?.isFeatured ?? item.isFeatured),
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingItem === 'new') {
        await createAdminNews(formData);
      } else {
        await updateAdminNews(editingItem.id, formData);
      }
      setEditingItem(null);
      await loadData();
    } catch (err) {
      setError(err.message || 'Lưu bài viết thất bại.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bài viết "${item.title}"?`)) return;
    setError('');
    try {
      await deleteAdminNews(item.id);
      await loadData();
    } catch (err) {
      setError(err.message || 'Xóa bài viết thất bại.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">Quản Lý Tin Tức</h2>
          <p className="text-xs text-gray-500">Đăng bài viết mới, chỉnh sửa hoặc xóa tin tức</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-800 text-white text-xs font-semibold cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Thêm bài viết
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">{error}</div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-xs text-gray-400">
          Đang tải danh sách bài viết...
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-[11px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Bài viết</th>
                  <th className="py-3 px-4">Ngày đăng</th>
                  <th className="py-3 px-4 text-center">Lượt xem</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {articles.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60">
                    <td className="py-3 px-4 font-mono text-gray-400">#{item.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={item.image} alt="" className="w-12 h-8 rounded object-cover border border-gray-100" />
                        <div>
                          <div className="font-semibold text-gray-900 line-clamp-1">{item.title}</div>
                          {item.isFeatured && (
                            <span className="text-[10px] font-bold text-brand-primary">★ Tiêu điểm</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{item.createdAt}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{item.views}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" /> Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[540px] p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingItem === 'new' ? 'Thêm Bài Viết Mới' : `Cập Nhật Bài Viết #${editingItem.id}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Tiêu đề *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Tóm tắt *</label>
                <textarea
                  rows="2"
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nội dung chi tiết (hỗ trợ HTML)</label>
                <textarea
                  rows="4"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                />
              </div>

              <ImageUploadField
                label="Ảnh đại diện bài viết"
                folder="news"
                value={formData.image}
                onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
              />

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <span className="font-semibold text-gray-700">Đánh dấu bài Tiêu điểm</span>
              </label>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-brand-primary hover:bg-brand-800 text-white font-semibold cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" /> {saving ? 'Đang lưu...' : 'Lưu bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
