import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { useRecoilState } from 'recoil';

import { CategoryIdState, TaskData } from '../../global/atom';
import { getStorage, initSetStorage } from '../../apis/model';
import TaskTitle from './TaskTitle';
import TaskBar from './TaskBar';
import TaskList from './TaskList';

export default function Task() {
  const [categoryId, setCategoryId] = useRecoilState(CategoryIdState)
  const [taskData, setTaskData] = useRecoilState(TaskData);
  const theme = useTheme();

  // NOTE: Task 데이터 가져오기
  useEffect(() => {
    const initTask = async () => {
      await initSetStorage();
      const data = await getStorage();
      setTaskData(data);
      setCategoryId(Object.keys(data)[0] ?? 'C-000000');
    }
    initTask();
  }, []);

  return (
    <SafeAreaView style={styles.container(theme)}>
      <View style={styles.section1}>
        <TaskTitle />
      </View>
      <View style={styles.section2}>
        <TaskBar />
      </View>
      <View style={styles.section3}>
        <TaskList categoryId={categoryId} tasks={taskData[categoryId]?.list} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: `${theme.colors.background}`,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  }),
  section1: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'blue',
  },
  section2: {
    flex: .5,
    width: '100%',
    // backgroundColor: 'red'
  },
  section3: {
    flex: 8,
    width: '100%',
    // backgroundColor: 'orange'
  },
});