// src/hooks/useDebounce.js (Create this file)

import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  // State to store debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set a timeout to update the debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cleanup function:
      // This will be called if `value` changes (typing) or the component unmounts.
      // It clears the previous timeout, ensuring only the last one fires.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-run the effect if value or delay changes
    // You want to re-run it when the input value changes
    // but not when the debouncedValue itself changes (which this hook manages)
    [value, delay]
  );

  return debouncedValue;
}

export default useDebounce;