import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Category from './Category';

export default function App() {
  const [task, setTask] = useState(1);

  return (
    <View style={styles.container}>
      <Category id={task} />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

// [Design]
// ref: https://dribbble.com/shots/5985329-Do-More-Task-List

// [UI]
// ref: https://velog.io/@usaindream/React-Native-UI-%EA%B4%80%EB%A0%A8
