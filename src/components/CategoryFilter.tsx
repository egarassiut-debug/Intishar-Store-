import React from 'react';
import { CATEGORIES } from '../data/initialProducts';
import { useStore } from '../context/StoreContext';
import { Sparkles, Laptop, Flame, Watch, Home, Shirt, ArrowUpDown } from 'lucide-react';

export const CategoryFilter: React.FC = () => {
  const { activeCategory, setActiveCategory, products, sortBy, setSortBy } = useStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Watch': return <Watch className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Shirt': return <Shirt className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Buttons Segmented Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {getIcon(cat.icon)}
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 whitespace-nowrap">الترتيب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-medium bg-white text-slate-800 py-1.5 px-3 rounded-lg border border-slate-200 focus:outline-hidden cursor-pointer"
          >
            <option value="featured">المميزة أولاً</option>
            <option value="price-asc">السعر: من الأقل للأعلى</option>
            <option value="price-desc">السعر: من الأعلى للأقل</option>
            <option value="rating">الأعلى تقييماً</option>
            <option value="newest">الأحدث وصولاً</option>
          </select>
        </div>
      </div>
    </div>
  );
};
