import useBookdByKeyword from '@api/books/getBooksByKeyword'
import { Button } from '@components/Button'
import { SearchInput } from '@components/SearchInput'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import theme from '@theme/index'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BooksList } from './Components/BooksList'
import useHome from './useHome'

export function Home() {
  const navigation = useNavigation()
  const { favorites, handleFavorite, fetchFavorites } = useHome()

  const [startIndex, setStartIndex] = useState(0)
  const [inputKeyword, setInputKeyword] = useState('React')
  const [random, setRandom] = useState(false)

  const { fetchNextPage, data, refetch, isFetching, isSuccess } =
    useBookdByKeyword({ inputKeyword, startIndex })

  async function handlePress() {
    await refetch()
    setRandom(true)
  }

  const booksStore = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page.items]
    }, [])
  }, [data])

  const [showList, setShowList] = useState(false)

  function handleClose() {
    setShowList(false)
    setRandom(false)
    setInputKeyword('')
  }

  useEffect(() => {
    if (isSuccess && booksStore && random && !isFetching) setShowList(true)
  }, [isSuccess, booksStore, random, isFetching])

  function renderList() {
    return (
      <BooksList
        inputKeyword={inputKeyword}
        setInputKeyword={setInputKeyword}
        handlePress={handlePress}
        handleClose={handleClose}
        booksStore={booksStore}
        favorites={favorites}
        handleFavorite={handleFavorite}
        navigation={navigation}
        fetchNextPage={fetchNextPage}
      />
    )
  }

  useFocusEffect(
    useCallback(() => {
      fetchFavorites()
    }, [fetchFavorites]),
  )

  return (
    <SafeAreaView mode="margin" style={styles.container}>
      {!random && (
        <Animated.View
          exiting={FadeOutUp.duration(300)}
          entering={FadeInUp.duration(1000)}
          style={styles.inputWrapper}
        >
          <Image
            source={require('@assets/logo.png')}
            alt="logo"
            style={styles.logo}
          />

          <SearchInput
            value={inputKeyword}
            onChange={setInputKeyword}
            submit={handlePress}
          />
        </Animated.View>
      )}
      {showList && renderList()}

      {!random && (
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000)}
            exiting={FadeOutDown.duration(300)}
          >
            {/* TODO: for some reason, pressing the button without text is seaching something and not showing anything */}
            <Button type="primary" fetching={isFetching} onPress={handlePress}>
              <Text>Search</Text>
            </Button>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: theme.PADDING.p8,
  },
  inputWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { width: '100%' },
})
