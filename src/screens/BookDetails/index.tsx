import { Text } from '@components/Text'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { favoriteDelete } from '@storage/favorites/favoriteDelete'
import { favoritesCreate } from '@storage/favorites/favoritesCreate'
import { favoritesGetAll } from '@storage/favorites/favoritesGetAll'
import theme from '@theme/index'
import React, { useEffect, useState } from 'react'
import {
  Image,
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

export function Details() {
  const navigation = useNavigation()
  const route = useRoute()
  const { bookInfo } = route.params as RouteParams

  const [isFavorite, setIsFavorite] = useState(false)

  async function fetchFavorites() {
    try {
      const data = await favoritesGetAll()
      const isIt = data?.some((book) => book.title === bookInfo.title)
      setIsFavorite(isIt)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleFavorite() {
    if (isFavorite) {
      await favoriteDelete(bookInfo.title)
    } else {
      await favoritesCreate({
        title: bookInfo.title,
        // TODO: mudar esse publisher
        publisher: bookInfo.publisher,
      })
    }

    await fetchFavorites()
  }

  useEffect(() => {
    fetchFavorites()
  })

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
          <Image
            source={{ uri: bookInfo.imageLinks?.thumbnail }}
            height={theme.PADDING.p6 * 5}
            width={theme.PADDING.p7 * 3}
            alt={bookInfo.title}
          />
          <View style={styles.headerWrapper}>
            <Text size="SM" color={theme.COLORS.GRAY_700} weight="bold">
              {bookInfo.title}
            </Text>
            <View style={styles.detailsText}>
              <Text size="MD" color={theme.COLORS.GRAY_700}>
                {bookInfo.publishedDate.slice(0, 4)} ⋅{' '}
              </Text>
              <Text size="MD" color={theme.COLORS.GRAY_700}>
                {bookInfo.authors[0]}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[isFavorite ? styles.activeFavButton : styles.favButton]}
            onPress={handleFavorite}
          >
            {isFavorite ? (
              <View style={styles.listButtonWrapper}>
                <EvilIcons name="star" size={20} color={theme.COLORS.PRIMARY} />
                <Text color={theme.COLORS.PRIMARY}>Remove from fav</Text>
              </View>
            ) : (
              <View style={styles.listButtonWrapper}>
                <EvilIcons name="star" size={20} color={theme.COLORS.WHITE} />
                <Text>Add to fav</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishButton}>
            <Text>Add to wish</Text>
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
        {/* TODO: fix text colors around the app */}
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
    justifyContent: 'space-between',
  },
  activeFavButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.STANDART, // TODO: implement the reference to the theme colors
  },
  favButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.PRIMARY, // TODO: implement the reference to the theme colors
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
