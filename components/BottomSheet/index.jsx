import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
} from 'react-native';

// NOTE: ESLint Props
BottomSheet.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  children: PropTypes.element
}

export function BottomSheet({
  modalVisible,
  setModalVisible,
  height,
  children
}) {
  const theme = useTheme();
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  
  // NOTE: Animate Value -> toValue (1)
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  // NOTE: Animate Value -> toValue (2)
  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });
  
  // NOTE: Touch Value
  const panResponders = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: (event, gestureState) => {
      panY.setValue(gestureState.dy);
    },
    onPanResponderRelease: (event, gestureState) => {
      if(gestureState.dy > 0 && gestureState.vy > 1.5) {
        closeModal();
      }
      else {
        resetBottomSheet.start();
      }
    }
  })).current;

  useEffect(()=>{
    if(modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background}/>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{...styles.bottomSheetContainer(height, theme), transform: [{ translateY: translateY }]}}
          {...panResponders.panHandlers}>
          {React.cloneElement(children, { closeModal })}
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: (height, theme) => ({
    height: height ?? 0,
    backgroundColor: `${theme.colors.card}`,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  })
})

export default BottomSheet;

