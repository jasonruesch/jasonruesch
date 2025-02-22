import { useState } from "react";

export const useSessionStorage = (key: string, initialValue: boolean) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setItem = (newValue: boolean) => {
    try {
      setValue(newValue);
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setItem] as const;
};
