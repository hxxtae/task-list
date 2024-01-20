import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

CategoryList.propTypes = {
  data: PropTypes.object,
  setCategory: PropTypes.func.isRequired,
  closeModal: PropTypes.func, // NOTE: cloneElement prop
}

export default function CategoryList({ data, setCategory, closeModal }) {
  const theme = useTheme();

  const onClickCategory = (id) => {
    closeModal();
    setCategory(id);
  }

  return (
    <View style={styles.bottomSheetWrapper}>
      <Entypo name="chevron-small-down" size={30} color={theme.text} />
      <ScrollView style={styles.bottomSheetUl}>
        {Object.keys(data).slice(0).map(id => (
          <Pressable key={id} style={styles.bottomSheetLi} onPress={() => onClickCategory(id)}>
            <Text style={styles.bottomSheetText(theme)}>{data[id].title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetUl: {
    width: '100%',
    paddingHorizontal: 24,
  },
  bottomSheetLi: {
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  bottomSheetText: (theme) => ({
    fontSize: 20,
    fontWeight: '500',
    color: `${theme.text}`,
  })
})