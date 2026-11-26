import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredToken, verifySession } from '../../services/authService';

/**
 * ProtectedRoute Component
 * Kiểm tra JWT Token hợp lệ với Backend (/api/auth/me) trước khi cho phép vào trang Admin.
 * Nếu không có token hoặc token hết hạn/giả mạo -> tự động chuyển về /admin/login.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState('checking'); // checking | authorized | unauthorized

  useEffect(() => {
    let isMounted = true;
    const token = getStoredToken();

    if (!token) {
      setStatus('unauthorized');
      return;
    }

    verifySession()
      .then((user) => {
        if (!isMounted) return;
        setStatus(user ? 'authorized' : 'unauthorized');
      })
      .catch(() => {
        if (isMounted) setStatus('unauthorized');
      });

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium text-gray-500">Đang xác thực quyền quản trị...</span>
        </div>
      </div>
    );
  }

  if (status === 'unauthorized') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
