import { useState } from "react";

export const getValidEmails = (emailInput) => {
  let result = [];
  if (!emailInput || emailInput.trim() === '') {
    return result;
  }
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  const emails = emailInput.trim().replace(/[;\s]/g, ',').split(',');

  for (let i = 0; i < emails.length; i++) {
    const e = emails[i];
    if (e === '') {continue;}

    if (regex.test(e)) {
      result.push(e);
    }
    else {
      result = [];
      break;
    }
  }
  
  return result;
}

export const getNameEmail = (value) => {
  if (!value) {return null;}
  
  const regex = /(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)/;
  let m, name, email;
  if ((m = regex.exec(value)) !== null) {
    email = m[2];
    name = m[1] || email.slice(0, email.indexOf("@"));
  }
  return { name, email };
}

export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}