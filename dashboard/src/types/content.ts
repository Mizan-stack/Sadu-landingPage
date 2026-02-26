/**
 * Firestore content types – exact match for docs/FIRESTORE_SCHEMA.md.
 * Path: sites/sdu-boutique/config (single document).
 */

// --- Helper interfaces (for reuse) ---

export interface NavItem {
  id?: string;
  label: string;
  target: string;
  route?: string;
}

export interface HeroSlide {
  imageUrl: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface CardItem {
  title: string;
  imageUrl: string;
  description: string;
}

export interface DestinationCard {
  name: string;
  imageUrl: string;
  description: string;
}

export interface HeritageImage {
  imageUrl: string;
}

// --- Global ---

export interface GlobalContent {
  logoUrl: string;
  sidebarLogoUrl?: string;
  phone: string;
  bookNowText: string;
  bookNowLink: string;
  copyrightText?: string;
  nav: Array<{ id?: string; label: string; target: string; route?: string }>;
}

// --- Home sections ---

export interface HeroSection {
  title: string;
  slides: HeroSlide[];
  stats: HeroStat[];
  hotelCardText: string;
}

export interface HadaraSection {
  titleIconUrl: string;
  ornamentUrl: string;
  introText: string;
  heading: string;
  body: string;
  mainImageUrl: string;
  smallImageUrl: string;
  patternImageUrl: string;
}

export interface ExperienceSection {
  heading: string;
  description: string;
  backgroundImageUrl: string;
  cards: CardItem[];
}

export interface IdentitySection {
  heading: string;
  body: string;
  mainImageUrl: string;
  patternImageUrl: string;
}

export interface DestinationsSection {
  heading: string;
  cards: DestinationCard[];
}

export interface HeritageSection {
  heading: string;
  body: string;
  ornamentUrl: string;
  images: HeritageImage[];
}

export interface VisionSection {
  heading: string;
  body: string;
  mainImageUrl: string;
  smallImageUrl: string;
  patternImageUrl: string;
}

export interface MassageSection {
  heading: string;
  body: string;
  mainImageUrl: string;
  smallImageUrl: string;
}

export interface RoomSection {
  heading: string;
  description: string;
  backgroundImageUrl: string;
  ornamentUrl: string;
  cards: CardItem[];
}

export interface FooterSection {
  heading: string;
  body: string;
  backgroundImageUrl: string;
  bookNowText: string;
}

export interface HomeContent {
  hero: HeroSection;
  hadara: HadaraSection;
  experience: ExperienceSection;
  identity: IdentitySection;
  destinations: DestinationsSection;
  heritage: HeritageSection;
  vision: VisionSection;
  massage: MassageSection;
  room: RoomSection;
  footer: FooterSection;
}

// --- Contact ---

export interface ContactFormPlaceholders {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactForm {
  nameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitText: string;
  placeholders: ContactFormPlaceholders;
}

export interface ContactContent {
  title: string;
  intro: string;
  sideImageUrl: string;
  form: ContactForm;
}

// --- Site config (top-level document) ---

export interface SiteConfig {
  global: GlobalContent;
  home: HomeContent;
  contact: ContactContent;
}

// --- Constants ---

/** Firestore document path (collection/document/collection/document). */
export const CONFIG_PATH = 'sites/sdu-boutique/config/main';

export const SECTION_IDS = [
  'hero',
  'hadara',
  'experience',
  'identity',
  'destinations',
  'heritage',
  'vision',
  'massage',
  'room',
  'footer',
] as const;

export const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero / البطل',
  hadara: 'Hadara / حضارة',
  experience: 'Experience / التجربة',
  identity: 'Identity / الهوية',
  destinations: 'Destinations / الوجهات',
  heritage: 'Heritage / التراث',
  vision: 'Vision / الرؤية',
  massage: 'Message / الرسالة',
  room: 'Values / القيم',
  footer: 'Footer / التذييل',
};

export const SECTION_DESCRIPTIONS: Record<string, string> = {
  hero: 'Slider images, main title, statistics',
  hadara: 'Brand intro, images, pattern background',
  experience: 'Parallax banner, experience cards',
  identity: 'Brand identity text and image',
  destinations: 'Hotel destination cards',
  heritage: 'Cultural heritage gallery',
  vision: 'Brand vision statement',
  massage: 'Brand message statement',
  room: 'Values banner and value cards',
  footer: 'Call-to-action and booking',
};
