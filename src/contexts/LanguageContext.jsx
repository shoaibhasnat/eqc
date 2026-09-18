'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import websiteContent from '../components/user/contentFiles/WebsiteContent.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Start with English on server and the first client render so hydration matches.
  // Saved language is restored in useEffect, while the original loader is still showing.
  const [lang, setLang] = useState('en');
  const [content, setContent] = useState(websiteContent.en);
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(false);

  // SSR and first paint always include English content so crawlers and AI agents
  // can read the page. Restore a saved language after mount without a blocking loader.
  useEffect(() => {
    const savedLang = localStorage.getItem('websiteLanguage');
    const langToUse = (savedLang === 'en' || savedLang === 'ur') ? savedLang : 'en';

    setLang(langToUse);
    setContent(websiteContent[langToUse] || websiteContent.en);
    document.documentElement.dir = 'ltr';
    isMountedRef.current = true;
  }, []);

  // Handle language changes (after initial mount)
  useEffect(() => {
    // Skip on initial mount
    if (!isMountedRef.current) return;

    // Update content when language changes
    if (lang === 'ur') {
      setContent(websiteContent.ur);
    } else {
      setContent(websiteContent.en);
    }

    // Keep direction always LTR for all languages
    document.documentElement.dir = 'ltr';

    localStorage.setItem('websiteLanguage', lang);
  }, [lang]);

  const changeLanguage = (newLang) => {
    setLoading(true);
    setLang(newLang);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <LanguageContext.Provider value={{ lang, content, changeLanguage, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};
