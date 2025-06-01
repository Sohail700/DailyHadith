import React, { useState } from "react";
import "./TopBar.css";

const TopBar = ({ title, number, hadiths, onHadithSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <svg
          className="top-bar-svg"
          viewBox="0 0 600 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="300"
            y="38"
            textAnchor="middle"
            fontFamily="'Amiri', serif"
            fontSize="28"
            fill="#e5e5dc"
          >
            {title}
            {number != null ? ` ${number}` : ""}
          </text>
        </svg>
        <button className="dropdown-button" onClick={toggleDropdown}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="#e5e5dc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {isDropdownOpen && (
        <div className="hadith-dropdown">
          <div className="hadith-list">
            {hadiths.map((hadith, index) => (
              <div
                key={index}
                className="hadith-item"
                onClick={() => {
                  onHadithSelect(index);
                  setIsDropdownOpen(false);
                }}
              >
                Hadith #{index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
