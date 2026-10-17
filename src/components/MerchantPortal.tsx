import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EGYPTIAN_GOVERNORATES } from '../data/initialProducts';
import { Product, ListingType } from '../types/store';
import {
  Store,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  TrendingUp,
  Package,
  X,
  Sparkles,
  LogOut,
  Phone,
  HelpCircle,
  Eye
} from 'lucide-react';

export const MerchantPortalModal: React.FC = () => {
  const {
    isMerchantModalOpen,
    setIsMerchantModalOpen,
    currentMerchant,
    loginMerchant,
    registerMerchant,
    setCurrentView
  } = useStore();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form
  const [regData, setRegData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    governorate: 'القاهرة',
    payoutMethod: 'vodafone_cash' as const,
    payoutDetails: '',
    email: '',
    password: ''
  });

  if (!isMerchantModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginMerchant(loginEmail, loginPassword);
    if (success) {
      setIsMerchantModalOpen(false);
      setCurrentView('merchant-dashboard');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.businessName || !regData.ownerName || !regData.phone || !regData.payoutDetails) {
      return;
    }
    registerMerchant(regData);
    setIsMerchantModalOpen(false);
    setCurrentView('merchant-dashboard');
  };

  const handleQuickDemoLogin = (email: string) => {
    loginMerchant(email, '123');
    setIsMerchantModalOpen(false);
    setCurrentView('merchant-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-right animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Top Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">بوابة التجار والمصنعين المصريين</h2>
              <p className="text-xs text-slate-300">اعرض منتجاتك لآلاف المشترين بنظام العمولة أو الإعلان</p>
            </div>
          </div>
          <button
            onClick={() => setIsMerchantModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch between Login and Register */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-xs font-bold text-center">
          <button
            onClick={() => setAuthMode('login')}
            className={`py-3 transition-colors cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            تسجيل دخول التاجر
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`py-3 transition-colors cursor-pointer ${
              authMode === 'register'
                ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            فتح حساب تاجر جديد
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">البريد الإلكتروني للتاجر</label>
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="mahalla@cotton.eg"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden text-right"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  required
                  dir="ltr"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden text-right"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg shadow-sm transition-all cursor-pointer text-xs sm:text-sm"
              >
                دخول إلى لوحة تحكم التاجر
              </button>

              {/* Quick Demo Logins for Testing */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-[11px] text-slate-500 mb-2 font-medium">أو تسجيل دخول سريع لتجربة حساب تاجر معتمد:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('mahalla@cotton.eg')}
                    className="p-2 text-right rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <p className="font-bold text-slate-800">مغزل المحلة</p>
                    <p className="text-[10px] text-emerald-700">قطن مصري</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('pottery@fayoum.eg')}
                    className="p-2 text-right rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <p className="font-bold text-slate-800">خزفيات الفيوم</p>
                    <p className="text-[10px] text-emerald-700">فخار تراثي</p>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم المتجر أو البراند المصري *</label>
                <input
                  type="text"
                  required
                  value={regData.businessName}
                  onChange={(e) => setRegData({ ...regData, businessName: e.target.value })}
                  placeholder="مثال: منسوجات النيل اليدوية"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">اسم صاحب المتجر *</label>
                  <input
                    type="text"
                    required
                    value={regData.ownerName}
                    onChange={(e) => setRegData({ ...regData, ownerName: e.target.value })}
                    placeholder="محمد إبراهيم"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">رقم الموبايل / واتساب *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    placeholder="01012345678"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden text-right font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">المحافظة</label>
                <select
                  value={regData.governorate}
                  onChange={(e) => setRegData({ ...regData, governorate: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                >
                  {EGYPTIAN_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">طريقة استلام أرباحك</label>
                  <select
                    value={regData.payoutMethod}
                    onChange={(e) => setRegData({ ...regData, payoutMethod: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                  >
                    <option value="vodafone_cash">فودافون كاش (محفظة ذكية)</option>
                    <option value="instapay">إنستاباي InstaPay</option>
                    <option value="bank_transfer">تحويل بنكي مصري</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">بيانات المحفظة أو الحساب *</label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={regData.payoutDetails}
                    onChange={(e) => setRegData({ ...regData, payoutDetails: e.target.value })}
                    placeholder="رقم الكاش أو username@instapay"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden text-right font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    required
                    dir="ltr"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder="store@domain.eg"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden text-right"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">كلمة المرور *</label>
                  <input
                    type="password"
                    required
                    dir="ltr"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden text-right"
                  />
                </div>
              </div>

              {/* Commission & Ad Information Notice */}
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] leading-relaxed">
                <span className="font-bold block mb-1">💡 شروط العرض في متجر رواق مصر:</span>
                • يمكنك اختيار عرض المنتجات بنظام العمولة التلقائية (10% بعد إتمام البيع بنجاح) أو اختيار باقة الإعلان المميز المدفوع (150 ج.م ثابتة) لصدارة المتجر.
                • تخضع جميع المنتجات لمراجعة وموافقة الإدارة لضمان الجودة المصرية.
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow-sm transition-all cursor-pointer text-xs sm:text-sm"
              >
                تأكيد التسجيل وبدء إرسال المنتجات
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const MerchantDashboardView: React.FC = () => {
  const {
    currentMerchant,
    logoutMerchant,
    products,
    submitMerchantProduct,
    formatPrice,
    setCurrentView,
    setSelectedProduct
  } = useStore();

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New product submission state
  const [prodForm, setProdForm] = useState({
    name: '',
    nameEn: '',
    description: '',
    category: 'textiles' as Product['category'],
    categoryLabel: 'مفروشات وقطن مصري',
    price: 1200,
    originalPrice: 1500,
    stock: 10,
    image: '/src/assets/images/product_headphones_1792169369351.jpg',
    features: ['خامات مصرية أصيلة 100%', 'ضمان جودة وتصنيع محلي'],
    isFeatured: false,
    listingType: 'commission' as ListingType,
    commissionRate: 10
  });

  if (!currentMerchant) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <Store className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">يرجى تسجيل الدخول إلى حساب التاجر</h2>
        <button
          onClick={() => setCurrentView('store')}
          className="bg-slate-900 text-white text-xs font-semibold py-2 px-4 rounded-lg"
        >
          العودة للمتجر الرئيسي
        </button>
      </div>
    );
  }

  // Filter products belonging to this merchant
  const myProducts = products.filter(
    (p) => p.merchantId === currentMerchant.id || p.merchantName === currentMerchant.businessName
  );

  const approvedCount = myProducts.filter((p) => p.approvalStatus === 'approved').length;
  const pendingCount = myProducts.filter((p) => p.approvalStatus === 'pending').length;
  const rejectedCount = myProducts.filter((p) => p.approvalStatus === 'rejected').length;

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name.trim() || prodForm.price <= 0) return;

    let catLabel = 'مفروشات وقطن مصري';
    if (prodForm.category === 'pottery') catLabel = 'فخار وخزف يدوي';
    if (prodForm.category === 'fragrance') catLabel = 'عطور وزيوت طبيعية';
    if (prodForm.category === 'leather') catLabel = 'جلود طبيعية وأحذية';
    if (prodForm.category === 'electronics') catLabel = 'إلكترونيات وأجهزة';
    if (prodForm.category === 'food') catLabel = 'أغذية ومأكولات مصرية';

    submitMerchantProduct({
      ...prodForm,
      categoryLabel: catLabel,
      features: prodForm.features.filter((f) => f.trim().length > 0)
    });

    setIsSubmitModalOpen(false);
    setProdForm({
      name: '',
      nameEn: '',
      description: '',
      category: 'textiles',
      categoryLabel: 'مفروشات وقطن مصري',
      price: 1200,
      originalPrice: 1500,
      stock: 10,
      image: '/src/assets/images/product_headphones_1792169369351.jpg',
      features: ['صناعة مصرية بجودة عالية', 'تسليم فوري للمستودع'],
      isFeatured: false,
      listingType: 'commission',
      commissionRate: 10
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-right space-y-8">
      {/* Merchant Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">حساب تاجر معتمد في مصر</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {currentMerchant.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            المالك: <strong>{currentMerchant.ownerName}</strong> · المحافظة: <strong>{currentMerchant.governorate}</strong> · وسيلة الأرباح: <strong>{currentMerchant.payoutMethod === 'vodafone_cash' ? 'فودافون كاش' : 'إنستاباي'} ({currentMerchant.payoutDetails})</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إرسال منتج جديد للمراجعة</span>
          </button>

          <button
            onClick={logoutMerchant}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs sm:text-sm font-semibold px-3 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="تسجيل الخروج"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">خروج</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">إجمالي المبيعات المحققة</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-2 tabular-nums">
            {formatPrice(currentMerchant.totalSales)}
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">عبر منصة رواق مصر</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">عمولات المنصة المقتطعة</span>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-2 tabular-nums">
            {formatPrice(currentMerchant.commissionPaidToAdmin)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">بنسبة 10% لكل طلب مكتمل</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-emerald-800">صافي مستحقاتك وأرباحك</span>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-2 tabular-nums">
            {formatPrice(currentMerchant.netEarnings)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">تحول أسبوعياً لمحفظتك</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500">حالة المنتجات</span>
          <div className="flex items-center gap-3 mt-2 text-xs font-bold">
            <span className="text-emerald-700">{approvedCount} معتمد</span>
            <span>·</span>
            <span className="text-amber-700">{pendingCount} قيد المراجعة</span>
            {rejectedCount > 0 && (
              <>
                <span>·</span>
                <span className="text-rose-700">{rejectedCount} مرفوض</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">إجمالي {myProducts.length} منتجات</p>
        </div>
      </div>

      {/* Merchant Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">منتجات متجرك المعروضة والمرسلة</h2>
            <p className="text-xs text-slate-500">
              تتم مراجعة المنتجات المرسلة من قِبل إدارة رواق مصر خلال 24 ساعة للتحقق من الجودة.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('store')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>معاينة متجر مصر كما يراه المشترون</span>
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {myProducts.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-800 text-sm">لم تقم بإرسال أي منتجات بعد</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              اضغط على زر "إرسال منتج جديد للمراجعة" بالأعلى لعرض أول منتج في المتجر!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">المنتج</th>
                  <th className="py-3 px-3">القسم</th>
                  <th className="py-3 px-3">السعر</th>
                  <th className="py-3 px-3">المخزون</th>
                  <th className="py-3 px-3">خطة العرض</th>
                  <th className="py-3 px-3">حالة المراجعة</th>
                  <th className="py-3 px-3">معاينة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-md object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-xs">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">أُرسل: {p.submittedAt || 'حديثاً'}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-600">{p.categoryLabel}</td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-900 tabular-nums">
                      {formatPrice(p.price)}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-800">{p.stock} قطعة</td>

                    <td className="py-3 px-3">
                      {p.listingType === 'paid_ad' ? (
                        <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                          إعلان مميز مدفوع (150 ج.م)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          عمولة بيع ({p.commissionRate || 10}%)
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      {p.approvalStatus === 'approved' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          معتمد ومنشور
                        </span>
                      )}
                      {p.approvalStatus === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          <Clock className="w-3.5 h-3.5" />
                          قيد مراجعة الإدارة
                        </span>
                      )}
                      {p.approvalStatus === 'rejected' && (
                        <div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                            <XCircle className="w-3.5 h-3.5" />
                            مرفوض
                          </span>
                          {p.rejectionReason && (
                            <p className="text-[10px] text-rose-600 mt-0.5">{p.rejectionReason}</p>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                        title="معاينة المنتج"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Submit New Product For Admin Approval */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-right">
          <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">إرسال منتج جديد لمراجعة الإدارة</h3>
                <p className="text-slate-500 text-[11px]">سيتم تدقيق المنتج والموافقة عليه لنشره في متجر مصر</p>
              </div>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم المنتج المصري بالتفصيل *</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="مثال: شال صوف كشميري مطرز يدوياً بسيوة"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">القسم</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
                  >
                    <option value="textiles">مفروشات وقطن مصري</option>
                    <option value="pottery">فخار وخزف يدوي</option>
                    <option value="fragrance">عطور وزيوت طبيعية</option>
                    <option value="leather">جلود طبيعية وأحذية</option>
                    <option value="electronics">إلكترونيات وأجهزة</option>
                    <option value="food">أغذية ومنتجات بلدية</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">صورة المنتج</label>
                  <select
                    value={prodForm.image}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
                  >
                    <option value="/src/assets/images/product_headphones_1792169369351.jpg">صورة منتج 1 (منسوجات / أجهزة)</option>
                    <option value="/src/assets/images/product_ceramic_lamp_1792169370465.jpg">صورة منتج 2 (فخار / خزف الفيوم)</option>
                    <option value="/src/assets/images/product_luxury_perfume_1792169370452.jpg">صورة منتج 3 (عطور / زيوت طبيعية)</option>
                    <option value="/src/assets/images/product_smartwatch_1792169370373.jpg">صورة منتج 4 (جلود وساعات)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">سعر البيع للجمهور (ج.م) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">الكمية المتوفرة بالمستودع *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              {/* CRITICAL: Choice of Listing Model (Commission vs Paid Ad) */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                <label className="block font-bold text-slate-900">
                  حدد نموذج العرض والاتفاق المالي مع الإدارة:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label
                    className={`p-3 rounded-lg border flex flex-col gap-1 cursor-pointer transition-all ${
                      prodForm.listingType === 'commission'
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <input
                        type="radio"
                        name="listingPlan"
                        checked={prodForm.listingType === 'commission'}
                        onChange={() => setProdForm({ ...prodForm, listingType: 'commission' })}
                        className="accent-emerald-600"
                      />
                      <span>نظام العمولة التلقائية</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      عمولة 10% تُقتطع فقط عند بيع وتوصيل المنتج بنجاح (بدون أي رسوم مقدماً).
                    </p>
                  </label>

                  <label
                    className={`p-3 rounded-lg border flex flex-col gap-1 cursor-pointer transition-all ${
                      prodForm.listingType === 'paid_ad'
                        ? 'border-purple-600 bg-purple-50/70 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <input
                        type="radio"
                        name="listingPlan"
                        checked={prodForm.listingType === 'paid_ad'}
                        onChange={() => setProdForm({ ...prodForm, listingType: 'paid_ad' })}
                        className="accent-purple-600"
                      />
                      <span>إعلان مميز مدفوع</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      رسم إعلان ثابت 150 ج.م للعرض في صدارة المتجر وبنر الصفحة الرئيسية (بدون عمولة مبيعات).
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">وصف المنتج ومميزاته</label>
                <textarea
                  rows={2}
                  required
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  placeholder="مواصفات الخامة، المقاسات، ودليل الاستخدام والعناية..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  إرسال المنتج لمراجعة الإدارة الآن
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
