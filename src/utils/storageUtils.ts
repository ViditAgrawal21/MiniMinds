import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data to AsyncStorage
export const saveData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
  }
};

// Retrieve data from AsyncStorage
export const getData = async <T>(
  key: string,
  defaultValue: T | null = null,
): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving data for key "${key}":`, error);
    return defaultValue;
  }
};

// Remove specific data from AsyncStorage
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key "${key}":`, error);
  }
};

// Retrieve all saved data from AsyncStorage
export const getAllData = async (): Promise<{ key: string; value: any }[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keyValuePairs = await AsyncStorage.multiGet(keys);

    return keyValuePairs.map(([key, value]) => {
      try {
        return { key, value: value ? JSON.parse(value) : null };
      } catch (error) {
        console.error(`Error parsing value for key "${key}":`, error);
        return { key, value: null };
      }
    });
  } catch (error) {
    console.error("Error retrieving all data:", error);
    return [];
  }
};

// Clear all data from AsyncStorage
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

// Check if a key exists in AsyncStorage
export const keyExists = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error(`Error checking existence of key "${key}":`, error);
    return false;
  }
};
