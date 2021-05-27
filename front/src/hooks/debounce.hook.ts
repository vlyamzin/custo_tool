import {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash-es";

export function useDebounce<T>(action: (value: T) => any, initialValue: T, time: number) {
  const [inputText, setInputText] = useState(initialValue);

  const updateValue = () => {
    action(inputText);
  }

  const delay = useCallback(debounce(updateValue, time), [inputText]);

  useEffect(() => {
    delay();
    // Cancel the debounce on useEffect cleanup.
    return delay.cancel;
  }, [inputText, delay]);

  return {
    inputText,
    setInputText
  };
}
