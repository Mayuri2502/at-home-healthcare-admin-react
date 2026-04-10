import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from '../locales/en/common.json';
import frCommon from '../locales/fr/common.json';

// Define resources
const resources = {
  en: {
    common: enCommon
  },
  fr: {
    common: frCommon
  }
};

// Clear any existing language settings
localStorage.removeItem('i18nextLng');

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    lng: 'en', // Force initial language to English
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: [], // Disable caching to force fresh detection
    },
    
    ns: ['common'], // Default namespace
    defaultNS: 'common',
    
    react: {
      useSuspense: false,
    }
  });

export default i18n;
