import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './data/locales';

i18n
    // Detekce jazyka prohlížeče (automaticky nastaví CS nebo EN)
    .use(LanguageDetector)
    // Propojení s Reactem
    .use(initReactI18next)
    // Inicializace
    .init({
        resources,
        fallbackLng: 'cs', // Pokud jazyk nenajde, použije češtinu
        interpolation: {
            escapeValue: false, // React už ošetřuje XSS, takže toto můžeme vypnout
        }
    });

export default i18n;