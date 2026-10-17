import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus } from '../types/store';
import {
  Package,
  Plus,
  Trash2,
  DollarSign,
  AlertTriangle,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Eye,
  X,
  Search,
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    pendingApprovalProducts,
    orders,
    merchants,
    approveProduct,
    rejectProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    formatPrice,
    setCurrentView,
    totalRevenue,
    totalAdminCommissions,
    totalPaidAdsRevenue,
    totalMerchantPayouts,
    setSelectedProduct
  } = useStore();

  const [adminTab, setAdminTab] = useState<'pending' | 'products' | 'merchants' | 'orders'>('pending');
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<'all' | OrderStatus>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewOrderDetails, setViewOrderDetails] = useState<string | null>(null);
  const [rejectingProductId, setRejectingProductId] = useState<string | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState('');

  // New Store Product Form State (Admin Direct Add)
  const [newProduct, setNewProduct] = useState({
    name: '',
    nameEn: '',
    description: '',
    category: 'textiles' as Product['category'],
    categoryLabel: 'مفروشات وقطن مصري',
    price: 950,
    originalPrice: 1200,
    stock: 20,
    image: '/src/assets/images/product_headphones_1792169369351.jpg',
    features: ['خامة مصرية أصلية', 'تصنيع محلي ممتاز'],
    isFeatured: true,
    listingType: 'commission' as const,
    commissionRate: 10
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.includes(productSearch) ||
      p.categoryLabel.includes(productSearch) ||
      (p.merchantName && p.merchantName.includes(productSearch))
  );

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  const handleDirectAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    let catLabel = 'مفروشات وقطن مصري';
    if (newProduct.category === 'pottery') catLabel = 'فخار وخزف يدوي';
    if (newProduct.category === 'fragrance') catLabel = 'عطور وزيوت طبيعية';
    if (newProduct.category === 'leather') catLabel = 'جلود طبيعية وأحذية';
    if (newProduct.category === 'electronics') catLabel = 'إلكترونيات وأجهزة';
    if (newProduct.category === 'food') catLabel = 'أغذية ومنتجات بلدية';

    addProduct({
      ...newProduct,
      categoryLabel: catLabel,
      features: newProduct.features.filter((f) => f.trim().length > 0)
    });

    setIsAddModalOpen(false);
  };

  const handleConfirmReject = (productId: string) => {
    rejectProduct(productId, rejectionReasonInput || 'المنتج يحتاج لتوضيح بيانات الخامة والمقاسات');
    setRejectingProductId(null);
    setRejectionReasonInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-right space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">
              لوحة تحكم الإدارة العليا · رواق مصر 🇪🇬
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            إدارة متجر مصر، موافقة منتجات التجار، والعمولات
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            صلاحيات الموافقة على عروض التجار (بالعمولة أو الإعلانات المدفوعة)، متابعة مبيعات المحافظات، وتتبع الإيرادات.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج مباشر</span>
          </button>

          <button
            onClick={() => setCurrentView('store')}
            className="bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            العودة للمتجر الرئيسي
          </button>
        </div>
      </div>

      {/* Financial KPIs Strip in EGP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">إجمالي مبيعات السوق</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-2 tabular-nums">
            {formatPrice(totalRevenue)}
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">مبيعات الطلبات في مصر</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">أرباح عمولات الإدارة</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              %
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-2 tabular-nums">
            {formatPrice(totalAdminCommissions)}
          </div>
          <p className="text-[11px] text-emerald-800 mt-1">من مبيعات المنتجات بنظام العمولة</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-purple-200 bg-purple-50/30 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900">إيرادات الإعلانات المميزة</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-purple-700 mt-2 tabular-nums">
            {formatPrice(totalPaidAdsRevenue)}
          </div>
          <p className="text-[11px] text-purple-800 mt-1">رسوم إعلانات صدارة المتجر</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">صافي مستحقات التجار</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-2 tabular-nums">
            {formatPrice(totalMerchantPayouts)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">تحول لفودافون كاش وإنستاباي</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 flex gap-4 sm:gap-8 text-sm font-semibold overflow-x-auto pb-1">
        <button
          onClick={() => setAdminTab('pending')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'pending'
              ? 'border-emerald-700 text-emerald-800 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-600" />
          <span>طلبات التجار المعلقة للموافقة</span>
          {pendingApprovalProducts.length > 0 && (
            <span className="bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full font-mono">
              {pendingApprovalProducts.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'products'
              ? 'border-emerald-700 text-emerald-800 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>كتالوج المنتجات المنشورة ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('merchants')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'merchants'
              ? 'border-emerald-700 text-emerald-800 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>التجار والعمولات المستحقة ({merchants.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            adminTab === 'orders'
              ? 'border-emerald-700 text-emerald-800 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>إدارة الطلبات والشحن ({orders.length})</span>
        </button>
      </div>

      {/* Tab 1: Pending Merchant Submissions (Approval Gateway) */}
      {adminTab === 'pending' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                منتجات التجار بانتظار موافقة الإدارة ({pendingApprovalProducts.length})
              </h2>
              <p className="text-xs text-slate-500">
                راجع بيانات المنتج وجودته ونموذج الاتفاق (عمولة بيع أم إعلان مدفوع) قبل الموافقة على ظهوره بالمتجر.
              </p>
            </div>
          </div>

          {pendingApprovalProducts.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">رائع! لا توجد طلبات معلقة بانتظار المراجعة</p>
              <p className="text-xs text-slate-400">
                جميع المنتجات المرسلة من التجار تمت مراجعتها ونشر المعتمد منها بنجاح.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApprovalProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-xl border border-amber-200 bg-amber-50/20 hover:bg-amber-50/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                    />

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{p.name}</span>
                        <span className="text-[11px] text-slate-500">· {p.categoryLabel}</span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                        <span>
                          التاجر: <strong className="text-slate-900">{p.merchantName || 'تاجر مسجل'}</strong>
                        </span>
                        <span>·</span>
                        <span>
                          السعر المقترح: <strong className="text-slate-900 font-mono font-bold">{formatPrice(p.price)}</strong>
                        </span>
                        <span>·</span>
                        <span>المخزون: <strong>{p.stock} قطع</strong></span>
                        <span>·</span>
                        <span className="font-mono text-slate-400">أُرسل: {p.submittedAt}</span>
                      </div>

                      {/* Listing Model Badge */}
                      <div className="pt-1">
                        {p.listingType === 'paid_ad' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-md border border-purple-200">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            طلب إعلان مميز مدفوع (رسوم: 150 ج.م ثابتة)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                            🏷️ نظام العمولة التلقائية ({p.commissionRate || 10}% عند كل بيع)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Approval / Rejection Controls */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
                    <button
                      onClick={() => approveProduct(p.id)}
                      className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>موافقة ونشر بالمتجر</span>
                    </button>

                    <button
                      onClick={() => setRejectingProductId(p.id)}
                      className="flex items-center justify-center gap-1.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>رفض الطلب</span>
                    </button>

                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                      title="معاينة المنتج"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rejection Reason Modal */}
          {rejectingProductId && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">رفض منتج التاجر وإرسال السبب</h3>
                <p className="text-xs text-slate-500">
                  اكتب سبب الرفض ليظهر للتاجر في لوحة تحكمه ليتمكن من تعديل المنتج وإعادة إرساله:
                </p>
                <textarea
                  rows={3}
                  value={rejectionReasonInput}
                  onChange={(e) => setRejectionReasonInput(e.target.value)}
                  placeholder="مثال: يرجى رفع صور واضحة للمنتج وتحديد مقاسات الطول والعرض بدقة..."
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
                />
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleConfirmReject(rejectingProductId)}
                    className="flex-1 bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 rounded-lg text-xs"
                  >
                    تأكيد الرفض
                  </button>
                  <button
                    onClick={() => setRejectingProductId(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Live Products Catalog */}
      {adminTab === 'products' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="بحث في المنتجات أو التجار..."
                className="w-full pr-9 pl-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600"
              />
            </div>
            <span className="text-xs text-slate-500">
              يتم عرض {filteredProducts.length} من أصل {products.length} منتج
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">المنتج</th>
                  <th className="py-3 px-3">التاجر / المصدر</th>
                  <th className="py-3 px-3">السعر</th>
                  <th className="py-3 px-3">المخزون</th>
                  <th className="py-3 px-3">خطة العرض</th>
                  <th className="py-3 px-3">حالة العرض</th>
                  <th className="py-3 px-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
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
                          <p className="text-[11px] text-slate-400 font-mono">{p.categoryLabel}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800">{p.merchantName || 'المتجر الرسمي'}</span>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-900 tabular-nums">
                      {formatPrice(p.price)}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-mono">
                        <button
                          onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-bold px-2 py-0.5 rounded text-center min-w-[32px] tabular-nums text-slate-800">
                          {p.stock}
                        </span>
                        <button
                          onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}
                          className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      {p.listingType === 'paid_ad' ? (
                        <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          إعلان مميز (150 ج.م)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          عمولة {p.commissionRate || 10}%
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      {p.approvalStatus === 'approved' && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          نشط ومعروض
                        </span>
                      )}
                      {p.approvalStatus === 'pending' && (
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          معلق للموافقة
                        </span>
                      )}
                      {p.approvalStatus === 'rejected' && (
                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                          مرفوض
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="حذف المنتج"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Merchants & Commissions */}
      {adminTab === 'merchants' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5 sm:p-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">سجل التجار والعمولات المحصلة للمنصة</h2>
            <p className="text-xs text-slate-500">
              متابعة مبيعات كل تاجر في المحافظات المصرية وصافي المبالغ المستحقة للتحويل إلى فودافون كاش أو إنستاباي.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">اسم المتجر المصري</th>
                  <th className="py-3 px-3">المالك والمحافظة</th>
                  <th className="py-3 px-3">حساب الاستلام</th>
                  <th className="py-3 px-3">إجمالي مبيعاته</th>
                  <th className="py-3 px-3">عمولة الإدارة (10%)</th>
                  <th className="py-3 px-3">صافي مستحقات التاجر</th>
                  <th className="py-3 px-3">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {merchants.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{m.businessName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{m.email}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="text-slate-900">{m.ownerName}</div>
                      <div className="text-[11px] text-emerald-700 font-medium">{m.governorate}</div>
                    </td>

                    <td className="py-3 px-3 font-mono">
                      <span className="font-bold text-slate-800">
                        {m.payoutMethod === 'vodafone_cash' ? 'فودافون كاش' : 'InstaPay'}
                      </span>
                      <p className="text-slate-500 text-[11px]">{m.payoutDetails}</p>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-900 tabular-nums">
                      {formatPrice(m.totalSales)}
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-emerald-700 tabular-nums">
                      {formatPrice(m.commissionPaidToAdmin)}
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-blue-700 tabular-nums">
                      {formatPrice(m.netEarnings)}
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        نشط ومعتمد
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Orders & Shipping */}
      {adminTab === 'orders' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">سجل الطلبات والشحن لجميع المحافظات</h2>
              <p className="text-xs text-slate-500">تحديث حالات الشحن مع شركات الشحن المصرية (بوسطة Bosta / أرامكس / مندوب خاص)</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">الحالة:</span>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value as any)}
                className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg focus:outline-hidden"
              >
                <option value="all">جميع الحالات ({orders.length})</option>
                <option value="pending">قيد الانتظار</option>
                <option value="processing">جاري التجهيز</option>
                <option value="shipped">تم الشحن</option>
                <option value="delivered">تم التسليم</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">رقم الطلب</th>
                  <th className="py-3 px-3">العميل والمحافظة</th>
                  <th className="py-3 px-3">طريقة الدفع</th>
                  <th className="py-3 px-3">إجمالي الطلب</th>
                  <th className="py-3 px-3">عمولة الإدارة</th>
                  <th className="py-3 px-3">حالة الطلب</th>
                  <th className="py-3 px-3">تفاصيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      {ord.orderNumber}
                    </td>

                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{ord.customer.fullName}</p>
                      <p className="text-[11px] text-emerald-800 font-semibold">{ord.customer.governorate}</p>
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-medium text-[11px] bg-slate-100 text-slate-700">
                        {ord.paymentMethod === 'vodafone_cash' && 'فودافون كاش'}
                        {ord.paymentMethod === 'instapay' && 'إنستاباي InstaPay'}
                        {ord.paymentMethod === 'meeza' && 'كارت ميزة'}
                        {ord.paymentMethod === 'card' && 'فيزا / بطاقة'}
                        {ord.paymentMethod === 'cod' && 'دفع عند الاستلام'}
                        {ord.paymentMethod === 'whatsapp' && 'واتساب'}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-emerald-700 tabular-nums">
                      {formatPrice(ord.total)}
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-purple-700 tabular-nums">
                      {formatPrice(ord.totalAdminCommission || 0)}
                    </td>

                    <td className="py-3 px-3">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold py-1 px-2.5 rounded-lg border focus:outline-hidden cursor-pointer ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : ord.status === 'shipped'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : ord.status === 'processing'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : ord.status === 'cancelled'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="processing">جاري التجهيز</option>
                        <option value="shipped">تم الشحن (بوسطة)</option>
                        <option value="delivered">تم التسليم</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>

                    <td className="py-3 px-3">
                      <button
                        onClick={() => setViewOrderDetails(viewOrderDetails === ord.id ? null : ord.id)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                        title="تفاصيل الطلب"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Expanded Order Inspector */}
          {viewOrderDetails && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              {(() => {
                const target = orders.find((o) => o.id === viewOrderDetails);
                if (!target) return null;
                return (
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900">
                        محتويات الطلب: {target.orderNumber} ({target.items.length} أصناف)
                      </span>
                      <button
                        onClick={() => setViewOrderDetails(null)}
                        className="text-xs text-slate-500 hover:text-slate-900"
                      >
                        إغلاق
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="font-semibold text-slate-700">بيانات العنوان والشحن:</p>
                        <p className="text-slate-800 font-bold">{target.customer.fullName} ({target.customer.phone})</p>
                        <p className="text-slate-600">
                          {target.customer.governorate} - {target.customer.city} - {target.customer.address}
                        </p>
                        {target.customer.notes && (
                          <p className="text-slate-500 italic mt-1">ملاحظة: {target.customer.notes}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-700">الأصناف المطلوبة:</p>
                        {target.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-slate-600">
                            <span>{it.product.name} ({it.quantity}×)</span>
                            <span className="font-mono">{formatPrice(it.product.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Direct Add Store Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-right">
          <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">إضافة منتج مصري مباشر كمسؤول</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDirectAddSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم المنتج المصري *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="مثال: سجادة كليم يدوي فوة صوف طبيعي"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">القسم</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
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
                  <label className="block font-semibold text-slate-700 mb-1">السعر (ج.م) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">المخزون الأولي *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">صورة المنتج</label>
                  <select
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
                  >
                    <option value="/src/assets/images/product_headphones_1792169369351.jpg">سماعات / منسوجات</option>
                    <option value="/src/assets/images/product_ceramic_lamp_1792169370465.jpg">فخار وخزف الفيوم</option>
                    <option value="/src/assets/images/product_luxury_perfume_1792169370452.jpg">عطور وزيوت اللوتس</option>
                    <option value="/src/assets/images/product_smartwatch_1792169370373.jpg">جلود وساعات</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">وصف المنتج</label>
                <textarea
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="تفاصيل المنتج وصناعته وخاماته..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  نشر فوري في المتجر
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
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
