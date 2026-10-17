import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Truck, MapPin, Phone } from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { activeOrder, setCurrentView, formatPrice } = useStore();

  if (!activeOrder) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <p className="text-slate-500 text-sm">لا يوجد طلب حديث لعرضه.</p>
        <button
          onClick={() => setCurrentView('store')}
          className="mt-4 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg"
        >
          العودة للمتجر
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16 text-right">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Success Header */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            تم استلام وتأكيد طلبك بنجاح
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            شكراً لطلبك من متجر رواق!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            رقم الطلب الخاص بك هو <strong className="font-mono text-slate-900 font-bold">{activeOrder.orderNumber}</strong>. لقد تم إرسال تفاصيل الشحن إلى هاتفك.
          </p>
        </div>

        {/* Shipment Tracker Timeline */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-4">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>متابعة حالة الشحنة</span>
            </span>
            <span className="font-mono text-slate-500">
              رقم التتبع: <strong className="text-slate-900">{activeOrder.trackingNumber}</strong>
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs relative">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="font-bold text-slate-900">تم الطلب</p>
              <p className="text-[10px] text-slate-500">تم التأكيد</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-2xs">
                <PackageCheck className="w-4 h-4" />
              </div>
              <p className="font-bold text-slate-900">التجهيز</p>
              <p className="text-[10px] text-emerald-700 font-medium">جاري التغليف</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                <Truck className="w-4 h-4" />
              </div>
              <p className="font-medium text-slate-600">الشحن</p>
              <p className="text-[10px] text-slate-400">خلال 24 ساعة</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                <MapPin className="w-4 h-4" />
              </div>
              <p className="font-medium text-slate-600">التسليم</p>
              <p className="text-[10px] text-slate-400">لغاية باب منزلك</p>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white p-4 rounded-xl border border-slate-200">
          <div className="space-y-1">
            <span className="text-slate-400 font-medium">بيانات المستلم:</span>
            <p className="font-bold text-slate-900 text-sm">{activeOrder.customer.fullName}</p>
            <p className="text-slate-600 flex items-center gap-1 font-mono">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{activeOrder.customer.phone}</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-medium">عنوان التوصيل:</span>
            <p className="font-bold text-slate-900">
              {activeOrder.customer.governorate} {activeOrder.customer.city ? `· ${activeOrder.customer.city}` : ''}
            </p>
            <p className="text-slate-600">{activeOrder.customer.address}</p>
          </div>
        </div>

        {/* Order Receipt Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">تفاصيل الفاتورة</h3>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
            {activeOrder.items.map((item, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between bg-white hover:bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-md border border-slate-100"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{item.product.name}</h4>
                    <span className="text-slate-500 font-mono">
                      الكمية: {item.quantity} × {formatPrice(item.product.price)}
                    </span>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}

            <div className="p-4 bg-slate-50 space-y-1.5 font-medium">
              <div className="flex justify-between text-slate-600">
                <span>المجموع الفرعي:</span>
                <span className="font-mono font-bold tabular-nums text-slate-900">{formatPrice(activeOrder.subtotal)}</span>
              </div>
              {activeOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>الخصم المطبق:</span>
                  <span className="font-mono font-bold tabular-nums">-{formatPrice(activeOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>الشحن والتوصيل:</span>
                <span className="font-mono font-bold tabular-nums text-slate-900">
                  {activeOrder.shipping === 0 ? 'مجاني' : formatPrice(activeOrder.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>الإجمالي النهائي:</span>
                <span className="font-mono text-emerald-700 tabular-nums">{formatPrice(activeOrder.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 print:hidden">
          <button
            onClick={() => setCurrentView('store')}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <span>متابعة التسوق واستعراض المزيد</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الفاتورة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
