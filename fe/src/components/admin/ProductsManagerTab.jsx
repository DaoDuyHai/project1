import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { getCategories, getProducts } from '../../services/productService';
import {
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from '../../services/adminCatalogService';
import ImageUploadField from './ImageUploadField';

const EMPTY_FORM = {
  title: '',
  sku: '',
  price: 0,
  priceUnit: '/hộp',
  categoryId: '',
  image: '',
  description: '',
};

export default function ProductsManagerTab() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.all([
        getCategories(),
        getProducts({ page: 1, pageSize: 100 }),
      ]);
      setCategories(cats || []);
      setProducts(prods || []);
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingItem('new');
    setFormData({
      ...EMPTY_FORM,
      categoryId: categories[0]?.id || 1,
    });
    setError('');
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      sku: item.sku || '',
      price: item.price || 0,
      priceUnit: item.priceUnit || '/hộp',
      categoryId: item.categoryId || categories[0]?.id || 1,
      image: item.image?.replace('http://localhost:5234', '') || '/uploads/products/p1.png',
      description: item.description || '',
    });
    setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: Number(formData.price) || 0,
        categoryId: Number(formData.categoryId),
      };

      if (editingItem === 'new') {
        await createAdminProduct(payload);
      } else {
        await updateAdminProduct(editingItem.id, payload);
      }

      setEditingItem(null);
      await loadData();
    } catch (err) {
      setError(err.message || 'Lưu sản phẩm thất bại.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Bạn có chắc muốn xóa sản phẩm "${item.title}"?`)) return;
    setError('');
    try {
      await deleteAdminProduct(item.id);
      await loadData();
    } catch (err) {
      setError(err.message || 'Xóa sản phẩm thất bại.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">Quản Lý Sản Phẩm & Bảng Giá</h2>
          <p className="text-xs text-gray-500">Thêm, sửa thông tin, đơn giá tham khảo hoặc xóa sản phẩm</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-800 text-white text-xs font-semibold cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm sản phẩm
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">{error}</div>
      )}

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-xs text-gray-400">
          Đang tải danh sách sản phẩm...
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-[11px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Sản phẩm</th>
                  <th className="py-3 px-4">Mã SKU</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4 text-right">Đơn giá</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60">
                    <td className="py-3 px-4 font-mono text-gray-400">#{item.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={item.image} alt="" className="w-9 h-9 rounded object-cover border border-gray-100" />
                        <span className="font-semibold text-gray-900">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-500">{item.sku || '-'}</td>
                    <td className="py-3 px-4 text-gray-600">{item.categoryName}</td>
                    <td className="py-3 px-4 text-right font-bold text-[#cc0000] whitespace-nowrap">
                      {Number(item.price).toLocaleString('vi-VN')} đ {item.priceUnit}
                    </td>
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

      {/* MODAL THÊM / SỬA SẢN PHẨM */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[520px] p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingItem === 'new' ? 'Thêm Sản Phẩm Mới' : `Cập Nhật Sản Phẩm #${editingItem.id}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Danh mục *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Mã SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="VD: VT016"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Giá tham khảo (VNĐ) *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Đơn vị tính</label>
                  <input
                    type="text"
                    value={formData.priceUnit}
                    onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
                    placeholder="/hộp, /cuốn, /cái"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Ảnh sản phẩm"
                folder="products"
                value={formData.image}
                onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
              />

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Mô tả</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
                />
              </div>

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
                  <Save className="w-3.5 h-3.5" /> {saving ? 'Đang lưu...' : 'Lưu sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
