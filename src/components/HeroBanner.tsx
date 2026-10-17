import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, Store } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { setActiveCategory, setIsMerchantModalOpen, currentMerchant, setCurrentView } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
              <span>فخر الصناعة المصرية 2026 🇪🇬</span>
              <span aria-hidden="true">·</span>
              <span>بالجنيه المصري</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              أرقى المنتجات والعلامات المصرية الأصيلة
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              من قطن المحلة الكبرى، إلى فخار الفيوم اليدوي، وزيوت زهور اللوتس النيلية، وجلود خان الخليلي التراثية. ادعم المنتج المصري بجودة تفوق التوقعات وتوصيل فوري لجميع محافظات مصر.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={scrollToCatalog}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-lg shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <span>تسوق المنتجات المصرية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (currentMerchant) {
                    setCurrentView('merchant-dashboard');
                  } else {
                    setIsMerchantModalOpen(true);
                  }
                }}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-lg border border-slate-900 transition-colors cursor-pointer"
              >
                <Store className="w-4 h-4 text-emerald-400" />
                <span>انضم كتاجر واعرض منتجاتك</span>
              </button>
            </div>

            {/* Proof signals for Egypt */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-slate-600 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>شحن لكافة المحافظات</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>فحص ومطابقة الجودة</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>فودافون كاش وإنستاباي</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-100">
              <img
                src="/src/assets/images/hero_lifestyle_store_1792169369095.jpg"
                alt="معرض المنتجات والحرف المصرية الأصيلة"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 right-4 left-4 text-white p-3.5 rounded-xl backdrop-blur-md bg-slate-900/70 border border-white/20 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-amber-300 font-semibold">مبادرة تشجيع الصناعة المحلية</p>
                  <p className="text-sm font-bold">بوابة مفتوحة لجميع الحرفيين والتجار المصريين</p>
                </div>
                <button
                  onClick={scrollToCatalog}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  تصفح الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
