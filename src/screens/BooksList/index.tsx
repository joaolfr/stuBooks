import useBookByISBN from '@api/books/getBookByISBN'
import useBookByKeyword from '@api/books/getBooksByKeyword'
import { ListCard } from '@components/ListCard'
import { SearchInput } from '@components/SearchInput'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import theme from '@theme/index'
import { isValidISBNCode } from '@utils/isISBN'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import useBooksList from './useBooksList'

type RouteParams = {
  inputKeyword: string
  books: []
}

export function BooksList() {
  const navigation = useNavigation()
  const route = useRoute()
  const { inputKeyword, books } = route.params as RouteParams

  const [input, setInput] = useState(inputKeyword)
  const [isISBN, setIsISBN] = useState(false)
  const [booksStore, setBooksStore] = useState(books)
  const { favorites, handleFavorite, fetchFavorites } = useBooksList()

  const { data, refetch, isFetching, isSuccess, isFetched } = useBookByKeyword({
    inputKeyword: input,
    startIndex: 0,
  })

  const {
    data: dataISBN,
    refetch: refetchISBN,
    isFetched: isFetchedISBN,
    isFetching: isFetchingISBN,
  } = useBookByISBN({
    isbn: input,
  })

  // TODO: refactor this logic bellow?

  const handlePress = useCallback(async () => {
    if (isValidISBNCode(input)) {
      setIsISBN(true)
      await refetchISBN()
    } else {
      setIsISBN(false)
      await refetch()
    }
  }, [input, refetch, refetchISBN])

  function handleClose() {
    console.log('closed')
    navigation.goBack()
  }

  const renderFooter = () => {
    return (
      <ActivityIndicator
        color={theme.COLORS.PRIMARY}
        size="large"
        style={styles.loadingIdication}
      />
    )
  }

  const bookiesStore = useMemo(() => {
    console.log('memo', isFetching, isFetchingISBN)
    if (isISBN && isFetchedISBN) {
      console.log('memo1')
      setBooksStore(dataISBN.items)
    }
    if (isFetched) {
      console.log('memo2')
      return data?.pages.reduce((acc, page) => {
        return [...acc, ...page.items]
      }, [])
    }
  }, [data, dataISBN, isFetched, isFetchedISBN, isISBN])

  useEffect(() => {
    if (isISBN) {
      console.log('memo1')
      setBooksStore(dataISBN.items)
    } else {
      console.log('memo2')
      const newData = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.items]
      }, [])
      setBooksStore(newData)
    }
  }, [data, dataISBN])

  useFocusEffect(
    useCallback(() => {
      fetchFavorites()
    }, [fetchFavorites]),
  )

  useEffect(() => {
    const isIt = isValidISBNCode(inputKeyword)
    setIsISBN(isIt)
  }, [])

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
          {isISBN ? (
            <ListCard
              volumeInfo={booksStore[0].volumeInfo}
              press={() =>
                navigation.navigate('details', {
                  bookInfo: booksStore[0].volumeInfo,
                })
              }
              index={1}
              handleFavorite={() => handleFavorite(item.volumeInfo)}
              isFavorite={favorites?.some(
                (book) => book.title === item.volumeInfo.title,
              )}
            />
          ) : (
            <FlatList
              data={booksStore}
              keyExtractor={(item, index) => `${index}`}
              // onEndReached={fetchNextPage}
              ListFooterComponent={renderFooter}
              renderItem={({ item, index }) => (
                <ListCard
                  volumeInfo={item.volumeInfo}
                  press={() =>
                    navigation.navigate('details', {
                      bookInfo: item.volumeInfo,
                    })
                  }
                  index={index}
                  handleFavorite={() => handleFavorite(item.volumeInfo)}
                  isFavorite={favorites?.some(
                    (book) => book.title === item.volumeInfo.title,
                  )}
                />
              )}
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
