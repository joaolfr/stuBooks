import AsyncStorage from '@react-native-async-storage/async-storage'
import { READING_LIST_COLLECTION } from '@storage/storageConfig'

import { readingListGetAll } from './readingListGetAll'

export async function readingListDelete(bookToDelete: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const storedReadingList = await readingListGetAll()
    const filteredBooks = storedReadingList.filter(
      (item) => item.title !== bookToDelete,
    )

    await AsyncStorage.setItem(
      READING_LIST_COLLECTION,
      JSON.stringify(filteredBooks),
    )
    // AsyncStorage.clear()
  } catch (error) {
    throw error
  }
}
