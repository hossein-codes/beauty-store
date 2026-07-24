"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


type Language = "fa" | "en";


interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}


const LanguageContext =
  createContext<LanguageContextType | null>(null);



export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [language, setLanguageState] =
    useState<Language>("fa");


  useEffect(() => {

    const saved =
      localStorage.getItem("language") as Language | null;


    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    }

  }, []);



  useEffect(() => {

    const html =
      document.documentElement;


    html.lang = language;

    html.dir =
      language === "fa"
        ? "rtl"
        : "ltr";


    localStorage.setItem(
      "language",
      language
    );


  }, [language]);



  function setLanguage(lang: Language) {

    setLanguageState(lang);

  }



  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL: language === "fa",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}



export function useLanguage(){

  const context =
    useContext(LanguageContext);


  if(!context){

    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );

  }


  return context;

}