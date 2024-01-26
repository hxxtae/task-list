import { useTheme } from '@react-navigation/native';
import { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

export default function TaskBar() {
  const val = useRef(0.5).current;
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Progress.Bar style={styles.bar} progress={val} color={theme.colors.text} width={null} />
      <Text style={styles.barText(theme)}>{ `${val * 100}%` }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    flex: 1,
  },
  barText: (theme) => ({
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    color: `${theme.colors.text}`,
  })
});