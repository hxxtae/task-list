import { atom } from 'recoil';

export const TaskData = atom({
  key: "GlobalTaskData",
  default: {},
});

export const TaskMutateState = atom({
  key: "GlobalTaskMutateState",
  default: {
    category: {
      id: '',
      setting: false,
      division: '',
    },
    task: {
      id: '',
      setting: false,
      division: '',
    }
  }
});