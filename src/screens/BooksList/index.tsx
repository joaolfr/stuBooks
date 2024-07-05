import useBookByKeyword from '@api/books/getBooksByKeyword'
import { ListCard } from '@components/ListCard'
import LoadingAnimation from '@components/Loading'
import { SearchInput } from '@components/SearchInput'
import { Text } from '@components/Text'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import theme from '@theme/index'
import { isValidISBNCode } from '@utils/isISBN'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import useBooksList from './useBooksList'

type RouteParams = {
  inputKeyword: string
  books: []
  isISBNString: boolean
}
type TestTypes = {
  item: {
    volumeInfo: {
      title: string
      authors: string[]
      publishedDate: string
      imageLinks: {
        thumbnail: string
      }
    }
  }
  index: number
}

export function BooksList() {
  const navigation = useNavigation()
  const route = useRoute()
  const { inputKeyword, books, isISBNString } = route.params as RouteParams

  const [input, setInput] = useState(inputKeyword)
  const [isISBN, setIsISBN] = useState(isISBNString)
  const [booksStore, setBooksStore] = useState(books)
  const {
    favorites,
    handleFavorite,
    fetchFavorites,
    readingList,
    handleReadingList,
    fetchReadingList,
  } = useBooksList()

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
    ({ item, index }: TestTypes) => {
      return (
        <ListCard
          volumeInfo={item.volumeInfo}
          press={() =>
            navigation.navigate('details', {
              bookInfo: item.volumeInfo,
            })
          }
          index={index}
          handleFavorite={() => handleFavorite(item.volumeInfo)}
          handleReadingList={() => handleReadingList(item.volumeInfo)}
          isFavorite={favorites?.some(
            (book) => book.title === item.volumeInfo.title,
          )}
          isReadingList={readingList?.some(
            (book) => book.title === item.volumeInfo.title,
          )}
        />
      )
    },
    [favorites, handleFavorite, handleReadingList, navigation, readingList],
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
              renderItem={({ item, index }: TestTypes) =>
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
