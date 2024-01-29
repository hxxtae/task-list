import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMutateTask from '../../../hooks/useMutateTask';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CategoryIdState, TaskIdState } from '../../../global/atom';
import CardShift from '../../../components/CardShift';
import TaskItem from '../TaskItem';

TaskList.propTypes = {
  tasks: PropTypes.object,
}

export default function TaskList({ tasks = {} }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [itemSetting, setItemSetting] = useState('');
  const categoryId = useRecoilValue(CategoryIdState);
  const setTaskId = useSetRecoilState(TaskIdState);
  const { onTaskOfChecked, onTaskOfDelete } = useMutateTask();

  // NOTE: Task 목록 설정 클릭
  const handleTaskSettingPress = (taskId) => {
    if (taskId === itemSetting) {
      setItemSetting(-1);
      return;
    }
    setItemSetting(taskId);
  }

  // NOTE: Task 목록 설정 -> Update 클릭
  const handleTaskUpdatePress = (taskId) => {
    navigation.navigate('TaskEdit');
    setTaskId(taskId);
    setItemSetting(-1);
  }

  // NOTE: Task 목록 설정 -> Delete 클릭
  const handleTaskDeletePress = (categoryId, id) => {
    if (categoryId === '' || id === '') return;
    Alert.alert(
      'Delete Task?', // Title
      `Delete task name is \n"${tasks[id]?.name}"`, // Message
      // Buttons[]
      [{
        text: 'Cancel',
        style: 'cancel',
      }, {
        text: 'Delete',
        onPress: () => {
          onTaskOfDelete(categoryId, id);
          Alert.alert("Deletion complete", `"${tasks[id]?.name}"`);
        }
      }],
      // Options
      {
        cancelable: true,
      }
    );
    setItemSetting(-1);
  }

  const handleTaskCheckPress = (taskId, check) => {
    onTaskOfChecked(categoryId, taskId, check);
  }

  const emptyList = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText(theme)}>Empty Task</Text>
      </View>
    )
  }

  useLayoutEffect(() => {
    setItemSetting(-1);
  }, [categoryId]);

  return (
    <>
      {(Object.keys(tasks)?.length ) ? 
        <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
          {Object.keys(tasks).map((taskKey) => (
            <CardShift
              key={taskKey}
              checkedState={tasks[taskKey].check}
              setCheckedState={(check) => handleTaskCheckPress(taskKey, check)}
            >
              <TaskItem
                tasks={tasks}
                categoryId={categoryId}
                taskId={taskKey}
                isSetting={itemSetting === taskKey}
                onSetting={handleTaskSettingPress}
                onUpdate={handleTaskUpdatePress}
                onDelete={handleTaskDeletePress}
              />
            </CardShift>
          ))}
        </ScrollView> : emptyList()
      }
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: (theme) => ({
    fontSize: 16,
    fontWeight: '600',
    color: `${theme.colors.secondary}`,
  }),
});