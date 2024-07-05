import {
  favoriteCreate,
  favoriteDelete,
  favoritesGetAll,
} from '@storage/favorites'
import { useState } from 'react'

type NewBook = {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string
  imageLinks: {
    thumbnail: string
  }
}

export default function useFavoritesList() {
  // Favorites
  const [favorites, setFavorites] = useState<NewBook[]>()

  async function fetchFavorites() {
    try {
      const data = await favoritesGetAll()

      setFavorites(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleFavorite(bookInfo: NewBook) {
    const isIt = favorites?.some((book) => book.title === bookInfo.title)
    if (isIt) {
      await favoriteDelete(bookInfo.title)
    } else {
      await favoriteCreate({
        title: bookInfo.title,
        publisher: bookInfo.publisher,
      })
    }

    await fetchFavorites()
  }
  function isFavorite(bookInfo: NewBook) {
    const isIt = favorites?.some((book) => book.title === bookInfo.title)
    return isIt
  }
  return {
    favorites,
    handleFavorite,
    fetchFavorites,
    isFavorite,
  }
}
