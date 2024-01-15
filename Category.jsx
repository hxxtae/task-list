import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import CategoryModal from './CategoryModal';
import { useRecoilState } from 'recoil';
import { themeState } from './global/atom';

const categoryObj = {
  1: {
    title: 'Work'
  },
  2: {
    title: 'Travel'
  },
  3: {
    title: 'English'
  },
  4: {
    title: 'Home1'
  },
  5: {
    title: 'Home2'
  },
  6: {
    title: 'Home3'
  }
}

export default function Category({ id, handleCategory }) {
  const [category, setCategory] = useState(categoryObj);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [barVal, setBarVal] = useState(0);

  const windowWidth = Dimensions.get('window').width;

  const onMenu = () => {
    setCategoryMenu(true);
  }

  const onCloseModal = () => {
    setCategoryMenu(false);
  }

  return (
    <View style={styles.wrapper(windowWidth)}>
      <View style={styles.headerBox}>
        <Pressable
          style={({ pressed }) => styles.header(pressed)}
          hitSlop={20}
        >
          <Text style={styles.headerFont}>{category[id].title}</Text>
        </Pressable>
        <TouchableOpacity style={styles.menu} onPress={onMenu}>
          <Entypo name="menu" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
      <Progress.Bar progress={barVal} color='#fff' width={null} />

      <CategoryModal
        show={categoryMenu}
        category={category}
        onClose={onCloseModal}
        handleCategory={handleCategory} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: (windowWidth) => ({
    flex: 1,
    width: windowWidth,
    marginTop: 70,
    paddingHorizontal: 20,
    marginBottom: 70,
  }),
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  header: (pressed) => ({
    flex: 1,
    borderRadius: 8,
    marginBottom: 20,
    opacity: pressed ? 0.4 : 1,
    // backgroundColor: 'gray'
  }),
  menu: {
    paddingLeft: 10
  },
  headerFont: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
  }
})
