import { initData } from './initData';
import AsyncStorageStatic from '@react-native-async-storage/async-storage';

export const fetchTaskData = async () => {
  try {
    const data = (await fetch('https://reactnative.dev/movies.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })).json();

    return data;
  } catch (e) {
    console.error(`Fetch Error: ${e.message}`);
  }
}

/*
-----------------------------
  React Native LocalStorage
-----------------------------
 */
// 스토리지에 Task 데이터 저장
export const setStorage = async (data) => {
  AsyncStorageStatic.setItem('myTask', JSON.stringify(data));
}

// 스토리지에서 Task 데이터 불러오기
export const getStorage = async () => {
  return JSON.parse(await AsyncStorageStatic.getItem('myTask'));
}

// 스토리지 초기화
// - key: 'myTask'
// - value: {}
export const initSetStorage = async () => {
  await AsyncStorageStatic.setItem('myTask', JSON.stringify(initData));
  return initData;
}



