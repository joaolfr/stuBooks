import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITE_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/error/AppError'
import { EVENT } from '@utils/events'
import track from '@utils/events/config'

import { favoritesGetAll } from './favoritesGetAll'

type NewBook = {
  title: string
  publisher: string
}

export async function favoriteCreate(newFavorites: NewBook) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storedFavorites = await favoritesGetAll()
    const bookAlreadyExists = storedFavorites.some(
      (book) => book.title === newFavorites.title,
    )

    if (bookAlreadyExists) {
      console.log('This book already is in your list')
      throw new AppError('This book already is in your list')
    }
    const storage = JSON.stringify([...storedFavorites, newFavorites])
    await AsyncStorage.setItem(FAVORITE_COLLECTION, storage)
    track(EVENT.BookAddedToFavorites, { data: newFavorites })
  } catch (error) {
    throw error
  }
}
