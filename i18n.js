import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import te from './locales/te.json';

const i18n = new I18n({
  en,
  te
});

i18n.locale = Localization.locale.startsWith('te') ? 'te' : 'en';
console.log("DEEpu", Localization.locale.startsWith('te'), i18n.locale)
i18n.enableFallback = true;

export default i18n;
