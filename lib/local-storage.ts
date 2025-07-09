// ----------------------------------------------------------------------

export function localStorageAvailable() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const key = "__some_random_key_you_are_not_going_to_use__";
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function localStorageGetItem(key: string, defaultValue = "") {
  const storageAvailable = localStorageAvailable();

  let value;

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value;
}
// ----------------------------------------------------------------------

export function getStorage(key: string) {
  try {
    const result = localStorageGetItem(key);

    if (result) {
      return JSON.parse(result);
    }
  } catch (error) {
    console.log("Error while getting from storage:", error);
  }

  return null;
}

export function setStorage<T>(key: string, value: T) {
  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.log("Error while setting storage:", error);
  }
}

export function removeStorage(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error("Error while removing from storage:", error);
  }
}
