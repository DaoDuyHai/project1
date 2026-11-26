import React from 'react';
import { Inbox, Clock, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function QuoteStatsCards({ quotes = [], activeFilter = 'all', onSelectFilter }) {
  const total = quotes.length;
  const pending = quotes.filter((q) => q.status === 'Pending').length;
  const contacted = quotes.filter((q) => q.status === 'Contacted').length;
  const done = quotes.filter((q) => q.status === 'Done').length;

  const cards = [
    { key: 'all', label: 'Tổng yêu cầu', count: total, icon: Inbox, accent: 'text-brand-primary bg-purple-50' },
    { key: 'Pending', label: 'Chờ xử lý', count: pending, icon: Clock, accent: 'text-amber-600 bg-amber-50' },
    { key: 'Contacted', label: 'Đã liên hệ', count: contacted, icon: PhoneCall, accent: 'text-sky-600 bg-sky-50' },
    { key: 'Done', label: 'Đã chốt đơn', count: done, icon: CheckCircle2, accent: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.key;
        return (
          <button
            key={card.key}
            type="button"
            onClick={() => onSelectFilter(card.key)}
            className={`text-left bg-white p-4 rounded-xl border transition-all cursor-pointer ${
              isActive
                ? 'border-brand-primary ring-2 ring-brand-primary/15 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">{card.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.accent}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900 mt-2">{card.count}</div>
          </button>
        );
      })}
    </div>
  );
}
