import React from 'react';
import { Phone, Mail, Package, Calendar, UserCheck } from 'lucide-react';
import QuoteStatusBadge from './QuoteStatusBadge';

export default function QuotesTable({ quotes = [], updatingId = null, onChangeStatus }) {
  if (quotes.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-sm text-gray-500">
        Chưa có yêu cầu báo giá nào trong mục này.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">Khách hàng</th>
              <th className="py-3.5 px-4">Sản phẩm & Số lượng</th>
              <th className="py-3.5 px-4">Ghi chú</th>
              <th className="py-3.5 px-4">Ngày gửi</th>
              <th className="py-3.5 px-4">Người xử lý</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4 text-right">Cập nhật</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {quotes.map((q) => (
              <tr key={q.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3.5 px-4 font-mono text-gray-400">#{q.id}</td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-gray-900">{q.fullName}</div>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <Phone className="w-3 h-3 text-brand-primary" />
                    <a href={`tel:${q.phoneNumber}`} className="hover:underline font-medium">
                      {q.phoneNumber}
                    </a>
                  </div>
                  {q.email && (
                    <div className="flex items-center gap-1 text-gray-400 mt-0.5">
                      <Mail className="w-3 h-3" /> {q.email}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                    <Package className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
                    <span>{q.productTitle || 'Tư vấn chung'}</span>
                  </div>
                  <div className="text-gray-500 mt-1">
                    Số lượng: <strong className="text-gray-800">{q.quantity}</strong>
                  </div>
                </td>
                <td className="py-3.5 px-4 max-w-[240px]">
                  <p className="text-gray-600 line-clamp-2" title={q.notes || ''}>
                    {q.notes || <span className="text-gray-300 italic">Không có ghi chú</span>}
                  </p>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" /> {q.createdAt}
                  </span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {q.handledByName ? (
                    <div>
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-800">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> {q.handledByName}
                      </span>
                      {q.updatedAt && (
                        <div className="text-[10px] text-gray-400 mt-0.5">Cập nhật: {q.updatedAt}</div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Chưa có người nhận</span>
                  )}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <QuoteStatusBadge status={q.status} />
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <select
                    value={q.status}
                    disabled={updatingId === q.id}
                    onChange={(e) => onChangeStatus(q.id, e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 focus:outline-none focus:border-brand-primary disabled:opacity-50 cursor-pointer"
                  >
                    <option value="Pending">Chờ xử lý</option>
                    <option value="Contacted">Đã liên hệ</option>
                    <option value="Done">Đã chốt đơn</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
