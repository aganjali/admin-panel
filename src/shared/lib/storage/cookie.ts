/* eslint-disable @typescript-eslint/no-unused-vars */
import Cookies from "js-cookie";
import { StorageBase } from "./storage-base";

/**
 * A cookie-based storage implementation that extends the generic Storage class.
 * It uses the 'js-cookie' library and a custom converter for robust serialization.
 */
export class CookieStorage extends StorageBase {
  /**
   * The js-cookie API instance configured with a general-purpose converter.
   * @private
   */
  private api: Cookies.CookiesStatic<any>;

  constructor() {
    super();

    // Initialize js-cookie with a custom converter. Since the generic type is now
    // at the method level, this converter must handle values of `any` type.
    this.api = Cookies.withConverter<any>({
      write: (value: any): string => {
        console.log({ value });
        // Handle objects and arrays by serializing them to a JSON string.
        if (typeof value === "object" && value !== null) {
          try {
            return JSON.stringify(value);
          } catch (e) {
            console.error(e);
            // In the unlikely event of a circular reference, return an empty string.
            return "";
          }
        }
        // For primitives (string, number, boolean), convert them directly to a string.
        return String(value);
      },

      /**
       * The 'read' converter deserializes the string from the cookie.
       * It returns `any` because the specific type is not known at this stage.
       */
      read: (value: string): any => {
        try {
          // Attempt to parse the value as JSON. This will correctly handle
          // values that were originally objects, arrays, numbers, or booleans.
          return JSON.parse(value);
        } catch (e) {
          // If parsing fails, it's a plain string that was not JSON-serialized.
          return value;
        }
      },
    });
  }

  /**
   * Checks if cookies are available and enabled in the browser.
   * @returns {boolean}
   */
  public isAvailable(): boolean {
    return typeof window !== "undefined" && navigator.cookieEnabled;
  }

  /**
   * Retrieves and deserializes a value from a cookie.
   * @template T The expected type of the returned value.
   * @param {string} key The name of the cookie.
   * @returns {T | null} The deserialized value cast to type T, or null if not found.
   */
  public get<T>(key: string): T | null {
    if (!this.isAvailable()) return null;

    // The configured 'read' converter returns the parsed value as `any`.
    const value = this.api.get(key);

    // js-cookie returns undefined for missing cookies. We convert it to null.
    if (value === undefined) {
      return null;
    }

    // The caller is responsible for providing the correct type `T`.
    // We cast the `any` value returned by the converter to `T`.
    return value as T;
  }

  /**
   * Serializes and sets a value in a cookie.
   * @template T The type of the value being stored.
   * @param {string} key The name of the cookie.
   * @param {T} value The value to store.
   * @param {CookieAttributes} [options] Options for the cookie (e.g., expires, path).
   */
  public set<T>(
    key: string,
    value: T,
    options?: Cookies.CookieAttributes
  ): void {
    if (!this.isAvailable()) return;
    // The `value` (of type T) is passed to the `api.set` method.
    // js-cookie then passes it to our 'write' converter, which correctly serializes it.
    this.api.set(key, value, options);
  }

  /**
   * Removes a cookie.
   * @param {string} key The name of the cookie.
   * @param {CookieAttributes} [options] Options for the cookie (e.g., path).
   */
  public remove(key: string, options?: Cookies.CookieAttributes): void {
    if (!this.isAvailable()) return;
    this.api.remove(key, options);
  }
}
export const cookie = new CookieStorage();
