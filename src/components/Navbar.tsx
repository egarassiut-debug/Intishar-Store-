import React, { useState } from 'react';
import { ShoppingBag, Search, LayoutDashboard, Heart, X, Store } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PWAInstallNavbarButton } from './PWAInstallButton';

export const Navbar: React.FC = () => {
  const {
    cartItemCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    currentView,
    setCurrentView,
    wishlist,
    currentMerchant,
    setIsMerchantModalOpen,
    pendingApprovalProducts,
    setActiveCategory
  } = useStore();

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs text-right">
      {/* Egyptian Market Micro Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 text-center font-medium">
        <span>🇪🇬 شحن سريع لجميع محافظات مصر · كود الخصم الوطني: </span>
        <span className="font-mono font-bold text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded tracking-wide">MASR10</span>
        <span className="hidden sm:inline"> (خصم 10% على كل المنتجات المصرية)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 h-18">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setCurrentView('store');
                setActiveCategory('all');
              }}
              className="group text-right focus:outline-hidden cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  رِوَاق مِصْر
                </span>
                <span className="text-base" role="img" aria-label="Egypt Flag">🇪🇬</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 block tracking-wider uppercase">
                EGYPTIAN ARTISANAL STORE
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links & Search */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                setCurrentView('store');
                setActiveCategory('all');
              }}
              className={`hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'store' ? 'text-emerald-800 font-bold' : ''
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                setCurrentView('store');
                setActiveCategory('textiles');
              }}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              القطن المصري
            </button>
            <button
              onClick={() => {
                setCurrentView('store');
                setActiveCategory('pottery');
              }}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              فخار وخزف
            </button>
            <button
              onClick={() => {
                setCurrentView('store');
                setActiveCategory('fragrance');
              }}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              عطور وزيوت
            </button>
            <button
              onClick={() => {
                setCurrentView('store');
                setActiveCategory('leather');
              }}
              className="hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              جلود خان الخليلي
            </button>
          </div>

          {/* Desktop Live Search */}
          <div className="hidden md:flex flex-1 max-w-xs relative items-center">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'store') setCurrentView('store');
              }}
              placeholder="ابحث عن منتج، تاجر، أو محافظة..."
              className="w-full pr-9 pl-8 py-2 text-xs bg-slate-100 hover:bg-slate-200/70 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:border-emerald-600 focus:outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Zone 3: Actions (Merchant Portal, Admin Panel, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Currency Label: Egyptian Pound */}
            <div className="hidden sm:flex items-center px-2 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
              ج.م (EGP)
            </div>

            {/* PWA Download / Install Button */}
            <PWAInstallNavbarButton />

            {/* Merchant Portal Button */}
            <button
              onClick={() => {
                if (currentMerchant) {
                  setCurrentView('merchant-dashboard');
                } else {
                  setIsMerchantModalOpen(true);
                }
              }}
              className={`flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                currentView === 'merchant-dashboard'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                  : currentMerchant
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
              title="بوابة التجار والمصنعين"
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>
                {currentMerchant ? currentMerchant.businessName.slice(0, 14) : 'بوابة التجار'}
              </span>
            </button>

            {/* Admin Console Switcher */}
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
              className={`relative flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
              title="لوحة تحكم الإدارة"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">
                {currentView === 'admin' ? 'المتجر' : 'لوحة الإدارة'}
              </span>
              {pendingApprovalProducts.length > 0 && currentView !== 'admin' && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping absolute -top-1 -right-1" />
              )}
            </button>

            {/* Wishlist Indicator */}
            {wishlist.length > 0 && (
              <button
                onClick={() => {
                  setCurrentView('store');
                  setActiveCategory('all');
                }}
                className="relative p-2 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="المفضلة"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg font-bold text-xs shadow-xs transition-all cursor-pointer"
              aria-label="سلة التسوق"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">السلة</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 bg-white text-emerald-800 text-xs font-bold rounded-full flex items-center justify-center tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {isMobileSearchOpen && (
          <div className="md:hidden py-3 border-t border-slate-200">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتج، تاجر، أو محافظة..."
                className="w-full pr-9 pl-8 py-2 text-xs bg-slate-100 text-slate-900 placeholder:text-slate-400 rounded-lg border border-slate-200 focus:outline-hidden"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
