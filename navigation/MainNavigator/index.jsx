import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DarkThemes, LightThemes } from '../../global/theme';
import TabNavigator from '../TabNavigator';

export default function MainNavigator() {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkThemes : LightThemes}
      independent={true}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='TabNavigator' component={TabNavigator} />
        {/* ...Add page of SignIn or SignUp */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}