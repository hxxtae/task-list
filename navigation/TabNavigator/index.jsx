import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Entypo, Feather } from '@expo/vector-icons';

import TaskForm from '../../pages/TaskForm';
import TaskNavigator from '../TaskNavigator';

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: `${theme.colors.text}`,
        tabBarActiveBackgroundColor: `${theme.colors.background}`,
        tabBarInactiveBackgroundColor: `${theme.colors.background}`,
      }}
      initialRouteName='TaskNavigator'>
      <Tab.Screen
        name='TaskNavigator'
        component={TaskNavigator}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo name="list" size={24} color={focused ? theme.colors.text : theme.colors.secondary} />
          ),
        }}
      />
      <Tab.Screen
        name='TaskAdd'
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: `${theme.colors.text}`
          },
          headerTintColor: `${theme.colors.background}`,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="plus-square" size={24} color={focused ? theme.colors.text : theme.colors.secondary} />
          ),
        }}>
          {() => <TaskForm workKind='add' />}
        </Tab.Screen>
    </Tab.Navigator>
  )
}