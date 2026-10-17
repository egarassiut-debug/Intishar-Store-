import { Product, Coupon, Merchant } from '../types/store';

export const EGYPTIAN_GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية (المنصورة)',
  'الغربية (طنطا والمحلة)',
  'القليوبية',
  'الشرقية (الزقازيق)',
  'المنوفية',
  'البحيرة (دمنهور)',
  'كفر الشيخ',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر (الغردقة)',
  'جنوب سيناء (شرم الشيخ)',
  'مطروح والساحل الشمالي'
];

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'merch-1',
    businessName: 'مغزل المحلة للقطن المصري',
    ownerName: 'المهندس طارق الشناوي',
    phone: '01012345678',
    governorate: 'الغربية (طنطا والمحلة)',
    payoutMethod: 'vodafone_cash',
    payoutDetails: '01012345678',
    email: 'mahalla@cotton.eg',
    password: '123',
    status: 'active',
    totalSales: 18500,
    commissionPaidToAdmin: 1850,
    netEarnings: 16650,
    createdAt: '2026-09-10'
  },
  {
    id: 'merch-2',
    businessName: 'خزفيات قرية تونس بالفيوم',
    ownerName: 'الفنانة راوية فؤاد',
    phone: '01198765432',
    governorate: 'الفيوم',
    payoutMethod: 'instapay',
    payoutDetails: 'rawia.fayoum@instapay',
    email: 'pottery@fayoum.eg',
    password: '123',
    status: 'active',
    totalSales: 9400,
    commissionPaidToAdmin: 940,
    netEarnings: 8460,
    createdAt: '2026-09-18'
  },
  {
    id: 'merch-3',
    businessName: 'ورشة الخان للمصنوعات الجلدية',
    ownerName: 'الحاج مصطفى السقا',
    phone: '01234567890',
    governorate: 'القاهرة',
    payoutMethod: 'vodafone_cash',
    payoutDetails: '01234567890',
    email: 'khan@leather.eg',
    password: '123',
    status: 'active',
    totalSales: 14200,
    commissionPaidToAdmin: 1420,
    netEarnings: 12780,
    createdAt: '2026-10-01'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'طقم ملايات وسراير قطن مصري 100% فاخر طويل التيلة',
    nameEn: 'Luxury 100% Egyptian Giza Cotton Bedding Set',
    description: 'مصنوع من أجود خيوط القطن المصري طويل التيلة (قطن جيزة 94 الفاخر) بنعومة فائقة وبرودة طبيعية تناسب المناخ المصري، حياكة يدوية متقنة في مصانع المحلة الكبرى.',
    category: 'textiles',
    categoryLabel: 'مفروشات وقطن مصري',
    price: 1850,
    originalPrice: 2400,
    rating: 4.9,
    ratingCount: 168,
    stock: 24,
    image: '/src/assets/images/product_headphones_1792169369351.jpg',
    features: [
      'قطن مصري نقي 100% طويل التيلة حاصل على شهادة الأصالة',
      'كثافة خيوط 400 غرزة لنعومة ومتانة فائقة تدوم لسنوات',
      'مقاوم للوبر والانكماش مع الغسيل المتكرر',
      'طقم كامل 6 قطع: ملاية فلات + ملاية كاستك + 4 أكياس مخدات'
    ],
    isFeatured: true,
    isNewArrival: true,
    merchantId: 'merch-1',
    merchantName: 'مغزل المحلة للقطن المصري',
    approvalStatus: 'approved',
    listingType: 'commission',
    commissionRate: 10,
    submittedAt: '2026-10-01',
    variants: [
      {
        id: 'color',
        name: 'اللون',
        options: ['أبيض ناصع', 'رمادي فندقي', 'كافيه هادئ', 'أزرق نيلي']
      },
      {
        id: 'size',
        name: 'المقاس',
        options: ['كينج كبير (200×200)', 'كوين وسط (160×200)']
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'د. يوسف الشافعي (القاهرة)',
        rating: 5,
        comment: 'خامة القطن مريحة وباردة جداً في الصيف، فخر الصناعة المصرية بحق.',
        date: 'منذ يومين'
      },
      {
        id: 'rev-2',
        author: 'مروة عبدالحميد (الإسكندرية)',
        rating: 5,
        comment: 'غسلته مرتين ولم يتأثر لونه أو نعومته إطلاقاً، أنصح به بشدة.',
        date: 'منذ أسبوع'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'أباجورة خزف ومزهرية قرية تونس المنحوتة يدوياً بالفيوم',
    nameEn: 'Handmade Fayoum Artisanal Ceramic Lamp & Vase',
    description: 'قطعة ديكور حصرية صنعت وشكلت يدوياً على دولاب الفخار بقرية تونس بالفيوم، طين أسواني طبيعي مع حرق مزدوج وإضاءة دافئة مريحة للمنزل العصري.',
    category: 'pottery',
    categoryLabel: 'فخار وخزف يدوي',
    price: 950,
    originalPrice: 1250,
    rating: 4.8,
    ratingCount: 84,
    stock: 9,
    image: '/src/assets/images/product_ceramic_lamp_1792169370465.jpg',
    features: [
      'صناعة يدوية 100% بأيدي حرفيي قرية تونس التراثية بالفيوم',
      'مزودة بلمبة ليد موفرة ودايمر للتحكم بدرجة السطوع',
      'ألوان طبيعية ثابتة مدمجة مع الزجاج الفخاري المصهور',
      'تصميم يجمع بين الروح المصرية القديمة والمودرن المينيمال'
    ],
    isFeatured: true,
    isNewArrival: false,
    merchantId: 'merch-2',
    merchantName: 'خزفيات قرية تونس بالفيوم',
    approvalStatus: 'approved',
    listingType: 'paid_ad',
    commissionRate: 0,
    adFeePaid: 150,
    submittedAt: '2026-10-05',
    variants: [
      {
        id: 'style',
        name: 'درجة اللون',
        options: ['بيج رملي مطفي', 'أخضر واحاتي مائل للزيتي']
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'عطر زهرة اللوتس والياسمين المصري العتيق (Lotus & Jasmine)',
    nameEn: 'Royal Egyptian Blue Lotus & Jasmine Parfum',
    description: 'مستخلص من زهور اللوتس النيلية وياسمين قرية شبرا بلولة بمحافظة الغربية المشهورة عالمياً بإنتاج أرقى الزيوت العطرية لكبرى دور العطور العالمية.',
    category: 'fragrance',
    categoryLabel: 'عطور وزيوت طبيعية',
    price: 1350,
    originalPrice: 1700,
    rating: 4.9,
    ratingCount: 112,
    stock: 14,
    image: '/src/assets/images/product_luxury_perfume_1792169370452.jpg',
    features: [
      'زيت عطري نقي مستخلص بالتقطير البارد بدون إضافات كيميائية',
      'ثبات لا يقل عن 36 ساعة على الملابس ورائحة ساحرة لا تضاهى',
      'زجاجة كريستال فاخرة بغطاء ذهبي مستوحى من التيجان الملكية',
      'حجم 100 مل مركز بنسبة Extrait de Parfum 30%'
    ],
    isFeatured: true,
    isNewArrival: true,
    merchantId: 'merch-1',
    merchantName: 'مغزل المحلة للقطن المصري',
    approvalStatus: 'approved',
    listingType: 'commission',
    commissionRate: 10,
    submittedAt: '2026-10-08',
    variants: [
      {
        id: 'size',
        name: 'الحجم',
        options: ['100 مل بخاخ', '50 مل بخاخ', 'تولة زيت خام مركز']
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'حقيبة لابتوب وسفر جلد طبيعي بقري مدبوغ نباتياً (خان الخليلي)',
    nameEn: 'Khan El-Khalili Handcrafted Vegetable-Tanned Leather Bag',
    description: 'حقيبة عملية وأنيقة من الجلد الطبيعي المصري الكامل، مدبوغة بمواد نباتية طبيعية تزيدها عراقة مع مرور السنين، تتسع لحاسوب محمول حتى 16 بوصة وملفات العمل.',
    category: 'leather',
    categoryLabel: 'جلود طبيعية وأحذية',
    price: 2100,
    originalPrice: 2800,
    rating: 4.9,
    ratingCount: 95,
    stock: 8,
    image: '/src/assets/images/product_smartwatch_1792169370373.jpg',
    features: [
      'جلد طبيعي بقري 100% درجة أولى بدون بطانات صناعية رديئة',
      'إكسسوارات وسحابات نحاسية ثقيلة مقاومة للصدأ مدى الحياة',
      'حزام كتف جلدي مبطن قابل للتعديل والفصل',
      'جيب داخلي مبطن خاص لحماية اللابتوب وجيوب للأقلام والهاتف'
    ],
    isFeatured: true,
    isNewArrival: false,
    merchantId: 'merch-3',
    merchantName: 'ورشة الخان للمصنوعات الجلدية',
    approvalStatus: 'approved',
    listingType: 'commission',
    commissionRate: 10,
    submittedAt: '2026-10-09'
  },
  {
    id: 'prod-5',
    name: 'سماعات رأس لاسلكية إلغاء ضوضاء (تجميع محلي معتمد)',
    nameEn: 'NileTech Active Noise Cancelling Headphones',
    description: 'سماعات ذكية بتقنية إلغاء الضوضاء النشطة، مجمعة ومفحوصة محلياً بمكونات يابانية مع ضمان صيانة معتمد داخل مصر لمدة عامين واستبدال فوري.',
    category: 'electronics',
    categoryLabel: 'إلكترونيات وأجهزة',
    price: 1650,
    originalPrice: 2100,
    rating: 4.7,
    ratingCount: 68,
    stock: 19,
    image: '/src/assets/images/product_headphones_1792169369351.jpg',
    features: [
      'عزل صوت هجين نشط (ANC) بنسبة 95% من الضوضاء المحيطة',
      'بطارية عملاقة تدوم حتى 45 ساعة عمل متواصلة',
      'ميكروفونات متعددة تدعم نقاء المكالمات في شوارع مصر المزدحمة',
      'ضمان محلي شامل سنتين من الوكيل المعتمد بالقاهرة'
    ],
    isFeatured: false,
    isNewArrival: true,
    approvalStatus: 'approved',
    listingType: 'commission',
    commissionRate: 8,
    submittedAt: '2026-10-10'
  },
  {
    id: 'prod-6',
    name: 'بوكس القهوة الملكية المحوجة بالمستكة والحبهان الغواتيمالي',
    nameEn: 'Artisan Egyptian Royal Cardamom & Mastic Coffee',
    description: 'توليفة بن برازيلي وكولومبي طازجة محمصة في المعادي بالقاهرة، مطحونة مع الحبهان الأخضر والمستكة اليونانية الأصلية والزعفران على طريقة البيوت المصرية العريقة.',
    category: 'food',
    categoryLabel: 'أغذية ومأكولات مصرية',
    price: 420,
    originalPrice: 520,
    rating: 4.8,
    ratingCount: 140,
    stock: 35,
    image: '/src/assets/images/product_luxury_perfume_1792169370452.jpg',
    features: [
      'عبوة 500 جرام محكمة الغلق بصمام تفريغ هواء طازج',
      'تحميص وسط معتدل بدون أي مرارة أو إضافات صناعية',
      'مستكة يونانية أصلية 100% وحبهان منقى حبة بحبة'
    ],
    isFeatured: false,
    isNewArrival: false,
    approvalStatus: 'approved',
    listingType: 'commission',
    commissionRate: 10,
    submittedAt: '2026-10-11'
  },
  // Example of a Pending Merchant Submission for the Admin to Review & Approve
  {
    id: 'prod-pending-1',
    name: 'سجادة كليم يدوي صوف طبيعي 100% من نول فوة التراثي',
    nameEn: 'Handmade Wool Kilim Rug from Fuwwah',
    description: 'سجادة صوف نقي منسوجة على النول اليدوي القديم بمدينة فوة بكفر الشيخ، ألوان طبيعية ثابتة بتصميم هندسي فرعوني وإسلامي بديع مقاس 1.5 × 2 متر.',
    category: 'textiles',
    categoryLabel: 'مفروشات وقطن مصري',
    price: 3200,
    originalPrice: 3900,
    rating: 5.0,
    ratingCount: 0,
    stock: 5,
    image: '/src/assets/images/product_smartwatch_1792169370373.jpg',
    features: [
      'صوف طبيعي 100% منسوج يدوياً بالكامل على نول خشب تقليدي',
      'أصباغ نباتية طبيعية لا تبهت مع الزمن',
      'مقاس 150 سم × 200 سم مناسب للصالونات وغرف المعيشة'
    ],
    isFeatured: false,
    isNewArrival: true,
    merchantId: 'merch-2',
    merchantName: 'خزفيات قرية تونس بالفيوم',
    approvalStatus: 'pending',
    listingType: 'commission',
    commissionRate: 12,
    submittedAt: '2026-10-16 08:30'
  },
  {
    id: 'prod-pending-2',
    name: 'طقم شاي وقهوة نحاس أصفر منقوش يدوياً بالأرابيسك',
    nameEn: 'Hand-Engraved Brass Tea & Coffee Arabesque Set',
    description: 'صينية نحاسية قطر 50 سم مع 6 كاسات وقدح قهوة، نقش أرابيسك يدوي متقن من صناع النحاس بحي الحسين وشارع المعز بالقاهرة التاريخية.',
    category: 'pottery',
    categoryLabel: 'فخار وخزف يدوي',
    price: 2450,
    originalPrice: 2900,
    rating: 5.0,
    ratingCount: 0,
    stock: 4,
    image: '/src/assets/images/product_ceramic_lamp_1792169370465.jpg',
    features: [
      'نحاس أصفر مصمت عالي الكثافة لا يصدأ',
      'حفر وتفريغ يدوي بنقوش تراثية فريدة',
      'مطلي بطبقة حماية تمنع الأكسدة وتغير اللون'
    ],
    isFeatured: true,
    isNewArrival: true,
    merchantId: 'merch-3',
    merchantName: 'ورشة الخان للمصنوعات الجلدية',
    approvalStatus: 'pending',
    listingType: 'paid_ad',
    commissionRate: 0,
    adFeePaid: 200,
    submittedAt: '2026-10-16 09:15'
  }
];

export const VALID_COUPONS: Coupon[] = [
  { code: 'MASR10', discountPercentage: 10, minPurchase: 300 },
  { code: 'AHLYA', discountPercentage: 15, minPurchase: 500 },
  { code: 'EGYPT20', discountPercentage: 20, minPurchase: 1000 }
];

export const CATEGORIES = [
  { id: 'all', label: 'جميع المعروضات', icon: 'Sparkles' },
  { id: 'textiles', label: 'القطن والمفروشات المصرية', icon: 'Shirt' },
  { id: 'pottery', label: 'فخار وخزف الفيوم وقنا', icon: 'Home' },
  { id: 'fragrance', label: 'عطور وزيوت اللوتس والياسمين', icon: 'Flame' },
  { id: 'leather', label: 'جلود خان الخليلي الطبيعية', icon: 'Watch' },
  { id: 'electronics', label: 'أجهزة وإلكترونيات مصرية', icon: 'Laptop' },
  { id: 'food', label: 'أغذية ومنتجات بلدية', icon: 'Coffee' }
];
