import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import { produce } from 'immer';

import { TaskData } from '../global/atom';
import { setStorage } from '../apis/model';

const useMutateTask = () => {
  const [taskData, setTaskData] = useRecoilState(TaskData);

  /**
   * Mutate 1. Create of Task
   * @param {string} categoryId 
   * @param {{name: string, date: string, check: boolean}} task 
   */
  const onTaskOfCreate = useCallback(async (categoryId, task) => {
    const taskId = `T-${Date.now()}`;
    const addTask = (prev) => {
      return produce(prev, (draft) => {
        draft[categoryId].list = {
          ...draft[categoryId].list,
          [taskId]: task,
        }
        return draft;
      });
    }

    setTaskData(addTask);
    await setStorage(addTask(taskData));
  }, [taskData]);

  /**
   * Mutate 2. Update of Task
   * @param {string} categoryId 
   * @param {string} taskId 
   * @param {{name: string, date: string, check: boolean}} task 
   */
  const onTaskOfUpdate = useCallback(async (categoryId, taskId, task) => {
    const updateTask = (prev) =>
      produce(prev, (draft) => {
        draft[categoryId].list[taskId] = task;
        return draft;
      });
    
    setTaskData(updateTask);
    await setStorage(updateTask(taskData));
  }, [taskData]);

  /**
   * Mutate 3. Delete of Task
   * @param {string} categoryId 
   * @param {string} taskId 
   */
  const onTaskOfDelete = useCallback(async (categoryId, taskId) => {
    const deleteTask = (prev) =>
      produce(prev, (draft) => {
        delete draft[categoryId].list[taskId];
        return draft;
      });
    
    setTaskData(deleteTask);
    await setStorage(deleteTask(taskData));
  }, [taskData]);

  return {
    onTaskOfCreate,
    onTaskOfUpdate,
    onTaskOfDelete,
  };
}

export default useMutateTask;