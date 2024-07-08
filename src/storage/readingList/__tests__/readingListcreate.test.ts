import AsyncStorage from '@react-native-async-storage/async-storage'
import { READING_LIST_COLLECTION } from '@storage/storageConfig'
import { waitFor } from '@testing-library/react-native'

const itemData = [
  {
    key: READING_LIST_COLLECTION,
    data: [{ title: 'Test Storage', publisher: 'Test storage' }],
  },
]

describe('Async Storage: Reading List Create', () => {
  it('create a new item on reading list', async () => {
    const testValue = JSON.stringify(itemData[0])
    await AsyncStorage.setItem(itemData[0].key, testValue)

    waitFor(async () => {
      expect(AsyncStorage.getAllKeys).toHaveBeenCalled()
    })

    waitFor(async () => {
      expect(await AsyncStorage.getAllKeys()).toEqual([READING_LIST_COLLECTION])
    })
  })
})
