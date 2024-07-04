import { ListCard } from '@components/ListCard'
import { SearchInput } from '@components/SearchInput'
import { useNavigation, useRoute } from '@react-navigation/native'
import theme from '@theme/index'
import { useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'

type RouteParams = {
  inputKeyword: string
  books: []
}

export function BooksList() {
  const navigation = useNavigation()
  const route = useRoute()
  const { inputKeyword, books } = route.params as RouteParams

  const [input, setInput] = useState(inputKeyword)

  function handlePress() {
    console.log('pressed')
  }
  function handleClose() {
    console.log('closed')
    navigation.goBack()
  }

//   const renderFooter = () => {
//     return (
//       <ActivityIndicator
//         color={theme.COLORS.PRIMARY}
//         size="large"
//         style={styles.loadingIdication}
//       />
//     )
//   }
  return (
    <Animated.View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
      }}
      entering={FadeInDown.duration(300).delay(100)}
      exiting={FadeOutDown.duration(300)}
    >
      <SearchInput
        value={input}
        onChange={setInput}
        submit={handlePress}
        handleClose={handleClose}
      />
      {/* <FlatList
        data={books}
        keyExtractor={(item, index) => `${index}`}
        onEndReached={fetchNextPage}
        ListFooterComponent={renderFooter}
        renderItem={({ item, index }) => (
          <ListCard
            volumeInfo={item.volumeInfo}
            press={() =>
              navigation.navigate('details', { bookInfo: item.volumeInfo })
            }
            handleFavorite={() => handleFavorite(item.volumeInfo)}
            index={index}
            isFavorite={favorites?.some(
              (book) => book.title === item.volumeInfo.title,
            )}
          />
        )}
      /> */}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  loadingIdication: {
    marginVertical: theme.PADDING.p1,
  },
})
