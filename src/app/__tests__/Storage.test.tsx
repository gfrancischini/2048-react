import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, setData } from '../storage';

// Save the data on the async store
describe('setData', () => {
  it('saves data to async storage', () => {
    const key = 'testKey';
    const value = { name: 'John', age: 30 };
    const jsonValue = JSON.stringify(value);
    setData(key, value);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, jsonValue);
  });
});

// Retrieve data from the async storage
describe('getData', () => {
  it('retrieves data from async storage when it exists', async () => {
    const key = 'testKey';
    const value = { name: 'John', age: 30 };
    const jsonValue = JSON.stringify(value);

    // AsyncStorage.getItem = jest.fn().mockResolvedValue(jsonValue);

    const result = await getData(key);

    await expect(result).toEqual(value);
  });

  it('returns null when data does not exist in async storage', async () => {
    const key = 'nonexistentKey';

    // AsyncStorage.getItem = jest.fn().mockResolvedValue(null);

    const result = await getData(key);

    await expect(result).toBeNull();
  });
});