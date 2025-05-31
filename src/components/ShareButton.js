import React from "react";
import "./ShareButton.css";

const ShareButton = ({ surahName, surahNumber }) => {
  const handleShare = async () => {
    const shareData = {
      title: `Surah ${surahName}`,
      text: `Check out Surah ${surahName} (Quran ${surahNumber})!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n${shareData.url}`
      );
      alert("Link copied to clipboard!");
    }
  };
  return (
    <button className="share-button" onClick={handleShare}>
      Share
    </button>
  );
};

export default ShareButton;
