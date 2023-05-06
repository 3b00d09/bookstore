import { useState, useEffect } from 'react';

const CookieNotice = () => {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowNotice(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowNotice(false);
  };

  return (
    <>
      {showNotice && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 py-4 px-6 text-center text-sm shadow-md z-50">
          <p>
            We use cookies to improve your browsing experience and to provide personalised recommendations. By continuing to use our website, you agree to our{' '}
            <a className = "text-blue-600 font-medium" href="/privacy">Privacy Policy</a> and <a className = "text-blue-600 font-medium"
            href="/cookies">Cookie Policy</a>.
          </p>
          <button className = "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md" onClick={acceptCookies}>Accept</button>
        </div>
      )}
    </>
  );
};

export default CookieNotice;