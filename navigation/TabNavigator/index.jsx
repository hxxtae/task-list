import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Entypo, Feather } from '@expo/vector-icons';

import TaskNavigator from '../TaskNavigator';
import TaskAddNavigator from '../TaskAddNavigator';

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
        name='TaskAddNavigator'
        component={TaskAddNavigator}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="plus-square" size={24} color={focused ? theme.colors.text : theme.colors.secondary} />
          ),
        }} />
    </Tab.Navigator>
  )
}