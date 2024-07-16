import { CustomImage } from '@components/CustomImage'
import { Text } from '@components/Text'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import FeatherIcons from '@expo/vector-icons/Feather'
import theme from '@theme/index'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

type VolumeInfo = {
  volumeInfo: VolumeType
  isFavorite: boolean | undefined
  isReadingList: boolean | undefined
  press: () => void
  handleFavorite: () => void
  handleReadingList: () => void
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
  isReadingList,
  handleReadingList,
}: VolumeInfo) {
  return (
    <TouchableOpacityAnimated
      style={styles.cardWrapper}
      entering={FadeInDown.duration(200).delay(100 * (index < 5 ? index : 5))}
      onPress={press}
    >
      <View style={styles.bookThumbnail}>
        <CustomImage
          url={volumeInfo.imageLinks?.thumbnail}
          alt={volumeInfo.title}
        />
      </View>
      <View style={styles.insideContainer}>
        <Text size="MD" color={theme.COLORS.GRAY_700} weight="bold">
          {volumeInfo.title}
        </Text>
        <View style={styles.subInformation}>
          <Text size="MD" color={theme.COLORS.GRAY_700}>
            {volumeInfo?.publishedDate?.slice(0, 4)} ⋅{' '}
          </Text>
          <Text size="MD" color={theme.COLORS.GRAY_700}>
            {volumeInfo.authors?.map((item, index) =>
              index !== volumeInfo.authors.length - 1
                ? `${item} | `
                : `${item}`,
            )}
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
                <Text weight="bold" color={theme.COLORS.WHITE}>
                  Remove favorite
                </Text>
              </View>
            ) : (
              <View style={styles.listButtonWrapper}>
                <EvilIcons name="star" size={20} color={theme.COLORS.PRIMARY} />

                <Text weight="bold" color={theme.COLORS.PRIMARY}>
                  Add to favorites
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReadingList}
            style={[
              isReadingList
                ? styles.activeReadingButton
                : styles.readingListButton,
            ]}
          >
            {isReadingList ? (
              <View style={styles.listButtonWrapper}>
                <FeatherIcons name="bookmark" color={theme.COLORS.WHITE} />

                <Text weight="bold" color={theme.COLORS.WHITE}>
                  Remove from list
                </Text>
              </View>
            ) : (
              <View style={styles.listButtonWrapper}>
                <FeatherIcons name="bookmark" color={theme.COLORS.SECONDARY} />

                <Text weight="bold" color={theme.COLORS.SECONDARY}>
                  Add to reading list
                </Text>
              </View>
            )}
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
  bookThumbnail: {
    height: theme.PADDING.p8 * 3,
    width: theme.PADDING.p8 * 2,
  },
  subInformation: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonsWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
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
    borderRadius: theme.PADDING.p3,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.WHITE,
  },
  activeReadingButton: {
    height: theme.PADDING.p6,
    borderRadius: theme.PADDING.p6 / 2,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.SECONDARY,
  },
  readingListButton: {
    height: theme.PADDING.p6,
    borderRadius: theme.PADDING.p6 / 2,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.WHITE,
  },
})
