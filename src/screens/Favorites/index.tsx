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

export function Favorites() {
  const navigation = useNavigation()
  const { favorites, fetchFavorites, handleFavorite, isFavorite } =
    useFavoritesList()
  const { handleReadingList, isInReadingList, fetchReadingList } =
    useReadingList()

  useFocusEffect(
    useCallback(() => {
      fetchFavorites()
      fetchReadingList()
    }, []),
  )
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
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
