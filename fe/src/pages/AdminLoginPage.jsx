import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, ArrowLeft } from 'lucide-react';
import { getStoredToken, loginAdmin, verifySession } from '../services/authService';
import logoImg from '../assets/logo-tl.png';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (getStoredToken()) {
      verifySession().then((user) => {
        if (user) navigate('/admin', { replace: true });
      });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginAdmin(username.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f5f7] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <img src={logoImg} alt="Logo Thắng Lợi" className="w-14 h-14 object-contain mb-3" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-purple-50 px-3 py-1 rounded-full">
            HỆ THỐNG QUẢN TRỊ NỘI BỘ
          </span>
          <h1 className="text-xl font-extrabold text-gray-900 mt-3">
            Đăng Nhập Quản Trị
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Chỉ dành cho nhân viên & quản lý Xưởng In Thắng Lợi
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-brand-primary hover:bg-brand-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Quay về trang chủ website
          </Link>
        </div>
      </div>
    </div>
  );
}
