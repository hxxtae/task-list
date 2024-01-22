import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { produce } from 'immer';
import PropTypes from 'prop-types';

import { TaskMutateState } from '../../global/atom';

TaskList.propTypes = {
  tasks: PropTypes.object,
}

export default function TaskList({ tasks }) {
  const [itemSetting, setItemSetting] = useState(-1);
  const setTaskMutateState = useSetRecoilState(TaskMutateState);
  const theme = useTheme();

  const handleSettingPress = (target) => {
    if (target === itemSetting) {
      setItemSetting(-1);
      return;
    }
    setItemSetting(target);
  }

  const handleTaskUpdatePress = ({state, id}) => {
    setTaskMutateState((prev) =>
      produce(prev, (draft) => {
        draft.task.setting = state;
        draft.task.division = 'update';
        draft.task.id = id;
        return draft;
      })
    );
    setItemSetting(-1);
  }

  const handleTaskDeletePress = () => {
    console.log('delete');
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
        <TouchableOpacity style={styles.itemSettingButton} onPress={() => handleTaskUpdatePress({state: true, id: taskId})}>
          <Text style={[styles.text(theme), styles.itemSettingText]}>UPDATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemSettingButton} onPress={() => handleTaskDeletePress()}>
          <Text style={[styles.text(theme), styles.itemSettingText, styles.warning]}>DELETE</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      {(tasks !== undefined) ? 
        <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
          {Object.keys(tasks).map((taskKey, idx) => (
            <View key={taskKey} style={styles.item(theme)}>
              <Text style={[styles.itemText, styles.text(theme)]}>{tasks[taskKey].name}</Text>
              <Pressable onPress={() => handleSettingPress(idx)}>
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
    backgroundColor: `${theme.card}`,
  }),
  text: (theme) => ({
    color: `${theme.text}`,
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
    color: `${theme.secondary}`,
  }),

  itemSetting: (theme) => ({
    position: 'absolute',
    flex: 1,
    gap: 15,
    right: 45,
    borderRadius: 7,
    backgroundColor: `${theme.background}`,
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