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
      select: false,
      create: false,
      update: false,
      delete: false,
    },
    task: {
      id: '',
      setting: false,
      division: '',
    }
  }
});