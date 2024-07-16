import AsyncStorage from '@react-native-async-storage/async-storage'
import { READING_LIST_COLLECTION } from '@storage/storageConfig'

export async function readingListGetAll() {
  // eslint-disable-next-line no-useless-catch
  try {
    const storage = await AsyncStorage.getItem(READING_LIST_COLLECTION)

    const readingList: VolumeType[] = storage ? JSON.parse(storage) : []
    return readingList
  } catch (error) {
    throw error
  }
}
