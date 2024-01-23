import { useTheme } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

TaskTitle.propTypes = {
  title: PropTypes.string
}

export default function TaskTitle({ title }) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => styles.header(pressed)}
        hitSlop={20}>
        {title ?
          <Text style={styles.headerFont(theme)}>{title}</Text> :
          <Text style={styles.headerFont(theme)}>Loading...</Text>}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  header: (pressed) => ({
    borderRadius: 8,
    opacity: pressed ? 0.4 : 1,
  }),
  headerFont: (theme) => ({
    color: `${theme.text}`,
    fontSize: 35,
    fontWeight: '600',
  })
})
