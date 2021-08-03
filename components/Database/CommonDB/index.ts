import { PRODUCT_NAME } from "../../../consts";

export default class CommonDB {
  private storage: Storage | null = null;

  private prefix = PRODUCT_NAME;

  protected set Storage(storage: Storage) {
    this.storage = storage;
  }

  protected get Storage(): Storage {
    if (this.storage === null) {
      throw new Error("CommonDB: you did not specify a storage.");
    }
    return this.storage;
  }

  protected set Prefix(prefix: string) {
    this.prefix = prefix;
  }

  protected get Prefix(): string {
    return this.prefix;
  }

  private k(key: string): string {
    return `${this.prefix}.${key}`;
  }

  get(key: string): string | null {
    return this.Storage.getItem(this.k(key));
  }

  set(key: string, value: string): CommonDB {
    this.Storage.setItem(this.k(key), value);
    return this;
  }

  remove(key: string): CommonDB {
    this.Storage.removeItem(this.k(key));
    return this;
  }

  getObj<T>(key: string, typeChecker?: (v: unknown) => v is T): T | null {
    const item = this.get(key);

    if (item) {
      const parsedItem: unknown = JSON.parse(item);
      if (!typeChecker || typeChecker(parsedItem)) {
        return parsedItem as T;
      }
    }

    return null;
  }

  setObj(key: string, value: unknown): CommonDB {
    this.set(key, JSON.stringify(value));
    return this;
  }
}
