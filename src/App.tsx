import React, { useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { OrderSuccessView } from './components/OrderSuccessView';
import { AdminDashboard } from './components/AdminDashboard';
import { MerchantPortalModal, MerchantDashboardView } from './components/MerchantPortal';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';
import { PWAInstallFloatingBanner, OfflineIndicator } from './components/PWAInstallButton';
import { SearchX, Store } from 'lucide-react';

const StoreFront: React.FC = () => {
  const {
    approvedProducts,
    activeCategory,
    searchQuery,
    sortBy,
    setSearchQuery,
    setActiveCategory,
    setIsMerchantModalOpen,
    currentMerchant,
    setCurrentView
  } = useStore();

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...approvedProducts];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.merchantName && p.merchantName.toLowerCase().includes(q)) ||
          (p.nameEn && p.nameEn.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else {
      // featured & paid ads first
      result.sort((a, b) => {
        if (a.listingType === 'paid_ad' && b.listingType !== 'paid_ad') return -1;
        if (b.listingType === 'paid_ad' && a.listingType !== 'paid_ad') return 1;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
    }

    return result;
  }, [approvedProducts, activeCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8 text-right">
      {/* Hero only shown when not searching */}
      {!searchQuery && <HeroBanner />}

      <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold text-emerald-800 tracking-wider">
              {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : 'المعروضات المصرية المعتمدة'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {searchQuery ? 'المنتجات المطابقة للبحث' : 'تشكيلات وتراث المحافظات المصرية'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm text-slate-500">
              {filteredAndSortedProducts.length} منتج مصري معتمد
            </span>
            <button
              onClick={() => {
                if (currentMerchant) {
                  setCurrentView('merchant-dashboard');
                } else {
                  setIsMerchantModalOpen(true);
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>أنت تاجر؟ اعرض منتجك هنا</span>
            </button>
          </div>
        </div>

        {/* Category & Sorting Navigation */}
        <CategoryFilter />

        {/* Product Grid or Empty State */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 px-4 text-center bg-white rounded-2xl border border-slate-200">
            <SearchX className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5] mb-3" />
            <h3 className="text-base font-bold text-slate-800">لم يتم العثور على أي منتج مصري مطابق</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              جرب البحث باسم محافظة (مثل المحلة، الفيوم، قنا) أو نوع المنتج.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              عرض جميع المنتجات المصرية
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1">
        {currentView === 'store' && <StoreFront />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'merchant-dashboard' && <MerchantDashboardView />}
        {currentView === 'order-success' && <OrderSuccessView />}
      </div>

      <Footer />

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <WhatsAppCheckoutModal />
      <MerchantPortalModal />
      <ToastNotification />
      <PWAInstallFloatingBanner />
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
