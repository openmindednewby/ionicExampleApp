import { Injectable } from '@angular/core';

interface ObjectStoreParameters {
  name: ObjectStoreNames;
  objectStoreParameters: IDBObjectStoreParameters;
}

interface ObjectStores {
  pictures: ObjectStoreParameters;
}

export enum ObjectStoreNames {
  Pictures = 'pictures',
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBDatabase | null = null;
  private dbName = 'IonicExampleDB';
  private dbVersion = 1;
  private objectStores: ObjectStores = {
    pictures: {
      name: ObjectStoreNames.Pictures,
      objectStoreParameters: {
        keyPath: 'id',
        autoIncrement: true
      }
    },
  };

  constructor() {
    this.initialize();
  }
  public async addItem<T>(record: T, objectStoreName: ObjectStoreNames): Promise<void> {
    if (!this.db) {
      console.error('Database is not initialized');
      return;
    }

    const transaction = this.db.transaction([objectStoreName], 'readwrite');
    const objectStore = transaction.objectStore(objectStoreName);
    const request = objectStore.add(record);

    request.onsuccess = () => {
      console.log('Item added to the store', request.result);
    };

    request.onerror = (event) => {
      console.error('Add item error:', (event.target as IDBRequest).error);
    };
  }

  public async getItem<T>(id: number, objectStoreName: ObjectStoreNames): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database is not initialized');
        return;
      }
      const transaction = this.db.transaction([objectStoreName]);
      const objectStore = transaction.objectStore(objectStoreName);
      const request = objectStore.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(`Get item error: ${(event.target as IDBRequest).error}`);
      };
    });
  }

  private initialize(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(this.objectStores.pictures.name)) this.indexPicturesObjectStore(db);
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('Database opened successfully');
    };

    request.onerror = (event) => {
      console.error(`Database error: ${(event.target as IDBOpenDBRequest).error}`);
    };
  }

  private indexPicturesObjectStore(db: IDBDatabase) {
    const objectStore = db.createObjectStore(this.objectStores.pictures.name, this.objectStores.pictures.objectStoreParameters);
    //objectStore.createIndex("description", "description", { unique: false });
    objectStore.createIndex('type', 'type', { unique: false });
    objectStore.createIndex('lastModified', 'lastModified', { unique: false });
  }
}
