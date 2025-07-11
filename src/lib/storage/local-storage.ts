import { StorageBase } from "./storage-base";

/**
 * A LocalStorage-based storage implementation that extends the generic Storage class.
 */
export class LocalStorage extends StorageBase {
  constructor() {
    super();
  }

  /**
   * Checks if LocalStorage is available and enabled in the browser.
   * @returns {boolean}
   */
  public isAvailable(): boolean {
    if (typeof window === "undefined") return false;
    try {
      const testKey = "__storage_test__";
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Retrieves and deserializes a value from LocalStorage.
   * @template T The expected type of the returned value.
   * @param {string} key The key of the item.
   * @returns {T | null} The deserialized value cast to type T, or null if not found.
   */
  public get<T>(key: string): T | null {
    if (!this.isAvailable()) return null;

    const value = window.localStorage.getItem(key);
    if (value === null) {
      return null;
    }

    try {
      // Attempt to parse JSON first to handle objects, arrays, numbers, etc.
      return JSON.parse(value) as T;
    } catch (e) {
      console.error("Error while getting storage:", e);
      // If it's not valid JSON, it must be a plain string.
      return null;
    }
  }

  /**
   * Serializes and sets a value in LocalStorage.
   * @template T The type of the value being stored.
   * @param {string} key The key of the item.
   * @param {T} value The value to store.
   */
  public set<T>(key: string, value: T): void {
    if (!this.isAvailable()) return;

    // Serialize objects to JSON strings; otherwise, store as a plain string.
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error while setting storage:", e);
    }
  }

  /**
   * Removes an item from LocalStorage.
   * @param {string} key The key of the item to remove.
   */
  public remove(key: string): void {
    if (!this.isAvailable()) return;
    window.localStorage.removeItem(key);
  }
}
export const localStorage = new LocalStorage();
