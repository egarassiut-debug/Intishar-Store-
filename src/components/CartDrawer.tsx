import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowLeft, MessageCircle, CreditCard, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    formatPrice,
    setIsCheckoutOpen,
    setIsWhatsAppCheckoutOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 300;
  const freeShippingDifference = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedToOnlineCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleProceedToWhatsAppCheckout = () => {
    setIsCartOpen(false);
    setIsWhatsAppCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-right">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-r border-slate-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-bold text-slate-900">سلة المشتريات</h2>
              <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full tabular-nums">
                {cart.length} منتجات
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200/80">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {freeShippingDifference === 0 ? (
                <span className="text-emerald-700 font-bold">🎉 تهانينا! طلبك مؤهل للشحن المجاني</span>
              ) : (
                <span className="text-slate-600">
                  أضف منتجات بقيمة <span className="font-bold text-slate-900 font-mono tabular-nums">{formatPrice(freeShippingDifference)}</span> للشحن المجاني
                </span>
              )}
              <span className="font-mono text-[11px] text-slate-500">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5] mb-3" />
                <p className="font-semibold text-slate-800 text-sm">سلتك فارغة حالياً</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  استكشف تشكيلاتنا وأضف المنتجات التي ترغب في اقتنائها.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                >
                  <span>تصفح الأقسام الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {Object.entries(item.selectedVariant).map(([k, v]) => (
                            <span key={k} className="ml-2">
                              {k}: {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-slate-200 rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 text-xs font-bold transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              {/* Promo Code Input */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="أدخل كود الخصم (مثل: WELCOME)"
                      className="w-full pr-8 pl-3 py-1.5 text-xs bg-white text-slate-800 rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    تطبيق
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-800">
                  <span className="font-medium">
                    تم تفعيل الكوبون: <span className="font-mono font-bold">{appliedCoupon.code}</span> ({appliedCoupon.discountPercentage}%)
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 hover:text-rose-800 font-bold text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200 font-medium">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>الخصم المطبق</span>
                    <span className="font-mono font-bold tabular-nums">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>تكلفة الشحن والتوصيل</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {cartShipping === 0 ? 'مجاني' : formatPrice(cartShipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-2 border-t border-slate-300">
                  <span>المجموع الكلي</span>
                  <span className="font-mono tabular-nums text-emerald-700">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Dual Checkout Action Buttons */}
              <div className="pt-2 space-y-2">
                {/* 1. Online In-App Checkout */}
                <button
                  onClick={handleProceedToOnlineCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>إتمام الطلب والدفع الإلكتروني</span>
                </button>

                {/* 2. Direct WhatsApp Checkout */}
                <button
                  onClick={handleProceedToWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm py-2 px-4 rounded-lg shadow-2xs transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تأكيد الطلب الفوري عبر واتساب</span>
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
