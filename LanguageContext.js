import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isTelugu, setIsTelugu] = useState(false);

  const toggleLanguage = () => {
    setIsTelugu(!isTelugu);
  };

  return (
    <LanguageContext.Provider value={{ isTelugu, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
