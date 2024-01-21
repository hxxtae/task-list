import { useRecoilState } from 'recoil';
import { produce } from 'immer';

import { TaskData } from '../global/atom';
import { setStorage } from '../apis/model';

const useMutateTask = () => {
  const [taskData, setTaskData] = useRecoilState(TaskData);

  const onTaskOfCreate = async (categoryId, task) => {
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
  };

  return { onTaskOfCreate };
}

export default useMutateTask;