import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITE_COLLECTION } from '@storage/storageConfig'

export async function favoritesGetAll() {
  // eslint-disable-next-line no-useless-catch
  try {
    const storage = await AsyncStorage.getItem(FAVORITE_COLLECTION)

    const favorites: VolumeType[] = storage ? JSON.parse(storage) : []
    // AsyncStorage.clear()
    return favorites
  } catch (error) {
    throw error
  }
}
