import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CategoryIdState, TaskData, TaskIdState } from '../../global/atom';
import useMutateTask from '../../hooks/useMutateTask';
import PropTypes from 'prop-types';

TaskForm.propTypes = {
  workKind: PropTypes.string.isRequired,
}

export default function TaskForm({ workKind }) {
  const taskData = useRecoilValue(TaskData);
  const categoryId = useRecoilValue(CategoryIdState);
  const [taskId, setTaskId] = useRecoilState(TaskIdState);
  const navigation = useNavigation();
  const theme = useTheme();
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('');
  const { onTaskOfCreate, onTaskOfUpdate } = useMutateTask();

  // NOTE: Task Create Event
  const handleAddTask = () => {
    if (categoryId === '') return;
    const newTask = {
      name: taskName,
      date: Date.now().toString(),
      check: false
    }
    onTaskOfCreate(categoryId, newTask);
    navigation.navigate('TaskNavigator');
  }

  // NOTE: Task Update Event
  const handleUpdateTask = () => {
    if (categoryId === '' || taskId === '') return;
    const updateTask = {
      name: taskName,
      date: Date.now().toString(),
      check: false
    }
    onTaskOfUpdate(categoryId, taskId, updateTask);
    setTaskId('');
    navigation.goBack('Task');
  }

  // NOTE: Input Submit
  const handleTaskSubmit = () => {
    if (taskName === '') return;
    workKind === 'add' && handleAddTask();
    workKind === 'edit' && handleUpdateTask();
    setTaskName('');
  }

  // Side Effect: Initialize Of Input
  useLayoutEffect(() => {
    if (!taskData[categoryId]?.list[taskId]?.name || workKind === 'add')
      return;
    const { name } = taskData[categoryId].list[taskId];
    setTaskName(name);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper(theme)}>
      <ScrollView style={styles.inputWrapper}>
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle(theme)}>TASK NAME</Text>
          <TextInput
            style={styles.inputText(theme)}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="write task name.."
            returnKeyType='done'
            autoCapitalize='words'
            placeholderTextColor={theme.colors.secondary}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle(theme)}>PRIORITY</Text>
          <TextInput
            style={styles.inputText(theme)}
            value={priority}
            onChangeText={setPriority}
            placeholder="add.."
            returnKeyType='done'
            autoCapitalize='words'
            placeholderTextColor={theme.colors.secondary}
          />
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button(theme)} onPress={() => handleTaskSubmit()}>
            <Text style={styles.buttonText(theme)}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: (theme) => ({
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: `${theme.colors.background}`,
    paddingTop: 20,
  }),
  inputWrapper: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'yellow',
  },
  inputBox: {
    marginBottom: 40,
    // backgroundColor: 'yellow',
  },
  inputTitle: (theme) => ({
    fontSize: 16,
    fontWeight: '500',
    color: `${theme.colors.text}`,
    marginBottom: 4
  }),
  inputText: (theme) => ({
    fontSize: 20,
    fontWeight: '600',
    color: `${theme.colors.text}`,
  }),
  buttonBox: {
    width: '100%',
  },
  button: (theme) => ({
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${theme.colors.text}`,
  }),
  buttonText: (theme) => ({
    fontSize: 20,
    fontWeight: '500',
    color: `${theme.colors.background}`,
  })
})