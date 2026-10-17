import React, { useState } from 'react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { Download, Smartphone, Monitor, X, Share, PlusSquare, Check, WifiOff, Sparkles } from 'lucide-react';

export const PWAInstallNavbarButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  // If already installed and running standalone, show active app status or null
  if (isInstalled) {
    return (
      <div className="hidden md:flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
        <Check className="w-3.5 h-3.5 text-emerald-600" />
        <span>مثبت كتطبيق أصلي</span>
      </div>
    );
  }

  const handleButtonClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-2xs transition-all hover:scale-102 cursor-pointer"
        title="تثبيت التطبيق على الموبايل أو الكمبيوتر (PWA)"
      >
        <Download className="w-3.5 h-3.5 animate-bounce" />
        <span className="hidden sm:inline">تحميل التطبيق</span>
        <span className="sm:hidden">تثبيت</span>
      </button>

      {/* Installation Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right animate-in fade-in duration-200">
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img src="/pwa-192x192.png" alt="رواق مصر" className="w-9 h-9 rounded-xl border border-emerald-600/30 shadow-xs" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">تثبيت تطبيق "رواق مصر" (PWA)</h3>
                  <p className="text-[11px] text-emerald-700 font-semibold">تجربة تسوق سريعة وتعمل بدون إنترنت</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isIOS ? (
              /* iOS Safari Guided Steps */
              <div className="space-y-3 text-xs text-slate-700">
                <p className="font-semibold text-slate-900">
                  لتثبيت التطبيق على هاتف iPhone أو جهاز iPad:
                </p>
                <ol className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span>
                      اضغط على زر <strong>المشاركة (Share)</strong> <Share className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> في شريط متصفح سفاري بالأسفل.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span>
                      مرر للأسفل واختر <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-slate-800" />.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span>
                      اضغط على <strong>"إضافة (Add)"</strong> في الزاوية العلوية، وسيظهر التطبيق على شاشتك الرئيسية فوراً!
                    </span>
                  </li>
                </ol>
              </div>
            ) : isInstallable ? (
              /* Direct Install for Android & Chrome Desktop */
              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  يمكنك تثبيت متجر رواق مصر بنقرة واحدة كبرنامج مستقل على هاتفك أو جهاز الكمبيوتر الخاص بك، مع شاشة كاملة وسرعة فائقة.
                </p>
                <button
                  onClick={async () => {
                    await install();
                    setShowModal(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>تثبيت التطبيق الآن على جهازك</span>
                </button>
              </div>
            ) : (
              /* Fallback / Desktop Browser Instructions */
              <div className="space-y-3 text-xs text-slate-600">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Monitor className="w-4 h-4 text-emerald-600" />
                    <span>للتثبيت عبر متصفح الكمبيوتر (Chrome / Edge):</span>
                  </p>
                  <p>
                    اضغط على أيقونة <strong>التثبيت</strong> <Download className="w-3.5 h-3.5 inline text-emerald-700 mx-1" /> الموجودة في أعلى شريط عنوان المتصفح (URL) أو من قائمة الخيارات الثلاث نقاط (⋮) &gt; "تثبيت رواق مصر".
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>للتثبيت على هواتف أندرويد (Android):</span>
                  </p>
                  <p>
                    افتح قائمة المتصفح (⋮) واختر <strong>"تثبيت التطبيق"</strong> أو <strong>"الإضافة إلى الشاشة الرئيسية"</strong>.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-lg text-xs transition-colors"
            >
              حسناً، فهمت
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const PWAInstallFloatingBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled || dismissed) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-emerald-500/30 text-right flex items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-3 min-w-0">
          <img src="/pwa-192x192.png" alt="رواق مصر" className="w-10 h-10 rounded-xl border border-emerald-500/40 shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs truncate">تطبيق رواق مصر</span>
              <span className="bg-emerald-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.2 rounded font-mono">PWA</span>
            </div>
            <p className="text-[11px] text-slate-300 truncate">
              ثبّته على شاشتك لتصفح أسرع وإشعارات وتجربة بدون نت
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تثبيت</span>
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            title="إخفاء"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
            <h3 className="font-bold text-slate-900 text-sm">خطوات التثبيت</h3>
            {isIOS ? (
              <p className="leading-relaxed">
                اضغط على أيقونة <strong>المشاركة (Share)</strong> في أسفل متصفح سفاري ثم اختر <strong>"إضافة إلى الشاشة الرئيسية"</strong>.
              </p>
            ) : (
              <p className="leading-relaxed">
                اضغط على زر القائمة (⋮) في المتصفح واختر <strong>"تثبيت التطبيق"</strong> أو <strong>"الإضافة إلى الشاشة الرئيسية"</strong>.
              </p>
            )}
            <button
              onClick={() => setShowGuide(false)}
              className="w-full bg-slate-900 text-white font-bold py-2 rounded-lg"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-18 inset-x-0 z-40 bg-amber-600 text-white py-1.5 px-4 text-center text-xs font-bold shadow-md flex items-center justify-center gap-2">
      <WifiOff className="w-4 h-4" />
      <span>أنت تتصفح حالياً في وضع عدم الاتصال (Offline) — يتم استخدام البيانات المخزنة محلياً في PWA.</span>
    </div>
  );
};
