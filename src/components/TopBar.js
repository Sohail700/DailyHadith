import React from "react";
import "./TopBar.css";

const TopBar = ({ title, number }) => (
  <div className="top-bar">
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
  </div>
);

export default TopBar;
