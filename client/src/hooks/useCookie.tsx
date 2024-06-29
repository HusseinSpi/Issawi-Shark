import { useState, useEffect } from "react";

const useCookie = (name: string): string | null => {
  const [cookie, setCookie] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (cookieName: string): string | null => {
      const nameEQ = cookieName + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");

      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === " ") {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }
      return null;
    };

    setCookie(getCookie(name));
  }, [name]);

  return cookie;
};

export default useCookie;
