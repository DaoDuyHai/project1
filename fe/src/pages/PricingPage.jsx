import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Send, Eye } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Breadcrumb from '../components/detail/Breadcrumb';
import QuoteModal from '../components/detail/QuoteModal';
import { getCategories, getProducts } from '../services/productService';

/**
 * PricingPage Component (/bang-gia)
 * Bảng giá in ấn tham khảo động từ dữ liệu Sản phẩm & Danh mục SQL Server
 */
export default function PricingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('categoryId') || 'all';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [quoteProduct, setQuoteProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getCategories(),
      getProducts({ page: 1, pageSize: 100 }),
    ])
      .then(([cats, prods]) => {
        setCategories([{ id: 'all', name: 'Tất cả danh mục' }, ...(cats || [])]);
        setProducts(prods || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSelectCategory = (catId) => {
    setSelectedCat(String(catId));
    if (String(catId) === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ categoryId: String(catId) });
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchCat = selectedCat === 'all' || String(item.categoryId) === String(selectedCat);
    const q = keyword.trim().toLowerCase();
    const matchKeyword =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.sku?.toLowerCase().includes(q) ||
      item.categoryName?.toLowerCase().includes(q);
    return matchCat && matchKeyword;
  });

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Bảng giá dịch vụ', href: '/bang-gia', current: true },
  ];

  return (
    <div className="w-full bg-white pb-20 animate-in fade-in duration-200">
      <Breadcrumb items={breadcrumbItems} />

      <div className="w-full max-w-[1130px] mx-auto px-4 lg:px-0 mt-4">
        <div className="text-center my-8">
          <SectionTitle
            subtitle="IN ẤN THẮNG LỢI"
            title="BẢNG GIÁ IN ẤN THAM KHẢO"
            showWatermark={true}
          />
          <p className="text-xs md:text-sm text-gray-500 mt-3 max-w-[680px] mx-auto">
            Giá thực tế có thể ưu đãi hơn khi đặt số lượng lớn. Bấm <strong>Nhận báo giá</strong> để được xưởng in tư vấn chính xác theo quy cách giấy và gia công.
          </p>
        </div>

        {/* THANH LỌC DANH MỤC & TÌM KIẾM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#f8f9fa] p-4 rounded-xl border border-gray-100 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = String(selectedCat) === String(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64 flex-shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm tên sản phẩm, mã SKU..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        {/* BẢNG GIÁ */}
        {loading ? (
          <div className="w-full min-h-[260px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Đang tải bảng giá từ máy chủ...</span>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500 border border-gray-100 rounded-xl bg-gray-50/50">
            Không tìm thấy sản phẩm phù hợp với từ khóa/danh mục đã chọn.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-primary text-white uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 w-12 text-center">STT</th>
                  <th className="py-3.5 px-4">Sản phẩm / Dịch vụ</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Mã SP</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Danh mục</th>
                  <th className="py-3.5 px-4 text-right whitespace-nowrap">Giá tham khảo</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredProducts.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="py-3.5 px-4 text-center text-gray-400 font-medium">{idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <Link
                        to={`/san-pham/${item.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-11 h-11 rounded object-cover border border-gray-100 flex-shrink-0"
                          loading="lazy"
                        />
                        <span className="font-bold text-gray-900 group-hover:text-brand-primary transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500">
                      {item.sku || `SP${String(item.id).padStart(2, '0')}`}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {item.categoryName || 'In ấn Thắng Lợi'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className="font-extrabold text-[#cc0000] text-sm">
                        {item.price > 0
                          ? item.priceFormatted || `${Number(item.price).toLocaleString('vi-VN')} đ`
                          : 'Liên hệ'}
                      </span>
                      {item.price > 0 && (
                        <span className="text-gray-500 ml-1">{item.priceUnit || '/hộp'}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/san-pham/${item.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary font-medium transition-colors whitespace-nowrap"
                        >
                          <Eye className="w-3.5 h-3.5" /> Chi tiết
                        </Link>
                        <button
                          type="button"
                          onClick={() => setQuoteProduct(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#cc0000] hover:bg-[#b30000] text-white font-semibold transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Send className="w-3 h-3" /> Báo giá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <QuoteModal
        isOpen={Boolean(quoteProduct)}
        onClose={() => setQuoteProduct(null)}
        product={quoteProduct}
      />
    </div>
  );
}
