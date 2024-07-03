import AsyncStorage from '@react-native-async-storage/async-storage'
import { THEME } from '@storage/storageConfig'

export async function getTheme() {
  try {
    const theme = await AsyncStorage.getItem(THEME)
    return JSON.parse(theme || '')
  } catch (error) {
    console.log(error)
  }
}
