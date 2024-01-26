import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

import Task from '../../pages/Task';
import TaskForm from '../../pages/TaskForm';
import CategoryForm from '../../pages/CategoryForm';

export default function TaskNavigator() {
  const Stack = createNativeStackNavigator();
  const theme = useTheme();
  const headerOptions = {
    headerStyle: {
      backgroundColor: `${theme.colors.text}`
    },
    headerTintColor: `${theme.colors.background}`,
  }

  return (
    <Stack.Navigator initialRouteName='Task'>
      <Stack.Screen
        name='Task'
        component={Task}
        options={{
          headerShown: false,
          statusBarColor: `${theme.colors.background}`,
          statusBarStyle: 'dark'
        }} />
      <Stack.Screen name='TaskEdit' options={{...headerOptions}}>
        {() => <TaskForm workKind='edit' />}
      </Stack.Screen>
      <Stack.Screen name='CategoryAdd' options={{...headerOptions}}>
        {() => <CategoryForm workKind='add' />}
      </Stack.Screen>
      <Stack.Screen name='CategoryEdit' options={{...headerOptions}}>
        {() => <CategoryForm workKind='edit' />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
