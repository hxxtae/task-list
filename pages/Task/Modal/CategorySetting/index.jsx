import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useMutateCategory } from '../../../../hooks/useMutateCategory';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CategoryIdState, TaskData } from '../../../../global/atom';

CategorySetting.propTypes = {
  closeModal: PropTypes.func, // NOTE: cloneElement prop
}

export default function CategorySetting({ closeModal }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [categoryId, setCategoryId] = useRecoilState(CategoryIdState);
  const taskData = useRecoilValue(TaskData);
  const { onCategoryOfDelete } = useMutateCategory();

  const onClickMenu = (navName) => {
    navigation.navigate(navName);
    closeModal();
  }

  const onRemoveMenu = () => {
    if (categoryId === '') return;
    if (Object.keys(taskData).length === 1) {
      Alert.alert(
        'Cannot Be Deleted',
        'There is currently only one category.',
        [{
          text: 'Ok',
          style: 'cancel',
        }],
        {
          cancelable: true,
        }
      )
      closeModal();
      return;
    }
    
    const firstId = Object.keys(taskData).filter(id => categoryId !== id)[0];
    Alert.alert(
      'Delete Category?', // Title
      `Delete category name is \n"${taskData[categoryId].title}"`, // Message
      // Buttons[]
      [{
        text: 'Cancel',
        style: 'cancel',
      }, {
        text: 'Delete',
        onPress: () => {
          onCategoryOfDelete(categoryId);
          setCategoryId(firstId);
          Alert.alert("Deletion complete", `"${taskData[categoryId].title}"`);
        }
      }],
      // Options
      {
        cancelable: true,
      }
    );
    closeModal();
  }

  return (
    <View style={styles.wrapper}>
      <Entypo name="chevron-small-down" size={30} color={theme.colors.text} />
      <View style={styles.box}>
        <Pressable style={styles.button} onPress={() => onClickMenu('CategoryAdd')}>
          <Feather name="plus-square" size={18} color={theme.colors.text} />
          <Text style={[styles.text(theme), styles.buttonText]}>Add category name</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => onClickMenu('CategoryEdit')}>
          <Feather name="edit" size={18} color={theme.colors.text} />
          <Text style={[styles.text(theme), styles.buttonText]}>Edit category name</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onRemoveMenu}>
          <Feather name="trash-2" size={18} color={theme.colors.text} />
          <Text style={[styles.text(theme), styles.buttonText]}>Remove category name</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  box: {
    paddingHorizontal: 24,
    width: '100%',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: (theme) => ({
    color: `${theme.colors.text}`,
  }),
  buttonText: {
    fontWeight: '500',
    fontSize: 18,
  }
});