import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, useColorScheme, TouchableOpacity, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import Category from './Category';
import { RecoilRoot, useRecoilState } from 'recoil';
import { themeState } from './global/atom';

const LightThemes = {
  ...DefaultTheme,
  primary: '#597EDB',
  secondary: '#BCBCBC',
  background: '#FFFFFF',
  text: '#111111',
  card: '#E7E7E7',
}

const DarkThemes = {
  ...DarkTheme,
  primary: '#597EDB',
  secondary: '#767676',
  background: '#111111',
  text: '#ffffff',
  card: '#121519',
}

export default function App() {
  const [task, setTask] = useState(1);
  const colorScheme = useColorScheme();
  const colors = useTheme();

  const handleCategory = (id) => {
    setTask(id);
  }

  return (
    <RecoilRoot>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkThemes : LightThemes}>
        <View style={styles.container}>
          <Category id={task} handleCategory={handleCategory} />
          <StatusBar style="light" />
        </View>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});

// [Design]
// ref1: https://dribbble.com/shots/5985329-Do-More-Task-List
// ref2: https://dribbble.com/shots/5985359-Do-More-Task-List-Options
// ref3: https://dribbble.com/shots/5985372-Do-More-Task-Details


// [UI]
// ref: https://velog.io/@usaindream/React-Native-UI-%EA%B4%80%EB%A0%A8
