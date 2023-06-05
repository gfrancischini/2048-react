import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save the data on the async store
 * @param key
 * @param value
 * @returns
 */
export const setData = <T = object>(key: string, value: T) => {
  const jsonValue = JSON.stringify(value);
  return AsyncStorage.setItem(key, jsonValue);
};

/**
 * Retrieve data from the async storage
 * @param key
 * @returns
 */
export const getData = async <T = object>(key: string): Promise<T | null> => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};
