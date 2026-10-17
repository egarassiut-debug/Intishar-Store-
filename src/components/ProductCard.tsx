import React from 'react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingBag, Eye, Heart, Sparkles, Store } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, formatPrice, toggleWishlist, isItemInWishlist } = useStore();
  const inWishlist = isItemInWishlist(product.id);

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const isOutOfStock = product.stock <= 0;

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 overflow-hidden text-right">
      {/* Visual Frame */}
      <div
        className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Indicators */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {product.listingType === 'paid_ad' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-900 bg-purple-50/95 border border-purple-200/90 px-2 py-0.5 rounded shadow-2xs pointer-events-auto">
                <Sparkles className="w-3 h-3 text-purple-600" />
                <span>إعلان مميز</span>
              </span>
            )}
            {discountAmount > 0 && !isOutOfStock && (
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50/95 border border-emerald-200/80 px-2 py-0.5 rounded-md pointer-events-auto shadow-2xs">
                وفر {formatPrice(discountAmount)}
              </span>
            )}
            {isOutOfStock && (
              <span className="text-[11px] font-bold text-rose-800 bg-rose-50/95 border border-rose-200/80 px-2 py-0.5 rounded-md pointer-events-auto shadow-2xs">
                نفد مؤقتاً
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-rose-600 shadow-xs flex items-center justify-center transition-colors pointer-events-auto cursor-pointer"
            title="إضافة للمفضلة"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-slate-900 text-xs font-bold py-2 px-3 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>نظرة سريعة وتفاصيل</span>
          </button>
        </div>
      </div>

      {/* Content Block */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Metadata: Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-amber-600 font-bold font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              {product.ratingCount > 0 && <span className="text-slate-400">({product.ratingCount})</span>}
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Merchant Attribution */}
          {product.merchantName && (
            <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-semibold mt-1">
              <Store className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">بواسطة: {product.merchantName}</span>
            </div>
          )}

          {/* Low Stock Warning */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-[11px] text-amber-700 font-medium mt-1">
              متبقي {product.stock} قطع فقط في مخازن مصر
            </p>
          )}
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through font-mono tabular-nums">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (!isOutOfStock) {
                const defaultVariant = product.variants?.[0]
                  ? { [product.variants[0].name]: product.variants[0].options[0] }
                  : undefined;
                addToCart(product, 1, defaultVariant);
              }
            }}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 text-xs font-bold py-2 px-3 rounded-lg transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs hover:translate-y-[-1px]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'نفد' : 'أضف للسلة'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
