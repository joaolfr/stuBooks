import { CustomImage } from '@components/CustomImage'
import { Text } from '@components/Text'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import FeatherIcons from '@expo/vector-icons/Feather'
import useFavoritesList from '@hooks/storage/favorites'
import useReadingList from '@hooks/storage/readingList'
import { useNavigation, useRoute } from '@react-navigation/native'
import theme from '@theme/index'
import { useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

type ObjectInfo = {
  title: string
  description: string
  publisher: string
  publishedDate: string
  authors: string[]
  imageLinks: { thumbnail: string }
}

type RouteParams = {
  bookInfo: ObjectInfo
}

export function BookDetails() {
  const navigation = useNavigation()
  const route = useRoute()
  const { bookInfo } = route.params as RouteParams

  const { isFavorite, handleFavorite, fetchFavorites } = useFavoritesList()
  const { isInReadingList, handleReadingList, fetchReadingList } =
    useReadingList()

  useEffect(() => {
    fetchFavorites()
    fetchReadingList()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.containerStyle}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
        >
          <EvilIcons
            name="chevron-left"
            size={40}
            color={theme.COLORS.GRAY_700}
          />
          <Text size="LG" color={theme.COLORS.GRAY_700}>
            back
          </Text>
        </TouchableOpacity>
        <View style={styles.infoCard}>
          <View style={styles.bookThumbnail}>
            <CustomImage
              url={bookInfo.imageLinks?.thumbnail}
              alt={bookInfo.title}
            />
          </View>
          <View style={styles.headerWrapper}>
            <Text size="SM" color={theme.COLORS.GRAY_700} weight="bold">
              {bookInfo.title}
            </Text>
            <View style={styles.detailsText}>
              <Text size="MD" color={theme.COLORS.GRAY_700}>
                {bookInfo.publishedDate?.slice(0, 4)} ⋅{' '}
              </Text>
              <Text size="MD" color={theme.COLORS.GRAY_700}>
                {bookInfo.authors?.map((item, index) =>
                  index !== bookInfo.authors.length - 1
                    ? `${item} | `
                    : `${item}`,
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[
              isFavorite(bookInfo) ? styles.activeFavButton : styles.favButton,
            ]}
            onPress={() => handleFavorite(bookInfo)}
          >
            {isFavorite(bookInfo) ? (
              <View style={styles.listButtonWrapper}>
                <EvilIcons name="star" size={20} color={theme.COLORS.PRIMARY} />
                <Text weight="bold" color={theme.COLORS.PRIMARY}>
                  Remove favorite
                </Text>
              </View>
            ) : (
              <View style={styles.listButtonWrapper}>
                <EvilIcons name="star" size={20} color={theme.COLORS.WHITE} />
                <Text weight="bold">Add to favorites</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleReadingList(bookInfo)}
            style={[
              isInReadingList(bookInfo)
                ? styles.activeWishButton
                : styles.wishButton,
            ]}
          >
            {isInReadingList(bookInfo) ? (
              <View style={styles.listButtonWrapper}>
                <FeatherIcons name="bookmark" color={theme.COLORS.PRIMARY} />
                <Text weight="bold" color={theme.COLORS.PRIMARY}>
                  Remove from list
                </Text>
              </View>
            ) : (
              <View style={styles.listButtonWrapper}>
                <FeatherIcons name="bookmark" color={theme.COLORS.WHITE} />
                <Text weight="bold">Add to reading list</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <Text
          weight="bold"
          size="MD"
          color={theme.COLORS.GRAY_700}
          style={styles.description}
        >
          About
        </Text>
        <Text size="MD" color={theme.COLORS.GRAY_700}>
          {bookInfo.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoCard: {
    padding: theme.PADDING.p3,
    marginVertical: theme.PADDING.p1,
    backgroundColor: theme.COLORS.CARD_BG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: theme.PADDING.p8 * 4,
    borderRadius: 8,
  },
  bookThumbnail: {
    height: theme.PADDING.p8 * 3,
    width: theme.PADDING.p8 * 2,
  },
  headerWrapper: {
    height: '100%',
    flex: 1,
    marginLeft: theme.PADDING.p1,
    justifyContent: 'space-between',
  },
  detailsText: { flexDirection: 'row', flexWrap: 'wrap' },
  buttonWrapper: {
    width: theme.PADDING.p7 * 8,
    height: theme.PADDING.p8,
    borderRadius: 22,
    flexDirection: 'row',
    top: -20,
    zIndex: 5,
    overflow: 'hidden',
  },
  listButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
  },

  activeFavButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.STANDART,
  },
  favButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
    borderRightColor: theme.COLORS.WHITE,
    borderRightWidth: 1,
  },
  activeWishButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.STANDART,
  },
  wishButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
  },
  description: {
    alignSelf: 'flex-start',
    marginVertical: theme.PADDING.p1,
  },
})
