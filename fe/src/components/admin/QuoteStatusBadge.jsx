import React from 'react';

const STATUS_MAP = {
  Pending: {
    label: 'Chờ xử lý',
    classes: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  Contacted: {
    label: 'Đã liên hệ',
    classes: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  Done: {
    label: 'Đã chốt đơn',
    classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};

export default function QuoteStatusBadge({ status }) {
  const config = STATUS_MAP[status] || {
    label: status || 'Không rõ',
    classes: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.classes}`}>
      {config.label}
    </span>
  );
}
