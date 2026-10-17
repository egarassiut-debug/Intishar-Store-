import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerInfo, PaymentMethod } from '../types/store';
import { EGYPTIAN_GOVERNORATES } from '../data/initialProducts';
import { X, ShieldCheck, CheckCircle2, Smartphone, CreditCard, Banknote } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    formatPrice,
    createOrder
  } = useStore();

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    governorate: 'القاهرة',
    city: '',
    address: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('vodafone_cash');
  const [walletPhone, setWalletPhone] = useState('');
  const [instapayId, setInstapayId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setFormError('يرجى ملء جميع الحقول الإلزامية (الاسم، رقم الموبايل، العنوان بالتفصيل)');
      return;
    }

    if (paymentMethod === 'vodafone_cash' && !walletPhone.trim()) {
      setFormError('يرجى كتابة رقم محفظة فودافون كاش للتحقق من السداد');
      return;
    }

    if (paymentMethod === 'instapay' && !instapayId.trim()) {
      setFormError('يرجى كتابة معرف إنستاباي InstaPay الخاص بك');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      createOrder(customer, paymentMethod);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-right animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">إتمام الشراء والدفع في مصر 🇪🇬</h2>
            <p className="text-xs text-slate-500">
              شحن سريع وتأكيد فوري عبر المحافظ الإلكترونية وإنستاباي والبطاقات
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              {formError}
            </div>
          )}

          {/* Section 1: Customer & Shipping Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">
                1
              </span>
              <span>بيانات العميل وعنوان التوصيل في مصر</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  الاسم بالكامل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="محمد أحمد الشناوي"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  رقم الموبايل المصري <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="010 1234 5678"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden font-mono text-right"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">المحافظة *</label>
                <select
                  value={customer.governorate}
                  onChange={(e) => setCustomer({ ...customer, governorate: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                >
                  {EGYPTIAN_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">المركز / الحي / المدينة *</label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  placeholder="مثال: مصر الجديدة، سموحة، حي الجامعة"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  العنوان بالتفصيل (اسم الشارع، رقم العمارة، رقم الشقة) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="مثال: شارع مصطفى النحاس، عمارة 14، الدور الخامس شقة 9"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">ملاحظات لمندوب الشحن (اختياري)</label>
                <input
                  type="text"
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="مثال: الاتصال قبل القدوم، أو التسليم لأمن العمارة"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Egyptian Payment Methods */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-mono">
                2
              </span>
              <span>طريقة الدفع في مصر</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                  paymentMethod === 'vodafone_cash'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs font-bold text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'vodafone_cash'}
                  onChange={() => setPaymentMethod('vodafone_cash')}
                  className="sr-only"
                />
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span className="text-center">فودافون كاش</span>
                <span className="text-[10px] text-slate-400">محفظة إلكترونية</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                  paymentMethod === 'instapay'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs font-bold text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'instapay'}
                  onChange={() => setPaymentMethod('instapay')}
                  className="sr-only"
                />
                <Banknote className="w-4 h-4 text-emerald-600" />
                <span className="text-center font-mono">إنستاباي</span>
                <span className="text-[10px] text-slate-400">تحويل فوري</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                  paymentMethod === 'meeza'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs font-bold text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'meeza'}
                  onChange={() => setPaymentMethod('meeza')}
                  className="sr-only"
                />
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span className="text-center">كارت ميزة</span>
                <span className="text-[10px] text-slate-400">بطاقة وطنية</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs font-bold text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="sr-only"
                />
                <CreditCard className="w-4 h-4 text-slate-600" />
                <span className="text-center">فيزا / ماستر</span>
                <span className="text-[10px] text-slate-400">بطاقة بنكية</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all col-span-2 sm:col-span-1 ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-2xs font-bold text-emerald-900'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="sr-only"
                />
                <Banknote className="w-4 h-4 text-slate-600" />
                <span className="text-center">عند الاستلام</span>
                <span className="text-[10px] text-slate-400">كاش للمندوب</span>
              </label>
            </div>

            {/* Fields based on payment selection */}
            {paymentMethod === 'vodafone_cash' && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-slate-800">
                  📱 تحويل فودافون كاش على رقم المتجر المعتمد:{' '}
                  <span className="font-mono text-emerald-800 font-extrabold" dir="ltr">
                    010 0000 0000
                  </span>
                </p>
                <label className="block text-slate-600 font-medium">رقم المحفظة التي قمت بالتحويل منها لتأكيد الطلب:</label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={walletPhone}
                  onChange={(e) => setWalletPhone(e.target.value)}
                  placeholder="010 xxxx xxxx"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono text-right"
                />
              </div>
            )}

            {paymentMethod === 'instapay' && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-slate-800">
                  ⚡ تحويل إنستاباي InstaPay فوري على حساب المتجر:{' '}
                  <span className="font-mono text-emerald-800 font-extrabold" dir="ltr">
                    riwaq.egypt@instapay
                  </span>
                </p>
                <label className="block text-slate-600 font-medium">معرف إنستاباي الخاص بك أو اسم صاحب الحساب:</label>
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={instapayId}
                  onChange={(e) => setInstapayId(e.target.value)}
                  placeholder="yourname@instapay"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono text-right"
                />
              </div>
            )}

            {(paymentMethod === 'card' || paymentMethod === 'meeza') && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold">بيانات البطاقة المصرفية</span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    بوابة دفع مصرية آمنة ومحمية
                  </span>
                </div>
                <input
                  type="text"
                  required
                  dir="ltr"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                    setCardNumber(val);
                  }}
                  placeholder="رقم بطاقة ميزة أو فيزا (16 رقماً)"
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono text-right"
                />
              </div>
            )}
          </div>

          {/* Section 3: Summary in EGP */}
          <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 mb-1">ملخص الفاتورة ({cart.length} أصناف)</h4>
            <div className="flex justify-between text-slate-600">
              <span>المجموع الفرعي:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{formatPrice(cartSubtotal)}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>خصم الكوبون:</span>
                <span className="font-mono font-bold tabular-nums">-{formatPrice(cartDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>مصاريف الشحن لـ {customer.governorate}:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {cartShipping === 0 ? 'شحن مجاني' : formatPrice(cartShipping)}
              </span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>المبلغ الإجمالي النهائي:</span>
              <span className="font-mono text-emerald-700 tabular-nums">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-all hover:translate-y-[-1px] disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
            >
              {isSubmitting ? (
                <span>جاري تأكيد وتسجيل الطلب...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد الطلب ودفع {formatPrice(cartTotal)}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
