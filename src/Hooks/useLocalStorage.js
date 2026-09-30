import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
      // If no value in localStorage, save the defaultValue if it's provided
      if (defaultValue !== undefined && defaultValue !== null) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  // Listen for storage events dispatched from any component on the page
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const value = localStorage.getItem(key);
        if (value !== null) {
          setLocalStorageValue(JSON.parse(value));
        } else {
          setLocalStorageValue(defaultValue);
        }
      } catch (error) {
        setLocalStorageValue(defaultValue);
      }
    };

    window.addEventListener("local-storage-update", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("local-storage-update", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, defaultValue]);

  const setLocalStorageStateValue = (valueOrFn) => {
    let newValue;
    if (typeof valueOrFn === "function") {
      newValue = valueOrFn(localStorageValue);
    } else {
      newValue = valueOrFn;
    }

    if (newValue === null || newValue === undefined || newValue === false) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }

    setLocalStorageValue(newValue);

    // Broadcast change to all mounted useLocalStorage hooks
    window.dispatchEvent(new Event("local-storage-update"));
  };

  return [localStorageValue, setLocalStorageStateValue];
};

export { useLocalStorage };
export default useLocalStorage;
