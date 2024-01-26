import { useRecoilState } from 'recoil';
import { TaskData } from '../global/atom';
import { produce } from 'immer';
import { setStorage } from '../apis/model';

export const useMutateCategory = () => {
  const [taskData, setTaskData] = useRecoilState(TaskData);

  const onCategoryOfCreate = async (categoryName) => {
    const categoryId = `C-${Date.now()}`
    const addCategory = (prev) =>
      produce(prev, (draft) => {
        draft[categoryId] = {
          title: categoryName,
          list: {}
        }
        return draft;
      });
    setTaskData(addCategory);
    await setStorage(addCategory(taskData));
    
    return categoryId;
  }

  const onCategoryOfUpdate = async (categoryId, categoryName) => {
    const updateCateogry = (prev) =>
      produce(prev, (draft) => {
        draft[categoryId].title = categoryName;
        return draft;
      });
    setTaskData(updateCateogry);
    await setStorage(updateCateogry(taskData));
  }

  const onCategoryOfDelete = async (categoryId) => {
    const deleteCategory = (prev) =>
      produce(prev, (draft) => {
        delete draft[categoryId];
        return draft;
      });
    setTaskData(deleteCategory);
    await setStorage(deleteCategory(taskData));
  }

  return {
    onCategoryOfCreate,
    onCategoryOfUpdate,
    onCategoryOfDelete
  };
}