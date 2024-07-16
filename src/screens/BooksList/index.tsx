import useBookByKeyword from '@api/books/getBooksByKeyword'
import { ListCard } from '@components/ListCard'
import LoadingAnimation from '@components/Loading'
import { SearchInput } from '@components/SearchInput'
import { Text } from '@components/Text'
import useFavoritesList from '@hooks/storage/favorites'
import useReadingList from '@hooks/storage/readingList'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import theme from '@theme/index'
import { isValidISBNCode } from '@utils/ISBN/isISBN'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

type VolumeInfoType = {
  item: {
    volumeInfo: VolumeType
  }
  index: number
}
export type RouteParams = {
  books: []
  inputKeyword: string
  isISBNString: boolean
}

export function BooksList() {
  const navigation = useNavigation()
  const route = useRoute()
  const { inputKeyword, books, isISBNString } = route.params as RouteParams
  const [input, setInput] = useState(inputKeyword)
  const [isISBN, setIsISBN] = useState(isISBNString)
  const [booksStore, setBooksStore] = useState(books)
  const { isFavorite, handleFavorite, fetchFavorites } = useFavoritesList()
  const { isInReadingList, handleReadingList, fetchReadingList } =
    useReadingList()

  const { data, refetch, fetchNextPage, isFetching, isSuccess } =
    useBookByKeyword({
      inputKeyword: input,
      startIndex: 0,
      isISBNString: isISBN,
    })

  //

  const handleClose = useCallback(() => {
    setInput('')
    navigation.goBack()
  }, [navigation])

  const handlePress = useCallback(async () => {
    setBooksStore([])
    await refetch()
  }, [refetch])

  const handleNext = useCallback(async () => {
    if (!isISBN) {
      await fetchNextPage()
    }
  }, [isISBN, fetchNextPage])

  //

  useEffect(() => {
    if (isValidISBNCode(input)) {
      setIsISBN(true)
    } else {
      setIsISBN(false)
    }
  }, [input])

  useEffect(() => {
    const newData = data?.pages.reduce((acc, page) => {
      return [...acc, ...page.items]
    }, [])
    setBooksStore(newData)
  }, [data])

  useFocusEffect(
    useCallback(() => {
      fetchFavorites()
      fetchReadingList()
    }, []),
  )

  const renderItem = useCallback(
    ({ item, index }: VolumeInfoType) => {
      return (
        <ListCard
          volumeInfo={item.volumeInfo}
          press={() =>
            navigation.navigate('bookDetails', {
              bookInfo: item.volumeInfo,
            })
          }
          index={index}
          handleFavorite={() => handleFavorite(item.volumeInfo)}
          handleReadingList={() => handleReadingList(item.volumeInfo)}
          isFavorite={isFavorite(item.volumeInfo)}
          isReadingList={isInReadingList(item.volumeInfo)}
        />
      )
    },
    [
      handleFavorite,
      handleReadingList,
      isFavorite,
      isInReadingList,
      navigation,
    ],
  )
  const renderFooter = useCallback(() => {
    return isISBN ? (
      <Text color={theme.COLORS.GRAY_200}>End of list</Text>
    ) : (
      <ActivityIndicator
        color={theme.COLORS.PRIMARY}
        size="large"
        style={styles.loadingIdication}
      />
    )
  }, [isISBN])

  return (
    <SafeAreaView mode="margin" style={styles.container}>
      <View>
        <Animated.View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
          }}
          entering={FadeInDown.duration(500).delay(100)}
          exiting={FadeOutDown.duration(300)}
        >
          <SearchInput
            value={input}
            onChange={setInput}
            submit={handlePress}
            handleClose={handleClose}
          />

          {isFetching && booksStore.length === 0 && (
            <View style={{ width: 300, height: 300 }}>
              <LoadingAnimation />
            </View>
          )}
          {isSuccess && booksStore.length > 0 && (
            <FlatList
              data={booksStore}
              keyExtractor={(item, index) => `${index}`}
              onEndReached={handleNext}
              removeClippedSubviews
              maxToRenderPerBatch={5}
              ListFooterComponent={renderFooter}
              renderItem={({ item, index }: VolumeInfoType) =>
                renderItem({ item, index })
              }
            />
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIdication: {
    marginVertical: theme.PADDING.p1,
  },
})
