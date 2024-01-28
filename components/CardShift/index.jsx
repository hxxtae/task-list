import React, { useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';

CardShift.propTypes = {
  checkedState: PropTypes.bool.isRequired,
  setCheckedState: PropTypes.func.isRequired,
  children: PropTypes.element
}

export default function CardShift({ checkedState, setCheckedState, children }) {
  const theme = useTheme();
  const [isChecked, setChecked] = useState(checkedState);
  const panX = useRef(new Animated.Value(0)).current;
  const translateX = panX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetCardShift = Animated.timing(panX, {
    toValue: 0,
    duration: 400,
    delay: 100,
    useNativeDriver: true,
  });

  const openCardShift = Animated.timing(panX, {
    toValue: 80,
    duration: 100,
    useNativeDriver: true,
  });

  const panResponders = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.vx < .5) return;
      panX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx >= 40) {
        openCardShift.start();
      }
      else {
        resetCardShift.start();
      }
    }
  })).current;

  const handleOfCheck = () => {
    setChecked((prev) => {
      setCheckedState(!prev);
      return !prev;
    });
    resetCardShift.start();
  }
  
  return (
    <View style={styles.wrapper}>
      <View style={styles.checkBoxContainer}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={handleOfCheck} color={theme.colors.text} />
      </View>
      <Animated.View
        style={{...styles.cardShiftContainer, transform: [{ translateX: translateX }]}}
        {...panResponders.panHandlers}>
        {React.cloneElement(children, { isChecked })}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkBoxContainer: {
    position: 'absolute',
    left: 0,
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7e7e7',
    borderRadius: 7,
  },
  checkbox: {
    width: 28,
    height: 28,
  },
  cardShiftContainer: {
    flex: 1,
    width: '100%',
  }
});