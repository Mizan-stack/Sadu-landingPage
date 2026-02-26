/**
 * Seed sites/sdu-boutique/config with full website content.
 * Schema: docs/FIRESTORE_SCHEMA.md — types: dashboard/src/types/content.ts
 * Run: cd dashboard && npx tsx scripts/seed-config.ts
 * Requires: GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON) or gcloud auth.
 */
import 'dotenv/config';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import type { SiteConfig } from '../src/types/content';
import { CONFIG_PATH } from '../src/types/content';

const ASSETS = {
  images: (name: string) => `/assets/images/${name}`,
  icons: (name: string) => `/assets/icons/${name}`,
};

function buildSeedData(): SiteConfig {
  return {
    global: {
      logoUrl: ASSETS.icons('main-title.png'),
      sidebarLogoUrl: ASSETS.icons('main-title-3.png'),
      phone: '920033780',
      bookNowText: 'احجز الآن',
      bookNowLink: 'https://booking.zaaer.co/sdu-almadina',
      copyrightText: '2026 © جميع الحقوق محفوظة سدو بوتيك',
      nav: [
        { id: 'hero', label: 'الرئيسية', target: '#hero' },
        { id: 'experience', label: 'التجربة', target: '#experience' },
        { id: 'destinations', label: 'الوجهات', target: '#destinations' },
        { id: 'heritage', label: 'الثقافة', target: '#heritage' },
        { id: 'start-story', label: 'الحجوزات', target: '#start-story' },
        { id: 'contact', label: 'تواصل معنا', target: '#contact', route: '/contact' },
      ],
    },
    home: {
      hero: {
        title: 'اختبر الرفاهية كما\nيجب أن تكون',
        slides: [
          { imageUrl: ASSETS.images('hero.png') },
          { imageUrl: ASSETS.images('bg-10.png') },
          { imageUrl: ASSETS.images('bg-11.png') },
        ],
        stats: [
          { value: '24/7', label: 'خدمة ضيوف مخصصة' },
          { value: '233+', label: 'غرفة وجناح' },
          { value: '5', label: 'وجهة بوتيكية' },
        ],
        hotelCardText: 'فنادقنا',
      },
      hadara: {
        titleIconUrl: ASSETS.icons('main-title-2.png'),
        ornamentUrl: ASSETS.icons('fram.png'),
        introText:
          'علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nعلامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.',
        heading: 'هوية نعتز بها',
        body:
          'علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nتحت مظلة علامة سدو، تتجسد التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة التي تلامس خصوصية الضيف وتمنحه شعورًا حقيقيًا بالترحيب والانتماء.',
        mainImageUrl: ASSETS.images('bg-1.png'),
        smallImageUrl: ASSETS.images('bg-2.png'),
        patternImageUrl: ASSETS.images('bg-3.png'),
      },
      experience: {
        heading: 'على الرحب والقلب\nأوسع من الدار',
        description:
          'علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nفلسفة سدو في كمال التفاصيل بدأت من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة.',
        backgroundImageUrl: ASSETS.images('bg-4.png'),
        cards: [
          {
            title: 'إقامة متفردة',
            description:
              'خصوصية تامة تحيط بكم وتصميم يعكس الطابع الأصيل والرفاهية.',
            imageUrl: ASSETS.images('bg-5.png'),
          },
          {
            title: 'كرم الضيافة',
            description:
              'خدمة تُقدَّم بشغف، تُعنى بالتفاصيل لتمنحكم تجربة لا تُنسى.',
            imageUrl: ASSETS.images('bg-6.png'),
          },
          {
            title: 'جودة السكن',
            description:
              'مساحات ورفاهية عصرية صُممت لتأخذ بكم إلى أقصى درجات الراحة.',
            imageUrl: ASSETS.images('bg-7.png'),
          },
          {
            title: 'رحابة الاستقبال',
            description:
              'فريق محترف يستقبلكم بروح الضيافة السعودية الأصيلة.',
            imageUrl: ASSETS.images('bg-8.png'),
          },
        ],
      },
      identity: {
        heading: 'هويتنا أصل ضيافتنا',
        body:
          'نستمد من عمق التراث السعودي فنون الضيافة الأصيلة، لتجربة فندقية تعكس هويتنا وتمنح ضيوفنا لحظات إقامة لا تُنسى بتجربة وروح سعودية خالصة.\n\nيجمع نموذجنا الفندقي بين مرونة الابتكار ودقة التنفيذ عبر اعتماد أرقى الممارسات التي تحقق النجاح لشركائنا وتمنح ضيوفنا أعلى معايير جودة الإقامة.',
        mainImageUrl: ASSETS.images('bg-9.png'),
        patternImageUrl: ASSETS.images('bg-3.png'),
      },
      destinations: {
        heading: 'اختر وجهتك',
        cards: [
          {
            name: 'سدو بوتيك الخبر',
            description: 'مساحة مصممة للهدوء وخصوصية الإقامة.',
            imageUrl: ASSETS.images('bg-11.png'),
          },
          {
            name: 'سدو بوتيك الرياض',
            description:
              'مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة.',
            imageUrl: ASSETS.images('bg-8.png'),
          },
          {
            name: 'سدو بوتيك المدينة',
            description:
              'مساحة مصممة للهدوء حيث يلتقي التصميم المعاصر مع خصوصية الإقامة.',
            imageUrl: ASSETS.images('bg-10.png'),
          },
        ],
      },
      heritage: {
        heading: 'ثقافة تاريخية',
        body:
          'علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\n\nتُجسد فلسفة سدو في كمال التفاصيل بدءًا من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة، لتكون العلامة التي تمنح الضيف شعورًا حقيقيًا بالترحيب والانتماء.',
        ornamentUrl: ASSETS.icons('fram.png'),
        images: [
          { imageUrl: ASSETS.images('bg-12.png') },
          { imageUrl: ASSETS.images('bg-13.png') },
          { imageUrl: ASSETS.images('bg-14.png') },
        ],
      },
      vision: {
        heading: 'رؤيتنا',
        body:
          'أن تكون الوجهة الملهمة في قطاع الضيافة، عبر تقديم تجربة إقامة ترتكز على الاعتزاز بإرثنا الأصيل، وتجسد وعدنا الدائم لضيوفنا بأعلى معايير الجودة.',
        mainImageUrl: ASSETS.images('bg-16.png'),
        smallImageUrl: ASSETS.images('bg-15.png'),
        patternImageUrl: ASSETS.images('bg-3.png'),
      },
      massage: {
        heading: 'رسالتنا',
        body:
          'تقديم تجربة ضيافة متكاملة، تنبع من روح السعودية، بأسلوب يجمع بين حفاوة المكان وطمأنينة الإقامة ليجد ضيوفنا في رحابنا ألفة الدار وفخامة الوجهة.',
        mainImageUrl: ASSETS.images('bg-8.png'),
        smallImageUrl: ASSETS.images('bg-6.png'),
      },
      room: {
        heading: 'قيمنا تنسج هويتنا في الضيافة',
        description:
          'علامة ضيافة سعودية تأسست لترتقي بمفهوم الإقامة الفندقية، مستلهمين من فن السدو دقة نسيجه، ومن الأرض السعودية ثباتها وعمقها.\nفلسفة سدو في كمال التفاصيل بدأت من التصاميم المكانية التي تروي قصص الأصالة، وصولًا إلى تجربة إقامة عصرية متفردة.',
        backgroundImageUrl: ASSETS.images('bg-4.png'),
        ornamentUrl: ASSETS.icons('fram.png'),
        cards: [
          {
            title: 'الأصالة',
            description:
              'إرث نعتز به، وحكاية أصالة سعودية تتجلى في التفاصيل ',
            imageUrl: ASSETS.images('bg-16.png'),
          },
          {
            title: 'الكرم',
            description: 'حفاوة تفيض بالود والترحاب، وتجسد جود الضيافة',
            imageUrl: ASSETS.images('bg-17.png'),
          },
          {
            title: 'التفرد',
            description:
              'إرث نعتز به، وحكاية أصالة سعودية تتجلى في التفاصيل ',
            imageUrl: ASSETS.images('bg-18.png'),
          },
          {
            title: 'الطموح',
            description:
              'نبتكر آفاقًا جديدة للضيافة السعودية تجمع بين طموحنا ورؤية 2030.',
            imageUrl: ASSETS.images('bg-8.png'),
          },
        ],
      },
      footer: {
        heading: 'ابدأ قصتك في\nسدو',
        body:
          'هنا لا تقيم، بل تعيش تجربة مصممة لتشبهك. كل تفصيل، كل ضوء، وكل مساحة خُلقت لتمنحك شعورًا بالانتماء لا يمكن تكراره.',
        backgroundImageUrl: ASSETS.images('bg-11.png'),
        bookNowText: 'احجز الآن',
      },
    },
    contact: {
      title: 'للتواصل مع سدو بوتيك',
      intro:
        'كل تواصل معنا هو بداية تجربة مصممة بعناية. يسعدنا أن نكون على تواصل معك، شاركنا استفساراتك أو خططك للإقامة، ودع فريق سدو يعتني بكل التفاصيل لنمنحك تجربة راقية ومطمئنة.',
      sideImageUrl: ASSETS.images('bg-8.png'),
      form: {
        nameLabel: 'الاسم',
        phoneLabel: 'رقم الجوال',
        emailLabel: 'بريدك الإلكتروني',
        messageLabel: 'الرسالة',
        submitText: 'أرسل',
        placeholders: {
          name: 'مثال: محمد أمين',
          phone: 'مثال: 1256 123 961',
          email: 'username@example.com',
          message: 'اكتب ما يأتي في خاطرك',
        },
      },
    },
  };
}

async function main(): Promise<void> {
  if (getApps().length === 0) {
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (keyPath) {
      initializeApp({ credential: cert(keyPath) });
    } else {
      initializeApp();
    }
  }

  const db = getFirestore();
  const data = buildSeedData();

  try {
    await db.doc(CONFIG_PATH).set(data, { merge: true });
    console.log('Seeded config at', CONFIG_PATH);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

main();
