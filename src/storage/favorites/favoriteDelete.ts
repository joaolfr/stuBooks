import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITE_COLLECTION } from '@storage/storageConfig'

import { favoritesGetAll } from './favoritesGetAll'

export async function favoriteDelete(bookToDelete: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storedFavorites = await favoritesGetAll()
    const filteredBooks = storedFavorites.filter(
      (item) => item.title !== bookToDelete,
    )

    await AsyncStorage.setItem(
      FAVORITE_COLLECTION,
      JSON.stringify(filteredBooks),
    )
    // AsyncStorage.clear()
  } catch (error) {
    throw error
  }
}
