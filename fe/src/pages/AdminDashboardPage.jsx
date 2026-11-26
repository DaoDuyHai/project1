import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, RefreshCw, ShieldCheck, ExternalLink, Inbox, Package, Newspaper, Building2 } from 'lucide-react';
import QuoteStatsCards from '../components/admin/QuoteStatsCards';
import QuotesTable from '../components/admin/QuotesTable';
import ProductsManagerTab from '../components/admin/ProductsManagerTab';
import NewsManagerTab from '../components/admin/NewsManagerTab';
import CompanyInfoTab from '../components/admin/CompanyInfoTab';
import { getStoredUser, logoutAdmin } from '../services/authService';
import { getAdminQuotes, updateAdminQuoteStatus } from '../services/adminQuoteService';
import logoImg from '../assets/logo-tl.png';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [user] = useState(() => getStoredUser());
  const isAdmin = user?.role === 'Admin';

  const [activeTab, setActiveTab] = useState('quotes');
  const [quotes, setQuotes] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');

  const fetchQuotes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAdminQuotes('all');
      setQuotes(data);
    } catch (err) {
      if (err.status === 401) {
        logoutAdmin();
        navigate('/admin/login', { replace: true });
        return;
      }
      setError(err.message || 'Không thể tải danh sách yêu cầu báo giá.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleStatusChange = async (id, nextStatus) => {
    setUpdatingId(id);
    setError('');
    try {
      await updateAdminQuoteStatus(id, nextStatus);
      await fetchQuotes();
    } catch (err) {
      if (err.status === 401) {
        logoutAdmin();
        navigate('/admin/login', { replace: true });
        return;
      }
      setError(err.message || 'Cập nhật trạng thái thất bại.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const displayedQuotes =
    statusFilter === 'all' ? quotes : quotes.filter((q) => q.status === statusFilter);

  const tabs = [
    { id: 'quotes', label: 'Yêu cầu báo giá', icon: Inbox, adminOnly: false },
    { id: 'products', label: 'Sản phẩm & Bảng giá', icon: Package, adminOnly: true },
    { id: 'news', label: 'Tin tức', icon: Newspaper, adminOnly: true },
    { id: 'company', label: 'Thông tin công ty', icon: Building2, adminOnly: true },
  ].filter((t) => !t.adminOnly || isAdmin);

  return (
    <div className="min-h-screen w-full bg-[#f4f5f7] flex flex-col">
      {/* ADMIN TOP BAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Logo" className="w-9 h-9 object-contain" />
            <div>
              <div className="text-sm font-extrabold text-gray-900 leading-tight">
                Quản Trị Xưởng In Thắng Lợi
              </div>
              <div className="text-[11px] text-gray-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{user?.fullName || user?.username} — <strong>{user?.role}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:text-brand-primary hover:border-brand-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Xem Website
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Đăng xuất
            </button>
          </div>
        </div>

        {/* ADMIN MODULE TABS */}
        <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 overflow-x-auto border-t border-gray-100 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 py-8 space-y-6">
        {activeTab === 'quotes' && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-extrabold text-gray-900">
                  Danh Sách Yêu Cầu Báo Giá (Leads)
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Theo dõi người xử lý và cập nhật tiến độ tư vấn khách hàng
                </p>
              </div>

              <button
                type="button"
                onClick={fetchQuotes}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer self-start"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Làm mới dữ liệu
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
                {error}
              </div>
            )}

            <QuoteStatsCards
              quotes={quotes}
              activeFilter={statusFilter}
              onSelectFilter={setStatusFilter}
            />

            {loading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-gray-400">Đang tải danh sách báo giá...</span>
                </div>
              </div>
            ) : (
              <QuotesTable
                quotes={displayedQuotes}
                updatingId={updatingId}
                onChangeStatus={handleStatusChange}
              />
            )}
          </>
        )}

        {activeTab === 'products' && isAdmin && <ProductsManagerTab />}
        {activeTab === 'news' && isAdmin && <NewsManagerTab />}
        {activeTab === 'company' && isAdmin && <CompanyInfoTab />}
      </main>
    </div>
  );
}
