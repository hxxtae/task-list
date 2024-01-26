import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskForm from '../../pages/TaskForm';

export default function TaskAddNavigator() {
  const Stack = createNativeStackNavigator();
  const theme = useTheme();
  const headerOptions = {
    headerStyle: {
      backgroundColor: `${theme.colors.text}`
    },
    headerTintColor: `${theme.colors.background}`,
    statusBarColor: `${theme.colors.text}`,
    statusBarStyle: `${theme.dark ? 'dark' : 'light' }`
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name='New Task' options={{...headerOptions}}>
        {() => <TaskForm workKind='add' />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}