import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';

import { DarkThemes, LightThemes } from './global/theme';
import Task from './pages/Task';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <RecoilRoot>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkThemes : LightThemes}>
        <Task />
      </NavigationContainer>
    </RecoilRoot>
  );
}

// [Design]
// ref1: https://dribbble.com/shots/5985329-Do-More-Task-List
// ref2: https://dribbble.com/shots/5985359-Do-More-Task-List-Options
// ref3: https://dribbble.com/shots/5985372-Do-More-Task-Details


// [UI]
// ref: https://velog.io/@usaindream/React-Native-UI-%EA%B4%80%EB%A0%A8
