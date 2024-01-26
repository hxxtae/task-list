import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';

import useMutateTask from '../../../hooks/useMutateTask';
import { useSetRecoilState } from 'recoil';
import { TaskIdState } from '../../../global/atom';

TaskList.propTypes = {
  categoryId: PropTypes.string.isRequired,
  tasks: PropTypes.object,
}

export default function TaskList({ categoryId, tasks = {} }) {
  const theme = useTheme();
  const [itemSetting, setItemSetting] = useState(-1);
  const setTaskId = useSetRecoilState(TaskIdState);
  const { onTaskOfDelete } = useMutateTask();
  const navigation = useNavigation();

  // NOTE: Task 목록 설정 클릭
  const handleTaskSettingPress = (target) => {
    if (target === itemSetting) {
      setItemSetting(-1);
      return;
    }
    setItemSetting(target);
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

  const emptyList = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText(theme)}>Empty</Text>
      </View>
    )
  }

  const onTaskSetting = (taskId) => {
    return (
      <View style={styles.itemSetting(theme)}>
        <TouchableOpacity style={styles.itemSettingButton} onPress={() => handleTaskUpdatePress(taskId)}>
          <Text style={[styles.text(theme), styles.itemSettingText]}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemSettingButton} onPress={() => handleTaskDeletePress(categoryId, taskId)}>
          <Text style={[styles.text(theme), styles.itemSettingText, styles.warning]}>DELETE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      {(Object.keys(tasks)?.length ) ? 
        <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
          {Object.keys(tasks).map((taskKey, idx) => (
            <View key={taskKey} style={styles.item(theme)}>
              <Text style={[styles.itemText, styles.text(theme)]}>{tasks[taskKey].name}</Text>
              <Pressable onPress={() => handleTaskSettingPress(idx)}>
                <Feather name="more-vertical" size={24} color="black" />
              </Pressable>
              {(itemSetting === idx) && onTaskSetting(taskKey)}
            </View>
          ))}
        </ScrollView> :
        emptyList()
      }
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  item: (theme) => ({
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 30,
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: `${theme.colors.card}`,
  }),
  text: (theme) => ({
    color: `${theme.colors.text}`,
  }),
  itemText: {
    fontSize: 16,
    fontWeight: '500',
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

  itemSetting: (theme) => ({
    position: 'absolute',
    flex: 1,
    gap: 15,
    right: 45,
    borderRadius: 7,
    backgroundColor: `${theme.colors.background}`,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }),
  itemSettingButton: {
    flex: 1,
  },
  itemSettingText: {
    fontWeight: '500',
  },
  warning: {
    color: 'red'
  }
});