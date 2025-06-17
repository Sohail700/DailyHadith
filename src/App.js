import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import SurahDisplay from "./components/SurahDisplay";
import TranslationSelector from "./components/TranslationSelector";
import ShareButton from "./components/ShareButton";
import "./App.css";

const HADITH_API_BASE =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/";
const HADITH_COLLECTION = "bukhari";
const LANG_CODES = { en: "eng", ur: "urd", ar: "ara" };

function getRandomHadithIndex(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [hadith, setHadith] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [totalHadith, setTotalHadith] = useState(0);
  const [hadithIndex, setHadithIndex] = useState(0);
  const [allHadiths, setAllHadiths] = useState([]);

  // Fetch hadith counts and a random hadith
  const fetchHadith = async (lang = language, index = null) => {
    setLoading(true);
    try {
      // Fetch Arabic and translation hadith lists
      const [arabicRes, transRes] = await Promise.all([
        fetch(
          `${HADITH_API_BASE}${LANG_CODES["ar"]}-${HADITH_COLLECTION}.json`
        ),
        fetch(
          `${HADITH_API_BASE}${LANG_CODES[lang]}-${HADITH_COLLECTION}.json`
        ),
      ]);
      const arabicData = await arabicRes.json();
      const transData = await transRes.json();
      const max = arabicData.hadiths.length;

      // Store all hadiths for the dropdown
      setAllHadiths(arabicData.hadiths);

      // Use provided index or generate random one
      const idx = index !== null ? index : getRandomHadithIndex(max);
      setHadith(arabicData.hadiths[idx]);
      setTranslation(transData.hadiths[idx]);
      setTotalHadith(max);
      setHadithIndex(idx);
    } catch (e) {
      setHadith(null);
      setTranslation(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHadith(language);
    // eslint-disable-next-line
  }, [language]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleNewHadith = () => {
    fetchHadith(language);
  };

  const handleHadithSelect = (index) => {
    fetchHadith(language, index);
  };

  return (
    <div className="app-container">
      <TopBar
        title={"Sahih Bukhari"}
        number={hadith && hadith.number ? hadith.number : undefined}
        hadiths={allHadiths}
        onHadithSelect={handleHadithSelect}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : hadith && translation ? (
        <>
          <SurahDisplay
            arabicVerses={[hadith.text]}
            translationVerses={[translation.text]}
          />
          <div className="bottom-bar">
            <span className="quran-ref">Sahih Bukhari {hadith.number}</span>
            <button className="new-surah-btn" onClick={handleNewHadith}>
              New Hadith
            </button>
          </div>
          <ShareButton
            surahName={`Sahih Bukhari ${hadith.number}`}
            surahNumber={hadith.number}
          />
        </>
      ) : (
        <div className="error">Failed to load Hadith. Try again.</div>
      )}
      <TranslationSelector
        language={language}
        onChange={handleLanguageChange}
      />
      <div className="bottom-bar">
        <a
          style={{ textDecoration: "none", color: "white" }}
          "
        >
          By S khan 
        </a>
      </div>
    </div>
  );
}

export default App;
