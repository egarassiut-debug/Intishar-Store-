import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerInfo } from '../types/store';
import { EGYPTIAN_GOVERNORATES } from '../data/initialProducts';
import { X, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    isWhatsAppCheckoutOpen,
    setIsWhatsAppCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    formatPrice,
    createWhatsAppOrder,
    showToast
  } = useStore();

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    governorate: 'القاهرة',
    city: '',
    address: '',
    notes: ''
  });

  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isWhatsAppCheckoutOpen) return null;

  // Build live preview message
  const previewMessage = `السلام عليكم ورحمة الله، متجر رواق مصر 🇪🇬
أود تأكيد طلبي الجديد عبر المتجر:
━━━━━━━━━━━━━━━━━━━━━
👤 اسم العميل: ${customer.fullName || '[الاسم]'}
📱 رقم الموبايل: ${customer.phone || '[الموبايل]'}
📍 المحافظة: ${customer.governorate}
🏠 الحي والعنوان: ${customer.city ? `${customer.city} - ` : ''}${customer.address || '[العنوان بالتفصيل]'}
${customer.notes ? `📝 ملاحظات: ${customer.notes}\n` : ''}━━━━━━━━━━━━━━━━━━━━━
🛍️ المنتجات المصرية المطلوبة (${cart.length}):
${cart.map((item, idx) => `${idx + 1}. ${item.product.name} (الكمية: ${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`).join('\n')}
━━━━━━━━━━━━━━━━━━━━━
💵 المجموع الفرعي: ${formatPrice(cartSubtotal)}
${cartDiscount > 0 ? `🏷️ الخصم (${appliedCoupon?.code}): -${formatPrice(cartDiscount)}\n` : ''}🚚 الشحن: ${cartShipping === 0 ? 'مجاني' : formatPrice(cartShipping)}
✨ الإجمالي المطلوب: ${formatPrice(cartTotal)}
━━━━━━━━━━━━━━━━━━━━━
يرجى تزويدي بحساب التحويل أو تفاصيل تأكيد الشحن، شكراً لكم!`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(previewMessage);
    setIsCopied(true);
    showToast('تم نسخ نص رسالة الطلب إلى الحافظة', 'info');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setErrorMsg('يرجى كتابة الاسم ورقم الجوال والعنوان لإعداد الرسالة بدقة');
      return;
    }
    setErrorMsg(null);
    const { whatsappUrl } = createWhatsAppOrder(customer);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-right animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-emerald-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-base font-bold">الطلب المباشر وتأكيد الشحن عبر واتساب</h2>
              <p className="text-xs text-emerald-100">سيتم تجهيز فاتورتك وإرسالها مباشرة لفريق خدمة العملاء</p>
            </div>
          </div>
          <button
            onClick={() => setIsWhatsAppCheckoutOpen(false)}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLaunchWhatsApp} className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Customer quick fields */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              بيانات المستلم لتضمينها في الفاتورة:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  الاسم الكريم <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="محمد السالم"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  رقم الواتساب للتواصل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="010 1234 5678"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden font-mono text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">المحافظة</label>
                <select
                  value={customer.governorate}
                  onChange={(e) => setCustomer({ ...customer, governorate: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                >
                  {EGYPTIAN_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">المركز / الحي / المدينة</label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  placeholder="مثال: مدينة نصر، المعادي، سموحة"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  العنوان بالتفصيل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="اسم الشارع ورقم العمارة والشقة"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">ملاحظة أو استفسار إضافي</label>
                <input
                  type="text"
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="هل يتوفر تغليف هدايا مجاني؟"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Live WhatsApp Chat Bubble Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">معاينة الرسالة التي ستُرسل إلى المتجر:</span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-emerald-700 font-semibold cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'تم النسخ' : 'نسخ النص'}</span>
              </button>
            </div>

            <div className="bg-[#EFEAE2] p-4 rounded-xl border border-slate-200/80 font-sans shadow-inner">
              <div className="bg-[#D9FDD3] p-3 rounded-lg rounded-tr-none text-slate-800 text-xs shadow-xs max-w-lg space-y-1 whitespace-pre-wrap leading-relaxed border border-[#b4e6ad]">
                {previewMessage}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال وتأكيد عبر واتساب الآن</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>

            <button
              type="button"
              onClick={() => setIsWhatsAppCheckoutOpen(false)}
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
