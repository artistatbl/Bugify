"use client";
import React, { useState, useEffect } from 'react';

const CookieConsentPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = document.cookie.split('; ').find(row => row.startsWith('user-consent='));
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    document.cookie = "user-consent=accepted; path=/; max-age=" + 60 * 60 * 24 * 365; // Expires in 365 days
    setShowPopup(false);
  };

  const handleDecline = () => {
    // Optionally, handle the decline action, such as by setting a cookie to remember the choice.
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 md:bottom-5 md:right-5 lg:bottom-10 lg:right-10  bg-white p-5 rounded-lg shadow-xl border border-black dark:border-blue-300  shadow-black/50 z-50 mx-5 md:mx-0">
        <p className="text-xs sm:text-sm md:text-sm lg:text-md text-gray-700">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
      <div className="flex justify-center md:justify-start mt-4">
        <button onClick={handleAccept} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l cursor-pointer mr-2">Accept</button>
        <button onClick={handleDecline} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r cursor-pointer">Decline</button>
      </div>
    </div>
  );
};

export default CookieConsentPopup;