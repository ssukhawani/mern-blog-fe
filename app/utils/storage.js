const LocalStorageRepository = {
  /**
    Get an item from localStorage by key
  **/
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error getting localStorage item ${key}`);
      return null;
    }
  },

  /**
    Set an item in localStorage by key
  **/
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage item ${key}`);
    }
  },

  /**
    Update an item in localStorage by key (merges with existing data if existing data is there
        if not then will set data)
  **/
  update: (key, update) => {
    try {
      const existingItem = LocalStorageRepository.get(key);

      // Check if existingItem is an object
      if (typeof existingItem === "object" && existingItem !== null) {
        const updatedItem = { ...existingItem, ...update };
        LocalStorageRepository.set(key, updatedItem);
      } else {
        // If existingItem is not an object, set the key with the update directly
        LocalStorageRepository.set(key, update);
      }
    } catch (error) {
      console.error(`Error updating localStorage item ${key}`);
    }
  },

  /**
    Delete an item from localStorage by key
  **/
  delete: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting localStorage item ${key}`);
    }
  },
};

export default LocalStorageRepository;
