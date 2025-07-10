/**
 * An abstract class representing a generic key-value storage system.
 * This defines the contract that all storage implementations must follow.
 */
export abstract class StorageBase {
  /**
   * Checks if the storage mechanism is available and enabled in the current environment.
   * @returns {boolean} True if storage is available, otherwise false.
   */
  abstract isAvailable(): boolean;

  /**
   * Retrieves a value from storage by its key.
   * The type of the expected value must be passed as a generic parameter.
   * @template T The expected data type of the value to be retrieved.
   * @param {string} key The key of the item to retrieve.
   * @returns {T | null} The retrieved value, cast to type T, or null if not found.
   */
  abstract get<T>(key: string): T | null;

  /**
   * Sets a value in storage with a specified key.
   * The type of the value is inferred from the `value` argument.
   * @template T The data type of the value to store.
   * @param {string} key The key of the item to set.
   * @param {T} value The value to store.
   * @param {any} [options] Optional configuration for the storage (e.g., cookie attributes).
   */
  abstract set<T>(key: string, value: T, options?: any): void;

  /**
   * Removes a value from storage by its key.
   * @param {string} key The key of the item to remove.
   * @param {any} [options] Optional configuration for the removal (e.g., cookie attributes).
   */
  abstract remove(key: string, options?: any): void;
}
