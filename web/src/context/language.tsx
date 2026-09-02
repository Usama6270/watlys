'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type TranslationDict = {
  nav: {
    products: string;
    sustainability: string;
    services: string;
    servicesList: {
      installation: string;
      testing: string;
      dispenser: string;
      delivery: string;
    };
    process: string;
    about: string;
    findUs: string;
    findUsList: {
      contact: string;
      locations: string;
      inquiry: string;
    };
    signIn: string;
    dashboard: string;
    cart: string;
  };
  hero: {
    tagline: string;
    subtitle: string;
    ctaBuy: string;
    ctaShop: string;
    ctaStory: string;
  };
  philosophy: {
    tag: string;
    title: string;
    text1: string;
    text2: string;
    cta: string;
  };
  specs: {
    tag: string;
    title: string;
    subtitle: string;
    ph: string;
    capacity: string;
    material: string;
    minerals: string;
    idealUse: string;
  };
  products: {
    tag: string;
    title: string;
    viewAll: string;
    addToCart: string;
  };
  packages: {
    tag: string;
    title: string;
    byAudience: string;
    byDuration: string;
    student: { name: string; desc: string; price: string; details: string[] };
    family: { name: string; desc: string; price: string; details: string[] };
    corporate: { name: string; desc: string; price: string; details: string[] };
    weekly: { name: string; desc: string; price: string; details: string[] };
    monthly: { name: string; desc: string; price: string; details: string[] };
    annual: { name: string; desc: string; price: string; details: string[] };
  };
  calculator: {
    title: string;
    subtitle: string;
    bottleSize: string;
    bottlesPerWeek: string;
    subLength: string;
    totalBottles: string;
    totalPrice: string;
    pricePerBottle: string;
    regularPrice: string;
    plasticSaved: string;
    deliveryFreq: string;
    cta: string;
  };
  process: {
    title: string;
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3: { title: string; desc: string };
    step4: { title: string; desc: string };
    step5: { title: string; desc: string };
  };
  stats: {
    ph: string;
    glass: string;
    microplastics: string;
    minerals: string;
  };
  testimonials: {
    tag: string;
    title: string;
  };
  newsletter: {
    tag: string;
    title: string;
    desc: string;
    emailPlaceholder: string;
    button: string;
    success: string;
  };
  footer: {
    rights: string;
  };
  about: {
    title: string;
    subtitle: string;
    intro: string;
    storyTitle: string;
    storyText1: string;
    storyText2: string;
    sourceTitle: string;
    sourceText: string;
  };
};

