import React from "react";
import "./TranslationSelector.css";

const TranslationSelector = ({ language, onChange }) => (
  <div className="translation-selector">
    <select value={language} onChange={(e) => onChange(e.target.value)}>
      <option value="en">English</option>
      <option value="ur">Urdu</option>
    </select>
  </div>
);

export default TranslationSelector;
