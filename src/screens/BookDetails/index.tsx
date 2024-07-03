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
          <EvilIcons name="chevron-left" size={40} />
          <Text size="LG" color="black">
            back
          </Text>
        </TouchableOpacity>
        <View style={styles.infoCard}>
          <Image
            source={{ uri: bookInfo.imageLinks?.thumbnail }}
            height={135}
            width={95}
            alt={bookInfo.title}
          />
          <View style={styles.headerWrapper}>
            <Text size="SM" color={theme.COLORS.GRAY_700} weight="bold">
              {bookInfo.title}
              {'\n'}
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
                <EvilIcons name="star" size={20} color={'#3092FA'} />
                <Text color={'#3092FA'}>Remove from fav</Text>
              </View>
            ) : (
              <View style={styles.listButtonWrapper}>
                <EvilIcons name="star" size={20} color={'#fff'} />
                <Text>Add to fav</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishButton}>
            <Text>Add to wish</Text>
          </TouchableOpacity>
        </View>
        <Text weight="bold" size="MD" color="black" style={styles.description}>
          About
        </Text>
        {/* TODO: fix text colors around the app */}
        <Text size="MD" color="black">
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
    padding: 15,
    marginVertical: 10,
    backgroundColor: theme.COLORS.CARD_BG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 167,
    borderRadius: 8,
  },
  headerWrapper: {
    height: '100%',
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  detailsText: { flexDirection: 'row', flexWrap: 'wrap' },
  buttonWrapper: {
    width: 259,
    height: 36,
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
    backgroundColor: '#C8E0FA', // TODO: implement the reference to the theme colors
  },
  favButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3092FA', // TODO: implement the reference to the theme colors
  },
  wishButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3092FA',
  },
  description: {
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
})
