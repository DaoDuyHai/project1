import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Factory, FileSpreadsheet, Sparkles } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Breadcrumb from '../components/detail/Breadcrumb';
import { getWhyChooseUs } from '../services/contentService';
import factoryImg from '../assets/about-factory.png';

/**
 * AboutPage Component (/gioi-thieu)
 * Trang giới thiệu chi tiết về Công ty CP TM và DV In Ấn Thắng Lợi
 */
export default function AboutPage() {
  const [pillars, setPillars] = useState([]);

  useEffect(() => {
    getWhyChooseUs().then((data) => setPillars(data || []));
  }, []);

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu công ty', href: '/gioi-thieu', current: true },
  ];

  const strengths = [
    'Quy trình in Offset & Kỹ thuật số khép kín đạt chuẩn màu CMYK 98%',
    'Chất liệu giấy đa dạng: Couche, Bristol, Ivory, Kraft, Giấy mỹ thuật cao cấp',
    'Gia công sau in hiện đại: Ép kim vi tính, dập nổi 3D, cán màng mờ/bóng, phủ UV định hình',
    'Hỗ trợ in nhanh lấy ngay trong ngày và giao hàng nội thành trong 24h',
  ];

  return (
    <div className="w-full bg-white pb-20 animate-in fade-in duration-200">
      <Breadcrumb items={breadcrumbItems} />

      <div className="w-full max-w-[1130px] mx-auto px-4 lg:px-0 mt-4">
        <div className="text-center my-8">
          <SectionTitle
            subtitle="VỀ CHÚNG TÔI"
            title="CÔNG TY CP TM VÀ DV IN ẤN THẮNG LỢI"
            showWatermark={true}
          />
        </div>

        {/* KHỐI GIỚI THIỆU CHÍNH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-10">
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <img
              src={factoryImg}
              alt="Xưởng in công nghiệp Thắng Lợi"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary bg-purple-50 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Đối tác in ấn tin cậy của doanh nghiệp
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">
              Biến ý tưởng thương hiệu thành ấn phẩm sắc nét, đẳng cấp
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              In Ấn Thắng Lợi tự hào là đơn vị sản xuất trực tiếp tận xưởng không qua trung gian, phục vụ hàng nghìn doanh nghiệp từ các ấn phẩm văn phòng (danh thiếp, catalogue, tiêu đề thư) đến bao bì hộp giấy, túi giấy cao cấp và ấn phẩm quảng cáo khổ lớn.
            </p>

            <ul className="space-y-2.5 pt-2">
              {strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                to="/he-thong-may-moc"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary text-white text-xs font-semibold hover:bg-brand-800 transition-colors"
              >
                <Factory className="w-4 h-4" /> Xem hệ thống máy móc
              </Link>
              <Link
                to="/bang-gia"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-brand-primary text-brand-primary text-xs font-semibold hover:bg-purple-50 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" /> Xem bảng giá dịch vụ
              </Link>
              <Link
                to="/#dich-vu"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
              >
                Danh mục sản phẩm <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 GIÁ TRỊ CỐT LÕI */}
        {pillars.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-10 uppercase tracking-wide">
              4 Cam Kết Vàng Tại Xưởng In Thắng Lợi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f8f9fa] rounded-2xl p-6 text-center border border-gray-100 flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-purple-100 flex items-center justify-center p-2 mb-3">
                    <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
