import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITE_COLLECTION } from '@storage/storageConfig'

type NewBook = {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  imageLinks: {
    thumbnail: string
  }
}
export async function favoritesGetAll() {
  // eslint-disable-next-line no-useless-catch
  try {
    const storage = await AsyncStorage.getItem(FAVORITE_COLLECTION)

    const favorites: NewBook[] = storage ? JSON.parse(storage) : []
    // AsyncStorage.clear()
    return favorites
  } catch (error) {
    throw error
  }
}
