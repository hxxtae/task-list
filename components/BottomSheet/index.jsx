import { useTheme } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  ScrollView,
  Pressable
} from 'react-native';

export function BottomSheet({ modalVisible, setModalVisible, data, setData }) {
  const theme = useTheme();
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 150,
    useNativeDriver: true,
  });

  const panResponders = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: (event, gestureState) => {
      panY.setValue(gestureState.dy);
    },
    onPanResponderRelease: (event, gestureState) => {
      if(gestureState.dy > 0 && gestureState.vy > 1.5) {
        closeModalDrag();
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

  const closeModalDrag = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const closeModal = ({ id }) => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
      if(id) setData(id);
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
          style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
          {...panResponders.panHandlers}>
          <View style={styles.bottomSheetWrapper}>
            <Entypo name="chevron-small-down" size={30} color={theme.text} />
            <ScrollView style={styles.bottomSheetUl}>
              {Object.keys(data).slice(0).map(id => (
                <Pressable key={id} style={styles.bottomSheetLi} onPress={() => closeModal({ id })}>
                  <Text style={styles.bottomSheetText(theme)}>{data[id].title}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
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
  bottomSheetContainer: {
    height: 300,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomSheetWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetUl: {
    width: '100%',
    paddingHorizontal: 24,
  },
  bottomSheetLi: {
    alignItems: 'flex-start',
    paddingVertical: 8,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#111',
  },
  bottomSheetText: (theme) => ({
    fontSize: 20,
    fontWeight: '500',
    color: `${theme.text}`,
  })
})

export default BottomSheet;
