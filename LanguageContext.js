// import React, { createContext, useState } from 'react';

// export const LanguageContext = createContext();

// export const LanguageProvider = ({ children }) => {
//   const [isTelugu, setIsTelugu] = useState(false);

//   const toggleLanguage = () => {
//     setIsTelugu(!isTelugu);
//   };

//   return (
//     <LanguageContext.Provider value={{ isTelugu, toggleLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };


import React, { createContext, useState } from 'react';
import i18n from './i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isTelugu, setIsTelugu] = useState(i18n.locale === 'te'); // false
console.log("DEepikaaaaaaaaaaaaaaaaaaaaaaa", isTelugu)
  const toggleLanguage = () => {
    console.log(isTelugu,"fghg")
    const newLocale = isTelugu ? 'en' : 'te';
    i18n.locale = newLocale;
    setIsTelugu(newLocale === 'te');
  };


  


  return (
    <LanguageContext.Provider value={{ isTelugu, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
