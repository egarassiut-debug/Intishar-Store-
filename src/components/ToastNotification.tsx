import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = 'bg-slate-900 text-white border-slate-700';
        let Icon = CheckCircle2;

        if (toast.type === 'success') {
          bgColor = 'bg-slate-900 text-white border-emerald-500/50';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bgColor = 'bg-rose-950 text-white border-rose-600';
          Icon = AlertCircle;
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-950 text-amber-100 border-amber-600';
          Icon = AlertTriangle;
        } else {
          bgColor = 'bg-slate-900 text-white border-slate-700';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-2 fade-in duration-200 text-right ${bgColor}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-white transition-colors shrink-0"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
