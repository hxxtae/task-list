import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';

TaskBar.propTypes = {
  barState: PropTypes.number.isRequired,
}

export default function TaskBar({ barState = 0 }) {
  const [val, setVal] = useState(barState); // 0 ~ 1
  const theme = useTheme();

  useEffect(() => {
    setVal(barState);
  }, [barState])

  return (
    <View style={styles.wrapper}>
      <Progress.Bar style={styles.bar} progress={val} color={theme.colors.text} width={null} />
      <Text style={styles.barText(theme)}>{ `${Math.floor(val * 100)}%` }</Text>
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