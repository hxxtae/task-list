import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, useColorScheme, TouchableOpacity, Appearance, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useRecoilState } from 'recoil';

import Category from '../Category';
import { TaskData } from '../global/atom';
import { getStorage, initSetStorage } from '../apis/model';
import TaskTitle from '../components/TaskTitle';
import TaskBar from '../components/TaskBar';
import TaskList from '../components/TaskList';
import TaskControl from '../components/TaskControl';

export default function Task() {
  const [category, setCategory] = useState(null);
  const [taskData, setTaskData] = useRecoilState(TaskData);
  const theme = useTheme();

  const handleCategory = (id) => {
    setTask(id);
  }

  // NOTE: Task 데이터 가져오기
  useEffect(() => {
    const initTask = async () => {
      await initSetStorage();
      const data = await getStorage();
      setTaskData(data);
      setCategory(Object.keys(data)[0] ?? 'C-000000');
    }
    initTask();
  }, []);

  return (
    <SafeAreaView style={styles.container(theme)}>
      <View style={styles.section1}>
        <TaskTitle title={taskData[category]?.title} />
      </View>
      <View style={styles.section2}>
        <TaskBar />
      </View>
      <View style={styles.section3}>
        <TaskList category={category} tasks={taskData[category]?.list} />
      </View>
      <View style={styles.section4}>
        <TaskControl />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: `${theme.background}`,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 70,
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
    flex: 7,
    width: '100%',
    // backgroundColor: 'orange'
  },
  section4: {
    flex: 1.5,
    width: '100%',
    // backgroundColor: 'black'
  }
});