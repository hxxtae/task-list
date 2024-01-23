import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import { TaskData, TaskMutateState } from '../../global/atom';
import useMutateTask from '../../hooks/useMutateTask';

TaskSetting.propTypes = {
  categoryId: PropTypes.string.isRequired,
  closeModal: PropTypes.func, // NOTE: cloneElement prop from Parent element
}

export default function TaskSetting({ categoryId, closeModal }) {
  const taskData = useRecoilValue(TaskData);
  const taskMutateState = useRecoilValue(TaskMutateState);
  const theme = useTheme();
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('');
  const { onTaskOfCreate, onTaskOfUpdate } = useMutateTask();

  const handleAddTask = () => {
    if (taskName === '') return;

    const newTask = {
      name: taskName,
      date: Date.now().toString(),
      check: false
    }
    onTaskOfCreate(categoryId, newTask);
    closeModal();
  }

  const handleUpdateTask = () => {
    if (taskName === '') return;
    
    const { id } = taskMutateState.task;
    const updateTask = {
      name: taskName,
      date: Date.now().toString(),
      check: false
    }
    onTaskOfUpdate(categoryId, id, updateTask);
    closeModal();
  }

  const handleTaskSubmit = () => {
    const { setting, division } = taskMutateState.task;
    if (setting && division === 'create') {
      handleAddTask();
      return;
    }
    if (setting && division === 'update') {
      handleUpdateTask();
      return;
    }
  }

  // Side Effect: Initialize Of Input
  useLayoutEffect(() => {
    const { id } = taskMutateState.task;
    if (!id) return;

    const { name } = taskData[categoryId].list[id];
    setTaskName(name || '');
  }, [taskMutateState]);

  return (
    <View style={styles.wrapper(theme)}>
      <Entypo style={styles.chevron} name="chevron-small-down" size={30} color={theme.text} />
      <ScrollView style={styles.inputWrapper}>
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle(theme)}>TASK</Text>
          <TextInput
            style={styles.inputText(theme)}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Task to add.."
            returnKeyType='done'
            autoCapitalize='words'
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle(theme)}>PRIORITY</Text>
          <TextInput
            style={styles.inputText(theme)}
            value={priority}
            onChangeText={setPriority}
            placeholder="Task to add.."
            returnKeyType='done'
            autoCapitalize='words'
          />
        </View>
      </ScrollView>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={[styles.button, styles.firstChild(theme)]} onPress={() => closeModal()}>
          <Text style={styles.buttonText(theme)}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleTaskSubmit()}>
          <Text style={styles.buttonText(theme)}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: (theme) => ({
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: `${theme.backgroundColor}`,
  }),
  chevron: {
    marginVertical: 10,
  },
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
    fontWeight: '600',
    color: `${theme.secondary}`,
    marginBottom: 4
  }),
  inputText: (theme) => ({
    fontSize: 20,
    fontWeight: '500',
    color: `${theme.text}`,
  }),
  buttonBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  buttonText: (theme) => ({
    fontSize: 20,
    fontWeight: '500',
    color: `${theme.text}`,
  }),
  firstChild: (theme) => ({
    borderColor: `${theme.secondary}`,
    borderStyle: 'solid',
    borderRightWidth: 1,
  })
})