import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useRecoilValue } from 'recoil';

import { TaskData } from '../../global/atom';
import BottomSheet from '../BottomSheet';
import CategoryList from '../CategoryList';
import TaskAdd from '../TaskAdd';
import CategorySetting from '../CategorySetting';

export default function TaskControl({ setCategory }) {
  const [categoryListVisible, setCategoryListVisible] = useState(false);
  const [taskAddVisible, setTaskAddVisible] = useState(false);
  const [categorySetVisible, setCategorySetVisible] = useState(false);
  const taskData = useRecoilValue(TaskData);
  const theme = useTheme();

  const categoryListModalProps = {
    modalVisible: categoryListVisible,
    setModalVisible: setCategoryListVisible,
    height: 300
  };

  const taskAddModalProps = {
    modalVisible: taskAddVisible,
    setModalVisible: setTaskAddVisible,
    height: '88%'
  };

  const categorySettingModalProps = {
    modalVisible: categorySetVisible,
    setModalVisible: setCategorySetVisible,
    height: 250
  };

  return (
    <View style={styles.wrapper}>      
      <TouchableOpacity style={styles.leftIcon} hitSlop={10} onPress={() => setCategoryListVisible(true)}>
        <Entypo name="menu" size={30} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerIcon} hitSlop={10} onPress={() => setTaskAddVisible(true)}>
        <Ionicons name="add-circle-sharp" size={70} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon} hitSlop={10} onPress={() => setCategorySetVisible(true)}>
        <MaterialIcons name="more-horiz" size={30} color={theme.text} />
      </TouchableOpacity>

      <BottomSheet {...categoryListModalProps}>
        <CategoryList data={taskData} setCategory={setCategory} />
      </BottomSheet>
      <BottomSheet {...taskAddModalProps}>
        <TaskAdd />
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
    shadowColor: '#111111',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    elevation: 10,
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