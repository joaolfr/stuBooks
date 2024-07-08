import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITE_COLLECTION } from '@storage/storageConfig'
import { waitFor } from '@testing-library/react-native'

const itemData = [
  {
    key: FAVORITE_COLLECTION,
    data: [{ title: 'Test Storage', publisher: 'Test storage' }],
  },
]

describe('Async Storage: Favorite Get All', () => {
  beforeEach(async () => {
    jest.spyOn(AsyncStorage, 'getItem')
    const testValue1 = JSON.stringify(itemData[0])

    await AsyncStorage.setItem(itemData[0].key, testValue1)

    waitFor(async () => {
      expect(AsyncStorage.getItem(FAVORITE_COLLECTION)).toHaveBeenCalled()
    })
  })
  it('retrieves items stored', () => {
    waitFor(async () => {
      expect(await AsyncStorage.getItem(FAVORITE_COLLECTION)).toEqual(
        JSON.stringify({ title: 'Test Storage', publisher: 'Test storage' }),
      )
    })
  })
})
