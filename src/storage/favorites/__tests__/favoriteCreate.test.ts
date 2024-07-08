import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITE_COLLECTION } from '@storage/storageConfig'
import { waitFor } from '@testing-library/react-native'

const itemData = [
  {
    key: FAVORITE_COLLECTION,
    data: [{ title: 'Test Storage', publisher: 'Test storage' }],
  },
]

describe('Async Storage: Favorite Create', () => {
  it('create a favorite', async () => {
    const testValue = JSON.stringify(itemData[0])
    await AsyncStorage.setItem(itemData[0].key, testValue)

    waitFor(async () => {
      expect(AsyncStorage.getAllKeys).toHaveBeenCalled()
    })

    waitFor(async () => {
      expect(await AsyncStorage.getAllKeys()).toEqual([FAVORITE_COLLECTION])
    })
  })
})
