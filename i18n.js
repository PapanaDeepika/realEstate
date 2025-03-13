// import { I18n } from 'i18n-js';
// import { getLocales } from 'expo-localization';

// // Import translation files
// import en from './en.json';
// import te from './te.json';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Initialize i18n
// const i18n = new I18n({
//   en,
//   te
// });
// i18n.disableNestedLookup = true;

// // Set the locale based on the device's language code
// i18n.locale = getLocales()[0].languageCode;


// const getStoredLanguage = async () => {
//   const savedLang = await AsyncStorage.getItem('language');
//   if (savedLang) {
//     i18n.locale = savedLang;
//   } else {
//     // Default to system language
//     const deviceLanguage = getLocales()[0].languageCode;
//     i18n.locale = deviceLanguage === 'en' ? 'en' : 'te';  // Default to 'en' or 'tn'
//   }
// };

// // Set language on app load
// getStoredLanguage();

// export default i18n;


import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import en from './en.json';
import te from './te.json';

// Initialize i18n
const i18n = new I18n({ en, te });

// Function to replace dots dynamically before translation
const translateKey = (key, options) => {
  const safeKey = key.replace(/\./g, "_"); // Replace dots with underscores
  return i18n.t(safeKey, options);
};

// Set the locale based on the device's language code
i18n.locale = getLocales()[0].languageCode;

const getStoredLanguage = async () => {
  const savedLang = await AsyncStorage.getItem('language');
  if (savedLang) {
    i18n.locale = savedLang;
  } else {
    const deviceLanguage = getLocales()[0].languageCode;
    i18n.locale = deviceLanguage === 'en' ? 'en' : 'te';
  }
};

// Set language on app load
getStoredLanguage();

export { translateKey };
export default i18n;
