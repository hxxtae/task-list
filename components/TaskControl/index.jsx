import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useRecoilState, useRecoilValue } from 'recoil';
import { produce } from 'immer';
import PropTypes from 'prop-types';

import { TaskData, TaskMutateState } from '../../global/atom';
import BottomSheet from '../BottomSheet';
import CategoryList from '../CategoryList';
import TaskSetting from '../TaskSetting';
import CategorySetting from '../CategorySetting';

TaskControl.propTypes = {
  categoryId: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired
}

export default function TaskControl({ categoryId, setCategory }) {
  const [taskMutateState, setTaskMutateState] = useRecoilState(TaskMutateState);
  const [setting, setSetting] = useState(false);
  const taskData = useRecoilValue(TaskData);
  const theme = useTheme();

  // NOTE: 카테고리 목록 Modal On/Off
  const categoryListModalProps = {
    modalVisible: taskMutateState.category.select,
    setModalVisible: ({state}) =>
      setTaskMutateState((prev) =>
        produce(prev, (draft) => ((draft.category.select = state), draft))),
    height: 300
  };

  // NOTE: 할 일 목록 추가 Modal On/Off
  const taskAddModalProps = {
    modalVisible: taskMutateState.task.setting,
    setModalVisible: ({state, id}) =>
      setTaskMutateState((prev) =>
        produce(prev, (draft) => {
          draft.task.setting = state;
          draft.task.division = 'create';
          draft.task.id = id;
          return draft;
        })),
    height: '88%'
  };

  // NOTE: 설정 Modal On/Off
  const categorySettingModalProps = {
    modalVisible: setting,
    setModalVisible: setSetting,
    height: 250
  };

  return (
    <View style={styles.wrapper}>      
      <TouchableOpacity style={styles.leftIcon} hitSlop={10} onPress={() => categoryListModalProps.setModalVisible({state: true})}>
        <Entypo name="menu" size={30} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerIcon} hitSlop={10} onPress={() => taskAddModalProps.setModalVisible({state: true})}>
        <Ionicons name="add-circle-sharp" size={70} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon} hitSlop={10} onPress={() => categorySettingModalProps.setModalVisible(true)}>
        <MaterialIcons name="more-horiz" size={30} color={theme.text} />
      </TouchableOpacity>

      <BottomSheet {...categoryListModalProps}>
        <CategoryList data={taskData} setCategory={setCategory} />
      </BottomSheet>
      <BottomSheet {...taskAddModalProps}>
        <TaskSetting categoryId={categoryId} />
      </BottomSheet>
      <BottomSheet {...categorySettingModalProps}>
        <CategorySetting />
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  leftIcon: {
    marginLeft: 30,
  },
  centerIcon: {
    transform: [{ translateY: -40 }],
  },
  rightIcon: {
    marginRight: 30
  },
})