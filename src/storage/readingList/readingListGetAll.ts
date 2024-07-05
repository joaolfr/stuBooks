import AsyncStorage from '@react-native-async-storage/async-storage'
import { READING_LIST_COLLECTION } from '@storage/storageConfig'

// TODO change the type for reading list?
type NewBook = {
  title: string
  publisher: string
}
export async function readingListGetAll() {
  // eslint-disable-next-line no-useless-catch
  try {
    const storage = await AsyncStorage.getItem(READING_LIST_COLLECTION)

    const readingList: NewBook[] = storage ? JSON.parse(storage) : []
    // AsyncStorage.clear()
    return readingList
  } catch (error) {
    throw error
  }
}
