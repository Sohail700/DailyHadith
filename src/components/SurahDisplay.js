import React from "react";
import "./SurahDisplay.css";

const SurahDisplay = ({ arabicVerses, translationVerses }) => (
  <div className="surah-display">
    {arabicVerses.map((verse, idx) => (
      <div key={idx} className="verse-block">
        <div className="arabic-verse">{verse}</div>
        <div className="translation-verse">{translationVerses[idx]}</div>
      </div>
    ))}
  </div>
);

export default SurahDisplay;
