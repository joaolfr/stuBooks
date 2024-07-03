import { ListCard } from '@components/ListCard'
import { SearchInput } from '@components/SearchInput'
import { ActivityIndicator, FlatList } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'

export function BooksList({
  inputKeyword,
  setInputKeyword,
  handlePress,
  handleClose,
  booksStore,
  favorites,
  handleFavorite,
  navigation,
  fetchNextPage,
}) {
  const renderFooter = () => {
    return (
      <ActivityIndicator
        color="red"
        size="large"
        style={{ marginVertical: 10 }}
      />
    )
  }
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
        value={inputKeyword}
        onChange={setInputKeyword}
        submit={handlePress}
        handleClose={handleClose}
      />
      <FlatList
        data={booksStore}
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
      />
    </Animated.View>
  )
}
