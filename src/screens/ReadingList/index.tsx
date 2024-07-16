import { ListCard } from '@components/ListCard'
import useFavoritesList from '@hooks/storage/favorites'
import useReadingList from '@hooks/storage/readingList'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

type VolumeInfoType = {
  item: VolumeType
  index: number
}

export function ReadingList() {
  const navigation = useNavigation()
  const { handleFavorite, isFavorite, fetchFavorites } = useFavoritesList()
  const { readingList, fetchReadingList, handleReadingList, isInReadingList } =
    useReadingList()

  useFocusEffect(
    useCallback(() => {
      fetchReadingList()
      fetchFavorites()
    }, []),
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={readingList}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }: VolumeInfoType) => (
          <ListCard
            index={index}
            volumeInfo={item}
            press={() =>
              navigation.navigate('bookDetails', {
                bookInfo: item,
              })
            }
            handleFavorite={() => handleFavorite(item)}
            handleReadingList={() => handleReadingList(item)}
            isFavorite={isFavorite(item)}
            isReadingList={isInReadingList(item)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
