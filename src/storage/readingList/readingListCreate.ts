import AsyncStorage from '@react-native-async-storage/async-storage'
import { READING_LIST_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'

import { readingListGetAll } from './readingListGetAll'

type NewBook = {
  title: string
  publisher: string
}

export async function readingListCreate(newFavorites: NewBook) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storedReadingList = await readingListGetAll()
    const bookAlreadyExists = storedReadingList.some(
      (book) => book.title === newFavorites.title,
    )

    if (bookAlreadyExists) {
      console.log('This book already is in your list')
      throw new AppError('This book already is in your list')
    }
    const storage = JSON.stringify([...storedReadingList, newFavorites])
    await AsyncStorage.setItem(READING_LIST_COLLECTION, storage)
    // AsyncStorage.clear()
  } catch (error) {
    throw error
  }
}
