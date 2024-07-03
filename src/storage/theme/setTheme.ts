import AsyncStorage from '@react-native-async-storage/async-storage'
import { THEME } from '@storage/storageConfig'

type AppTheme = {
  theme: 'dark' | 'light'
}
export async function setTheme(theme: AppTheme) {
  try {
    await AsyncStorage.setItem(THEME, JSON.stringify(theme))
  } catch (error) {
    console.log(error)
  }
}
