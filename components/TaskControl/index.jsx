import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useRecoilValue } from 'recoil';

import { TaskData } from '../../global/atom';
import BottomSheet from '../BottomSheet';

export default function TaskControl({ onChangeCategory }) {
  const [modalVisible, setModalVisible] = useState(false);
  const taskData = useRecoilValue(TaskData);
  const theme = useTheme();

  const showCategoryModal = () => {
    setModalVisible(true);
  }

  return (
    <View style={styles.wrapper}>      
      <TouchableOpacity style={styles.leftIcon} hitSlop={10} onPress={showCategoryModal}>
        <Entypo name="menu" size={30} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerIcon}>
        <Ionicons name="add-circle-sharp" size={70} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightIcon} hitSlop={10}>
        <MaterialIcons name="more-horiz" size={30} color={theme.text} />
      </TouchableOpacity>

      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={taskData}
        setData={onChangeCategory}
      />
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
      height: -5,
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