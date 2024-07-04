import { Text } from '@components/Text'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import theme from '@theme/index'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

type VolumeInfo = {
  volumeInfo: {
    title: string
    authors: string[]
    publishedDate: string
    imageLinks: {
      smallThumbnail: string
    }
  }
  isFavorite: boolean | undefined
  press: () => void
  handleFavorite: () => void
  index: number
}

const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity)

export function ListCard({
  volumeInfo,
  press,
  index,
  isFavorite,
  handleFavorite,
}: VolumeInfo) {
  return (
    <TouchableOpacityAnimated
      style={styles.cardWrapper}
      // TODO: this is causing a delay on render more items, bc the app take in consideration the delay for each item
      entering={FadeInDown.duration(200).delay(200 * index)}
      onPress={press}
    >
      <Image
        source={{ uri: volumeInfo.imageLinks?.smallThumbnail }}
        height={theme.PADDING.p8 * 3}
        width={theme.PADDING.p8 * 2}
        alt={volumeInfo.title}
      />
      <View style={styles.insideContainer}>
        <Text size="SM" color={theme.COLORS.GRAY_700} weight="bold">
          {volumeInfo.title}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text size="MD" color={theme.COLORS.GRAY_700}>
            {/* TODO: entender pq ta vindo undefined */}
            {/* {volumeInfo?.publishedDate.slice(0, 4)} ⋅{' '} */}
          </Text>
          <Text size="MD" color={theme.COLORS.GRAY_700}>
            {/* {volumeInfo.authors.map((item, index) =>
              index !== volumeInfo.authors.length - 1
                ? `${item} | `
                : `${item}`,
            )} */}
            {/* {volumeInfo.authors[0]} */}
          </Text>
        </View>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={[isFavorite ? styles.activeFavButton : styles.favButton]}
            onPress={handleFavorite}
          >
            {isFavorite ? (
              <View style={styles.listButtonWrapper}>
                <EvilIcons name="star" size={20} color={theme.COLORS.WHITE} />
                <Text color="white">Remove favorite</Text>
              </View>
            ) : (
              // TODO: the change between status, due to the async list get, sometimes take time, need some feedback
              <View style={styles.listButtonWrapper}>
                <EvilIcons name="star" size={20} color={theme.COLORS.PRIMARY} />

                <Text color={theme.COLORS.PRIMARY}>Add to favorites</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.readingListButton}>
            <Text color={theme.COLORS.WHITE}>Add to reading list</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacityAnimated>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    padding: theme.PADDING.p1,
    marginVertical: theme.PADDING.p1,
    backgroundColor: theme.COLORS.CARD_BG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: theme.PADDING.p6 * 5,
    borderRadius: 8,
  },
  insideContainer: {
    height: '100%',
    flex: 1,
    marginLeft: theme.PADDING.p1,
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activeFavButton: {
    height: theme.PADDING.p6,
    borderRadius: theme.PADDING.p3,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
  },
  favButton: {
    height: theme.PADDING.p6,
    borderRadius: theme.PADDING.p6 / 2,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.WHITE,
  },
  readingListButton: {
    height: theme.PADDING.p6,
    borderRadius: theme.PADDING.p6 / 2,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.SECONDAY,
  },
})
