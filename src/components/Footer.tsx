import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Store } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveCategory, setCurrentView, setIsMerchantModalOpen, currentMerchant } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 text-right pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Value Props Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">شحن لجميع محافظات مصر</p>
              <p className="text-slate-400">بواسطة شركات الشحن المعتمدة (Bosta)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">منتجات مصرية أصيلة 100%</p>
              <p className="text-slate-400">مفحوصة ومعتمدة من الإدارة</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">معاينة واسترجاع مجاني</p>
              <p className="text-slate-400">حق المعاينة مع مندوب التوصيل</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">فودافون كاش وإنستاباي</p>
              <p className="text-slate-400">وسائل دفع مصرية ميسرة وسريعة</p>
            </div>
          </div>
        </div>

        {/* 4 Columns Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-xl font-black text-white tracking-tight block">
              رِوَاق مِصْر 🇪🇬 <span className="text-xs text-emerald-400 font-mono font-bold">RIWAQ EGYPT</span>
            </span>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              المنصة المصرية الرائدة لربط الحرفيين والتجار والمصانع المصرية بالمستهلك مباشرة، لدعم المنتج المحلي وتوفير أجود الخامات بالجنيه المصري.
            </p>
            <div className="pt-2 text-slate-400 space-y-1">
              <p>سجل تجاري مصري: <span className="font-mono text-slate-300">189402</span></p>
              <p>بطاقة ضريبية معتمدة: <span className="font-mono text-slate-300">512-890-334</span></p>
            </div>
          </div>

          {/* Egyptian Categories */}
          <div className="md:col-span-2 space-y-2.5">
            <p className="font-bold text-white text-sm">أقسام السوق المصري</p>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('store');
                    setActiveCategory('textiles');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  القطن والمفروشات
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('store');
                    setActiveCategory('pottery');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  فخار وخزف الفيوم
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('store');
                    setActiveCategory('fragrance');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  عطور اللوتس والياسمين
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('store');
                    setActiveCategory('leather');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  جلود خان الخليلي
                </button>
              </li>
            </ul>
          </div>

          {/* Merchants & Partners */}
          <div className="md:col-span-2 space-y-2.5">
            <p className="font-bold text-white text-sm">خدمات التجار</p>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    if (currentMerchant) {
                      setCurrentView('merchant-dashboard');
                    } else {
                      setIsMerchantModalOpen(true);
                    }
                  }}
                  className="hover:text-emerald-400 font-bold text-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>انضم كتاجر مصري</span>
                </button>
              </li>
              <li>
                <span className="hover:text-emerald-400 cursor-pointer">نظام العمولات (10%)</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 cursor-pointer">باقات الإعلانات المميزة</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 cursor-pointer">معايير قبول المنتجات</span>
              </li>
            </ul>
          </div>

          {/* Egyptian Payment Badges */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-bold text-white text-sm">طرق الدفع والتحويل في مصر</p>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono font-semibold">
              <span className="bg-emerald-950 text-emerald-300 px-2 py-1 rounded border border-emerald-800">
                فودافون كاش
              </span>
              <span className="bg-purple-950 text-purple-300 px-2 py-1 rounded border border-purple-800">
                إنستاباي InstaPay
              </span>
              <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded border border-slate-700">
                كارت ميزة Meeza
              </span>
              <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded border border-slate-700">
                فيزا وماستركارد
              </span>
              <span className="bg-slate-800 text-slate-200 px-2 py-1 rounded border border-slate-700">
                دفع عند الاستلام
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              جميع العمليات تتم بالجنيه المصري (EGP) بحماية وتشفير مصرفي كامل.
            </p>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 رواق مصر للتجارة الإلكترونية ودعم الصناعات الوطنية. صنع بكل فخر في مصر 🇪🇬</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">سياسة الاسترجاع والضمان</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">اتفاقية عمولة التجار</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">حماية المستهلك</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
