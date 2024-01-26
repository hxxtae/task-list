import { atom } from 'recoil';

export const TaskData = atom({
  key: "GlobalTaskData",
  default: {},
});

export const CategoryIdState = atom({
  key: "GlobalCategoryId",
  default: ''
});

export const TaskIdState = atom({
  key: "GlobalTaskId",
  default: ''
});