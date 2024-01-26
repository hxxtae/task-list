import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const LightThemes = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#597EDB',
    secondary: '#BCBCBC',
    background: '#FFFFFF',
    text: '#111111',
    card: '#E7E7E7',
  },
}

export const DarkThemes = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#597EDB',
    secondary: '#767676',
    background: '#111111',
    text: '#ffffff',
    card: '#121519',
  }
}