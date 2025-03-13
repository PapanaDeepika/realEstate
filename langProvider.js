import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';   
import i18n from './i18n';

 const AsyncStorageContext = createContext();

 export const AsyncStorageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale);
 

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    console.log("saved language", savedLanguage);
    // setSavedLanguage(savedLanguage);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  const changeLanguage = async (lang) => {
    i18n.locale = lang;

    console.log(lang);
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang);
  };


   useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <AsyncStorageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </AsyncStorageContext.Provider>
  );
};

export const useAsyncStorage = () => useContext(AsyncStorageContext);
