import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, Heart, MessageCircle } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isItemInWishlist,
    setIsWhatsAppCheckoutOpen
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  if (!selectedProduct) return null;

  const inWishlist = isItemInWishlist(selectedProduct.id);
  const isOutOfStock = selectedProduct.stock <= 0;

  // Initialize selected variants if not chosen yet
  const currentVariant = { ...selectedVariants };
  selectedProduct.variants?.forEach((v) => {
    if (!currentVariant[v.name] && v.options.length > 0) {
      currentVariant[v.name] = v.options[0];
    }
  });

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(selectedProduct, quantity, currentVariant);
  };

  const handleQuickWhatsApp = () => {
    handleAddToCart();
    setSelectedProduct(null);
    setIsWhatsAppCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 text-right">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Gallery / Image Column */}
          <div className="md:col-span-6 bg-slate-100 p-6 flex flex-col justify-center items-center relative">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xs bg-white border border-slate-200 relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Subtle brand trust */}
            <div className="w-full mt-4 flex items-center justify-around text-xs text-slate-500 pt-3 border-t border-slate-200/60">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>توصيل لجميع مناطق المملكة</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ضمان الوكيل سنتين</span>
              </span>
            </div>
          </div>

          {/* Details / Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>{selectedProduct.categoryLabel}</span>
                <div className="flex items-center gap-1 text-amber-600 font-bold font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-slate-400">({selectedProduct.ratingCount} تقييم)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {selectedProduct.name}
              </h2>
              {selectedProduct.nameEn && (
                <p className="text-xs text-slate-400 font-mono tracking-wide mt-1">
                  {selectedProduct.nameEn}
                </p>
              )}

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  شامل ضريبة القيمة المضافة
                </span>
              </div>

              {/* Stock Indicator */}
              <div className="mt-3">
                {isOutOfStock ? (
                  <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                    نفد من المخزون حالياً
                  </span>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>متوفر في المستودع ({selectedProduct.stock} قطعة جاهزة للشحن)</span>
                  </div>
                )}
              </div>

              {/* Variant Selectors if any */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div className="mt-5 space-y-3 pt-4 border-t border-slate-100">
                  {selectedProduct.variants.map((v) => (
                    <div key={v.id}>
                      <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                        {v.name}: <span className="font-normal text-slate-900">{currentVariant[v.name]}</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map((opt) => {
                          const isSelected = currentVariant[v.name] === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleVariantSelect(v.name, opt)}
                              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-slate-900 bg-slate-900 text-white shadow-2xs'
                                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="mt-6 border-b border-slate-200 flex gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'desc' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  الوصف والميزات
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'specs' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  المواصفات التقنية
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'reviews' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  التقييمات ({selectedProduct.reviews?.length || 0})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="mt-3 text-xs text-slate-600 min-h-[90px]">
                {activeTab === 'desc' && (
                  <p className="leading-relaxed">{selectedProduct.description}</p>
                )}
                {activeTab === 'specs' && (
                  <ul className="space-y-1.5">
                    {selectedProduct.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-2">
                    {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                      selectedProduct.reviews.map((rev) => (
                        <div key={rev.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                            <span>{rev.author}</span>
                            <span className="text-slate-400 font-normal">{rev.date}</span>
                          </div>
                          <div className="flex gap-0.5 text-amber-500 mb-1">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-slate-600">{rev.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 italic">لا توجد مراجعات مكتوبة بعد لهذا المنتج.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity + Add to Cart + WhatsApp */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-mono font-bold text-slate-800 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    disabled={quantity >= selectedProduct.stock || isOutOfStock}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    isOutOfStock
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span>{isOutOfStock ? 'نفد من المستودع' : 'إضافة إلى السلة'}</span>
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    inWishlist
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                  title="المفضلة"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Fast Direct WhatsApp Purchase */}
              <button
                onClick={handleQuickWhatsApp}
                disabled={isOutOfStock}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>طلب سريع ومباشر عبر واتساب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
