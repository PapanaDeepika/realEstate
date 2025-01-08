// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from '../realEstate/en.json';
import teTranslation from '../realEstate/te.json';

i18n
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      te: {
        translation: teTranslation,
      },
    },
    detection: {
        order: ['system', 'localStorage', 'navigator'],
        caches: ['localStorage'], // Cache language preference in AsyncStorage or MMKV
      },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation is not available
    interpolation: {
      escapeValue: false, // React already escapes variables
    },
  });

export default i18n;
