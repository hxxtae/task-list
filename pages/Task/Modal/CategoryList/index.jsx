import { Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import { CategoryIdState, TaskData } from '../../../../global/atom';

CategoryList.propTypes = {
  closeModal: PropTypes.func, // NOTE: cloneElement prop
}

export default function CategoryList({ closeModal }) {
  const [categoryId, setCategoryId] = useRecoilState(CategoryIdState);
  const taskData = useRecoilValue(TaskData);
  const theme = useTheme();

  const onClickCategory = (id) => {
    closeModal();
    setCategoryId(id);
  }

  return (
    <View style={styles.wrapper}>
      <Entypo name="chevron-small-down" size={30} color={theme.colors.text} />
      <ScrollView style={styles.categoryList} showsVerticalScrollIndicator={false}>
        {Object.keys(taskData).slice(0).map(id => (
          <Pressable key={id} style={styles.categoryItem} onPress={() => onClickCategory(id)}>
            <Text style={styles.categoryText(theme, categoryId === id)}>{taskData[id].title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryList: {
    width: '100%',
    paddingHorizontal: 24,
  },
  categoryItem: {
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  categoryText: (theme, thisId) => ({
    fontSize: 18,
    fontWeight: '500',
    color: `${thisId ? theme.colors.primary : theme.colors.text}`,
  })
})