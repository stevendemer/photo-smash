import { useEffect, useState } from "react";

export default function useStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }
    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
