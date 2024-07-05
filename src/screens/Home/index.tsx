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
  //
  const [inputKeyword, setInputKeyword] = useState('')
  const [isISBNString, setIsISBNString] = useState(false)
  //
  const { data, refetch, isFetching, isSuccess, isFetched } = useBookByKeyword({
    inputKeyword,
    startIndex,
    isISBNString,
  })

  useEffect(() => {
    if (isValidISBNCode(inputKeyword)) {
      setIsISBNString(true)
    } else {
      setIsISBNString(false)
    }
  }, [inputKeyword])

  const handlePress = useCallback(async () => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (isFetched && data) {
      navigation.navigate('booksList', {
        inputKeyword,
        books: data.pages[0].items,
        isISBNString,
      })
      setInputKeyword('')
    }
  }, [data, isISBNString, isFetched, isSuccess, navigation, inputKeyword])

  return (
    <SafeAreaView mode="margin" style={styles.container}>
      <Animated.View
        exiting={FadeOutUp.duration(500)}
        entering={FadeInUp.duration(1000)}
        style={styles.inputWrapper}
        on
      >
        <Image
          source={require('@assets/logo.png')}
          alt="logo"
          style={styles.logo}
        />
        {/* TODO: implement empty search message? */}
        <SearchInput
          value={inputKeyword}
          onChange={setInputKeyword}
          submit={handlePress}
        />
      </Animated.View>
      {/* <Loading /> */}
      <View style={styles.footer}>
        <Animated.View
          entering={FadeInDown.duration(1000)}
          exiting={FadeOutDown.duration(300)}
        >
          {inputKeyword !== '' && (
            <Button
              type="primary"
              fetching={isFetching}
              onPress={handlePress}
              disabled={isFetching}
            >
              <Text>Search</Text>
            </Button>
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
  logo: {
    marginBottom: theme.PADDING.p8,
  },
  inputWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { width: '100%' },
})
