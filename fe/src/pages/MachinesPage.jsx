import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Factory, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Breadcrumb from '../components/detail/Breadcrumb';
import { getMachines } from '../services/contentService';
import factoryImg from '../assets/about-factory.png';

/**
 * MachinesPage Component (/he-thong-may-moc)
 * Hiển thị hệ thống máy móc, dây chuyền thiết bị in ấn từ Database SQL Server (GET /api/machines)
 */
export default function MachinesPage() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    setLoading(true);
    getMachines()
      .then((data) => {
        setMachines(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const tags = ['all', ...Array.from(new Set(machines.map((m) => m.categoryTag).filter(Boolean)))];
  const filtered = selectedTag === 'all'
    ? machines
    : machines.filter((m) => m.categoryTag === selectedTag);

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Hệ thống máy móc', href: '/he-thong-may-moc', current: true },
  ];

  return (
    <div className="w-full bg-white pb-20 animate-in fade-in duration-200">
      <Breadcrumb items={breadcrumbItems} />

      <div className="w-full max-w-[1130px] mx-auto px-4 lg:px-0 mt-4">
        {/* TIÊU ĐỀ SECTION */}
        <div className="text-center my-8">
          <SectionTitle
            subtitle="NĂNG LỰC SẢN XUẤT"
            title="HỆ THỐNG MÁY MÓC HIỆN ĐẠI"
            showWatermark={true}
          />
          <p className="text-xs md:text-sm text-gray-500 mt-3 max-w-[680px] mx-auto leading-relaxed">
            Xưởng In Ấn Thắng Lợi đầu tư đồng bộ dây chuyền máy in Offset công nghiệp, máy in kỹ thuật số
            và thiết bị gia công tự động nhập khẩu từ Đức, Nhật Bản, đảm bảo tiến độ nhanh và chuẩn màu sắc.
          </p>
        </div>

        {/* BỘ LỌC NHÓM MÁY */}
        {tags.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 mb-10">
            {tags.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-brand-primary'
                  }`}
                >
                  {tag === 'all' ? 'Tất cả thiết bị' : tag}
                </button>
              );
            })}
          </div>
        )}

        {/* DANH SÁCH MÁY MÓC */}
        {loading ? (
          <div className="w-full min-h-[260px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-400">Đang tải danh sách máy móc...</span>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-10 text-center my-8">
            <Factory className="w-12 h-12 text-brand-primary/60 mx-auto mb-3" />
            <h2 className="text-base font-bold text-gray-800">
              Chưa có dữ liệu máy móc trong Database
            </h2>
            <p className="text-xs text-gray-500 mt-1.5 max-w-[460px] mx-auto">
              Bảng <code>Machines</code> đã sẵn sàng. Hãy nạp dữ liệu thiết bị vào SQL Server để hiển thị tự động tại đây.
            </p>
            <Link
              to="/#dich-vu"
              className="mt-5 inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-brand-primary text-white text-xs font-semibold hover:bg-brand-800 transition-colors"
            >
              Xem dịch vụ in ấn <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {filtered.map((machine) => (
              <article
                key={machine.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* ẢNH THIẾT BỊ */}
                <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={machine.imageUrl || factoryImg}
                    alt={machine.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {machine.categoryTag}
                  </span>
                </div>

                {/* THÔNG TIN CHI TIẾT */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 mb-2">
                      {machine.brand && (
                        <span className="inline-flex items-center gap-1 font-semibold text-brand-primary bg-purple-50 px-2 py-0.5 rounded">
                          <Cpu className="w-3 h-3" /> {machine.brand}
                        </span>
                      )}
                      {machine.origin && (
                        <span className="inline-flex items-center gap-1">
                          <Globe className="w-3 h-3 text-gray-400" /> Xuất xứ: {machine.origin}
                        </span>
                      )}
                      {machine.modelCode && (
                        <span className="text-gray-400">Model: {machine.modelCode}</span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 leading-snug">
                      {machine.name}
                    </h2>

                    {machine.description && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {machine.description}
                      </p>
                    )}

                    {/* BẢNG THÔNG SỐ KỸ THUẬT JSON */}
                    {Array.isArray(machine.specifications) && machine.specifications.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                        {machine.specifications.map((spec, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                            <span className="text-gray-500 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
                              {spec.label}:
                            </span>
                            <span className="font-semibold text-gray-800 text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
