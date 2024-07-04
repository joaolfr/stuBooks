import useBookByISBN from '@api/books/getBookByISBN'
import useBookByKeyword from '@api/books/getBooksByKeyword'
import { Button } from '@components/Button'
import { SearchInput } from '@components/SearchInput'
import { useNavigation } from '@react-navigation/native'
import theme from '@theme/index'
import { isValidISBNCode } from '@utils/isISBN'
import { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const startIndex = 0

export function Home() {
  const navigation = useNavigation()
  const [inputKeyword, setInputKeyword] = useState('9781786469571')
  const { data, refetch, isFetching, isSuccess, isFetched } = useBookByKeyword({
    inputKeyword,
    startIndex,
  })

  const {
    data: dataISBN,
    refetch: refetchISBN,
    isFetched: isFetchedISBN,
    isFetching: isFetchingISBN,
  } = useBookByISBN({
    isbn: inputKeyword,
  })

  // TODO: refactor this logic bellow?

  const handlePress = useCallback(async () => {
    if (isValidISBNCode(inputKeyword)) {
      await refetchISBN()
    } else {
      await refetch()
    }
  }, [inputKeyword, refetch, refetchISBN])
  useEffect(() => {
    if (isValidISBNCode(inputKeyword) && isFetchedISBN) {
      navigation.navigate('booksList', { inputKeyword, books: dataISBN.items })
      setInputKeyword('')
    }
    if (isFetched && data) {
      navigation.navigate('booksList', {
        inputKeyword,
        books: data.pages[0].items,
      })
      setInputKeyword('')
    }
  }, [
    data,
    dataISBN,
    inputKeyword,
    isFetched,
    isFetchedISBN,
    isSuccess,
    navigation,
  ])

  return (
    <SafeAreaView mode="margin" style={styles.container}>
      <Animated.View
        exiting={FadeOutUp.duration(500)}
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

      <View style={styles.footer}>
        <Animated.View
          entering={FadeInDown.duration(1000)}
          exiting={FadeOutDown.duration(300)}
        >
          {/* TODO: for some reason, pressing the button without text is seaching something and not showing anything */}
          <Button
            type="primary"
            fetching={isFetching || isFetchingISBN}
            onPress={handlePress}
          >
            <Text>Search</Text>
          </Button>
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
  logo: {
    marginBottom: theme.PADDING.p8,
  },
  inputWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { width: '100%' },
})
