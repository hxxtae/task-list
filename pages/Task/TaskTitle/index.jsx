import { useTheme } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

import { CategoryIdState, TaskData } from '../../../global/atom';
import BottomSheet from '../../../components/BottomSheet';
import CategoryList from '../Modal/CategoryList';
import CategorySetting from '../Modal/CategorySetting';

export default function TaskTitle() {
  const [titleModalState, setTitleModalState] = useState(false);
  const [settingModalState, setSettingModalState] = useState(false);
  const categoryId = useRecoilValue(CategoryIdState);
  const taskData = useRecoilValue(TaskData);
  const theme = useTheme();

  const categoryListModalProps = {
    modalVisible: titleModalState,
    setModalVisible: setTitleModalState,
    height: 300
  };

  const categorySettingModalProps = {
    modalVisible: settingModalState,
    setModalVisible: setSettingModalState,
    height: 250
  };

  return (
    <>
      <View style={styles.wrapper}>
        <Pressable
          style={({ pressed }) => styles.header(pressed)}
          onPress={() => setTitleModalState(true)}
          hitSlop={20}
        >
          { taskData[categoryId]?.title ?
            <Text style={styles.headerFont(theme)}>{taskData[categoryId]?.title}</Text> :
            <Text style={styles.headerFont(theme)}>Loading...</Text>}
            <Entypo name="chevron-small-down" size={30} color={theme.colors.text} />
        </Pressable>
        <TouchableOpacity style={styles.rightIcon} hitSlop={10} onPress={() => categorySettingModalProps.setModalVisible(true)}>
          <Feather name="settings" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <BottomSheet {...categoryListModalProps}>
        <CategoryList />
      </BottomSheet>
      <BottomSheet {...categorySettingModalProps}>
        <CategorySetting />
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: (pressed) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    opacity: pressed ? 0.4 : 1,
  }),
  headerFont: (theme) => ({
    color: `${theme.colors.text}`,
    fontSize: 35,
    fontWeight: '600',
  })
})
