import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import { CategoryIdState, TaskData } from '../../global/atom';
import { useMutateCategory } from '../../hooks/useMutateCategory';

CategoryForm.propTypes = {
  workKind: PropTypes.string.isRequired,
}

export default function CategoryForm({ workKind }) {
  const theme = useTheme();
  const taskData = useRecoilValue(TaskData);
  const [categoryId, setCategoryId] = useRecoilState(CategoryIdState);
  const { onCategoryOfCreate, onCategoryOfUpdate } = useMutateCategory();
  const [categoryName, setCategoryName] = useState('');
  const navigation = useNavigation();

  // NOTE: Category Create Event
  const handleAddCategory = async () => {
    const newId = await onCategoryOfCreate(categoryName);
    setCategoryId(newId);
  }

  // NOTE: Category Update Event
  const handleUpdateCategory = () => {
    if (categoryId === '') return;
    onCategoryOfUpdate(categoryId, categoryName);
  }

  // NOTE: Input Submit
  const handleCategorySubmit = () => {
    if (categoryName === '') return;
    workKind === 'add' && handleAddCategory();
    workKind === 'edit' && handleUpdateCategory();
    setCategoryName('');
    navigation.goBack('Task');
  }

  // Side Effect: Initialize Of Input
  useLayoutEffect(() => {
    if (!taskData[categoryId]?.title || workKind === 'add')
      return;
    const { title } = taskData[categoryId];
    setCategoryName(title);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper(theme)}>
      <ScrollView style={styles.inputWrapper}>
        <View style={styles.inputBox}>
          <Text style={styles.inputTitle(theme)}>CATEGORY NAME</Text>
          <TextInput
            style={styles.inputText(theme)}
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="write category name..."
            returnKeyType='done'
            autoCapitalize='words'
          />
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button(theme)} onPress={handleCategorySubmit}>
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