const translations: Record<'en' | 'ur', TranslationDict> = {
  en: {
    nav: {
      products: 'Products',
      sustainability: 'Sustainability',
      services: 'Services',
      servicesList: {
        installation: 'Free Bottle Installations',
        testing: 'Water Testing',
        dispenser: 'Dispenser Service',
        delivery: 'Delivery Options',
      },
      process: 'Process',
      about: 'About Watlys',
      findUs: 'Where to Find Us',
      findUsList: {
        contact: 'Contact Us (WhatsApp/Email)',
        locations: 'Locations',
        inquiry: 'Data/Inquiry Form',
      },
      signIn: 'Sign In',
      dashboard: 'Dashboard',
      cart: 'Cart',
    },
    hero: {
      tagline: 'Pure Artistry from the Depths',
      subtitle: 'Naturally filtered mineral water crafted in premium, sustainable glass.',
      ctaBuy: 'Buy Now',
      ctaShop: 'Shop Collection',
      ctaStory: 'Our Story',
    },
    philosophy: {
      tag: 'Our Philosophy',
      title: 'Water is not just hydration. It is life, curated.',
      text1: 'At Watlys, we believe that the water you consume should be as refined as the life you lead. Sourced from pristine underground reservoirs, our mineral water undergoes a natural geological filtration process over decades.',
      text2: 'Each bottle is a monument to purity, enclosed in premium editorial glassware designed to sit elegantly on any table. We exist at the intersection of natural beauty and human craftsmanship.',
      cta: 'Our Journey',
    },
    specs: {
      tag: 'Purity Under the Microscope',
      title: 'Composition of Purity',
      subtitle: 'Hover or tap hotspots on the bottle to discover the mineral balance.',
      ph: 'pH Balance',
      capacity: 'Capacity',
      material: 'Material',
      minerals: 'Essential Minerals',
      idealUse: 'Ideal Use',
    },
    products: {
      tag: 'The Collection',
      title: 'Selected Bottles',
      viewAll: 'View All Products',
      addToCart: 'Add to Cart',
    },
    packages: {
      tag: 'Curated Hydration',
      title: 'Our Packages',
      byAudience: 'By Audience',
      byDuration: 'By Duration',
      student: {
        name: 'Student Package',
        desc: 'Stay focused with pure mineral balance tailored for academic wellness.',
        price: '$12.00',
        details: ['4x 750ml classic bottles weekly', 'Eco-delivery', 'Cancel anytime'],
      },
      family: {
        name: 'Family Package',
        desc: 'Nurture your loved ones with daily wellness and clean minerals.',
        price: '$38.00',
        details: ['12x 1L sport/classic bottles weekly', 'Priority home delivery', 'Free installation support'],
      },
      corporate: {
        name: 'Corporate Package',
        desc: 'Elevate your office energy and executive meeting rooms.',
        price: '$120.00',
        details: ['48x 750ml glass bottles weekly', 'Scheduled direct delivery', 'Dispenser cleaning service included'],
      },
      weekly: {
        name: 'Weekly Package',
        desc: 'Short term supply for event hydration and active weeks.',
        price: '$15.00',
        details: ['6x 1L premium bottles', 'One-time delivery', 'Glass return option'],
      },
      monthly: {
        name: 'Monthly Subscription',
        desc: 'Consistent monthly mineral delivery for everyday ease.',
        price: '$49.00',
        details: ['24x 1L classic glass bottles monthly', 'Scheduled delivery', '10% subscription discount included'],
      },
      annual: {
        name: 'Annual Elite Pass',
        desc: 'Lifetime hydration wellness pass. Our best geological supply.',
        price: '$450.00',
        details: ['300x 1L classic bottles annually', 'Unlimited adjustments', 'Dedicated concierge manager'],
      },
    },
    calculator: {
      title: 'Custom Hydration Planner',
      subtitle: 'Plan your custom monthly geological mineral water requirements dynamically.',
      bottleSize: 'Bottle Size',
      bottlesPerWeek: 'Bottles per Week',
      subLength: 'Subscription Length',
      totalBottles: 'Total Bottles',
      totalPrice: 'Total Price',
      pricePerBottle: 'Price per Bottle',
      regularPrice: 'Regular Rate',
      plasticSaved: 'Plastic Bottles Saved',
      deliveryFreq: 'We recommend delivery every {days} days at this volume.',
      cta: 'Subscribe to Planner',
    },
    process: {
      title: 'The Geological Journey',
      step1: { title: 'Natural Spring Source', desc: 'Sourced from deep high-altitude natural aquifers protected from external elements.' },
      step2: { title: 'Natural Filtration', desc: 'Geologically filtered through layers of mountain rock over decades.' },
      step3: { title: 'Quality Assurance', desc: 'Tested rigorously at state-of-the-art labs to ensure perfect mineral balance.' },
      step4: { title: 'Premium Bottling', desc: 'Bottled at source into lead-free fluid silhouette recyclable glass vessels.' },
      step5: { title: 'Bespoke Delivery', desc: 'Delivered directly to your door through our carbon-neutral logistics team.' },
    },
    stats: {
      ph: 'Optimal pH Level',
      glass: 'Recyclable Glass',
      microplastics: 'Microplastics',
      minerals: 'Active Minerals',
    },
    testimonials: {
      tag: 'Client Voices',
      title: 'Praised by the Discerning',
    },
    newsletter: {
      tag: 'Knowledge Series',
      title: 'Weekly Science & Policy',
      desc: 'Discover water science, health insights, beauty benefits, and global WHO hydration guidelines.',
      emailPlaceholder: 'Enter your email address',
      button: 'Subscribe',
      success: 'Thank you for joining our weekly knowledge series.',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    about: {
      title: 'Our Story',
      subtitle: 'Reimagining the ritual of daily hydration.',
      intro: 'Watlys is a premium mineral water brand designed for those who appreciate purity, elegance, and sustainability.',
      storyTitle: 'The Genesis',
      storyText1: 'Founded with a vision to challenge the disposable nature of daily hydration, Watlys elevates water from a basic commodity into a luxury table-side experience.',
      storyText2: 'Our water is collected from pristine natural aquifers, where geological formations naturally enrich it with optimal mineral trace profiles before we package it in highly aesthetic, reusable glass.',
      sourceTitle: 'Sustainably Sourced',
      sourceText: 'We operate under strict ecological protection acts, ensuring that we never take more than nature intends to give. Our carbon-neutral filling facility uses 100% renewable energy.',
    },
  },
  ur: {
    nav: {
      products: 'مصنوعات',
      sustainability: 'پائیداری',
      services: 'خدمات',
      servicesList: {
        installation: 'مفت بوتل کی تنصیب',
        testing: 'پانی کا لیب ٹیسٹ',
        dispenser: 'ڈسپنسر سروس',
        delivery: 'ڈیلیوری کے اختیارات',
      },
      process: 'طریقہ کار',
      about: 'ہمارے بارے میں',
      findUs: 'ہمیں کہاں تلاش کریں',
      findUsList: {
        contact: 'رابطہ کریں (واٹس ایپ/ای میل)',
        locations: 'ہمارے مقامات',
        inquiry: 'انکوائری فارم',
      },
      signIn: 'سائن ان',
      dashboard: 'ڈیش بورڈ',
      cart: 'کارٹ',
    },
    hero: {
      tagline: 'گہرائیوں سے حاصل کردہ خالص فن',
      subtitle: 'قدرتی طور پر فلٹر شدہ منرل واٹر، جو پریمیم اور پائیدار شیشے کی بوتلوں میں تیار کیا گیا ہے۔',
      ctaBuy: 'ابھی خریدیں',
      ctaShop: 'شاپ کلیکشن',
      ctaStory: 'ہماری کہانی',
    },
    philosophy: {
      tag: 'ہمارا نظریہ',
      title: 'پانی صرف پیاس بجھانا نہیں، یہ ایک آرٹ ہے۔',
      text1: 'واٹلیس میں ہمارا ماننا ہے کہ جو پانی آپ پیتے ہیں وہ اتنا ہی نفیس ہونا چاہیے جتنا کہ آپ کا طرزِ زندگی۔ قدرتی زیرِ زمین ذخائر سے حاصل کردہ ہمارا منرل واٹر دہائیوں پر محیط ارضیاتی عمل سے گزرتا ہے۔',
      text2: 'ہر بوتل پاکیزگی کا شاہکار ہے، جو پریمیم شیشے کے برتنوں میں پیش کی جاتی ہے تاکہ آپ کے میز کی خوبصورتی میں اضافہ کرے۔ ہم قدرتی حسن اور انسانی کاریگری کے سنگم پر کھڑے ہیں۔',
      cta: 'ہمارا سفر',
    },
    specs: {
      tag: 'پاکیزگی کی تفصیل',
      title: 'پاکیزگی کا توازن',
      subtitle: 'بوتل پر موجود ہاٹ اسپاٹس پر ہور کریں یا ٹیپ کریں تاکہ معدنیات کا پتہ چل سکے۔',
      ph: 'پی ایچ توازن',
      capacity: 'گنجائش',
      material: 'مواد',
      minerals: 'اہم معدنیات',
      idealUse: 'بہترین استعمال',
    },
    products: {
      tag: 'کلیکشن',
      title: 'منتخب بوتلیں',
      viewAll: 'تمام مصنوعات دیکھیں',
      addToCart: 'کارٹ میں شامل کریں',
    },
    packages: {
      tag: 'منتخب ہائیڈریشن',
      title: 'ہمارے پیکجز',
      byAudience: 'صارف کے مطابق',
      byDuration: 'مدت کے مطابق',
      student: {
        name: 'اسٹوڈنٹ پیکج',
        desc: 'تعلیمی سرگرمیوں کے دوران تروتازہ رہنے کے لیے خصوصی پیکج۔',
        price: 'روپے 12.00',
        details: ['4x 750ml کلاسک بوتلیں ہفتہ وار', 'ایکو فرینڈلی ڈیلیوری', 'کسی بھی وقت منسوخ کریں'],
      },
      family: {
        name: 'فیملی پیکج',
        desc: 'اپنے خاندان کی صحت اور تندرستی کے لیے بہترین منرل واٹر۔',
        price: 'روپے 38.00',
        details: ['12x 1L اسپورٹ/کلاسک بوتلیں ہفتہ وار', 'ترجیحی ہوم ڈیلیوری', 'مفت تنصیب کی سہولت'],
      },
      corporate: {
        name: 'کارپوریٹ پیکج',
        desc: 'دفاتر اور کارپوریٹ میٹنگز کے وقار میں اضافے کے لیے۔',
        price: 'روپے 120.00',
        details: ['48x 750ml شیشے کی بوتلیں ہفتہ وار', 'طے شدہ براہ راست ڈیلیوری', 'ڈسپنسر کی صفائی شامل ہے'],
      },
      weekly: {
        name: 'ہفتہ وار پیکج',
        desc: 'مختصر مدت کی تقریبات اور فعال ہفتوں کے لیے۔',
        price: 'روپے 15.00',
        details: ['6x 1L پریمیم بوتلیں', 'ایک بار کی ڈیلیوری', 'شیشہ واپسی کا اختیار'],
      },
      monthly: {
        name: 'ماہانہ سبسکرپشن',
        desc: 'روزمرہ کی آسانی کے لیے مستقل ماہانہ منرل واٹر سپلائی۔',
        price: 'روپے 49.00',
        details: ['24x 1L کلاسک بوتلیں ماہانہ', 'طے شدہ ترسیل', '10% سبسکرپشن ڈسکاؤنٹ شامل ہے'],
      },
      annual: {
        name: 'سالانہ الائٹ پاس',
        desc: 'سال بھر صحت اور ہائیڈریشن کا تحفظ۔ ہمارا بہترین انتخاب۔',
        price: 'روپے 450.00',
        details: ['300x 1L کلاسک بوتلیں سالانہ', 'لامحدود تبدیلیاں', 'خصوصی کسٹمر مینیجر'],
      },
    },
    calculator: {
      title: 'لوڈ ہائیڈریشن پلانر',
      subtitle: 'اپنی ضرورت کے مطابق ماہانہ پانی کے استعمال کا حساب لگائیں۔',
      bottleSize: 'بوتل کا سائز',
      bottlesPerWeek: 'بوتلیں فی ہفتہ',
      subLength: 'سبسکرپشن کی مدت',
      totalBottles: 'کل بوتلیں',
      totalPrice: 'کل قیمت',
      pricePerBottle: 'قیمت فی بوتل',
      regularPrice: 'عام ریٹ',
      plasticSaved: 'بچائی گئی پلاسٹک کی بوتلیں',
      deliveryFreq: 'ہم اس حجم پر ہر {days} دن بعد ڈیلیوری کی سفارش کرتے ہیں۔',
      cta: 'سبسکرپشن شروع کریں',
    },
    process: {
      title: 'قدرتی عمل',
      step1: { title: 'قدرتی زیر زمین چشمہ', desc: 'زمین کی گہرائیوں میں محفوظ اور خالص ترین چشمے سے حاصل کردہ۔' },
      step2: { title: 'قدرتی فلٹریشن', desc: 'دہائیوں تک پہاڑی چٹانوں کی تہوں سے قدرتی طور پر فلٹر شدہ۔' },
      step3: { title: 'کوالٹی اور ٹیسٹنگ', desc: 'بہترین منرل توازن کی تصدیق کے لیے لیبارٹریوں میں سخت جانچ۔' },
      step4: { title: 'پریمیم بوتلنگ', desc: 'پریمیم اور دیدہ زیب ری سائیکل ہونے والے شیشے کی بوتلوں میں پیکنگ۔' },
      step5: { title: 'براہِ راست ڈیلیوری', desc: 'ہمارے کاربن نیوٹرل لاجسٹکس کے ذریعے سیدھا آپ کے گھر۔' },
    },
    stats: {
      ph: 'بہترین پی ایچ لیول',
      glass: 'ری سائیکل شیشہ',
      microplastics: 'مائیکرو پلاسٹکس',
      minerals: 'فعال معدنیات',
    },
    testimonials: {
      tag: 'صارفین کی رائے',
      title: 'معزز صارفین کی پسند',
    },
    newsletter: {
      tag: 'معلومات کا سلسلہ',
      title: 'ہفتہ وار سائنس اور پالیسی',
      desc: 'پانی کے فوائد، صحت، خوبصورتی اور ڈبلیو ایچ او کی سفارشات پر مبنی معلوماتی مضامین۔',
      emailPlaceholder: 'اپنا ای میل درج کریں',
      button: 'رکن بنیں',
      success: 'ہفتہ وار معلوماتی سلسلے میں شامل ہونے کا شکریہ۔',
    },
    footer: {
      rights: 'جملہ حقوق محفوظ ہیں۔',
    },
    about: {
      title: 'ہماری کہانی',
      subtitle: 'روزمرہ پانی پینے کے تجربے کو نیا روپ دینا۔',
      intro: 'واٹلیس ایک پریمیم منرل واٹر برانڈ ہے جو ان لوگوں کے لیے بنایا گیا ہے جو پاکیزگی، خوبصورتی اور پائیداری کی قدر کرتے ہیں۔',
      storyTitle: 'آغاز',
      storyText1: 'ایک نئے وژن کے ساتھ قائم کیا گیا، واٹلیس پانی کو روزمرہ کی بنیادی ضرورت سے اٹھا کر ایک پرتعیش دسترخوان کا تجربہ بناتا ہے۔',
      storyText2: 'ہمارا پانی قدرتی اور خالص ترین زیر زمین چشموں سے حاصل کیا جاتا ہے، جہاں ارضیاتی تہیں قدرتی طور پر اسے معدنیات سے نوازتی ہیں۔',
      sourceTitle: 'پائیدار ذرائع',
      sourceText: 'ہم ماحولیاتی تحفظ کے سخت قوانین کے تحت کام کرتے ہیں، یہ یقینی بناتے ہوئے کہ ہم کبھی بھی ضرورت سے زیادہ وسائل کا استعمال نہ کریں۔',
    },
  },
};

type LanguageContextType = {
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  t: TranslationDict;
  isRtl: boolean;
};

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<'en' | 'ur'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('watlys_lang') as 'en' | 'ur';
    if (saved === 'en' || saved === 'ur') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: 'en' | 'ur') => {
    setLanguageState(lang);
    localStorage.setItem('watlys_lang', lang);
  };

  const isRtl = language === 'ur';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], isRtl }}>
      <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'font-urdu' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
