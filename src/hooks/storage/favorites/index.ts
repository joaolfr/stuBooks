import {
  favoriteCreate,
  favoriteDelete,
  favoritesGetAll,
} from '@storage/favorites'
import { useState } from 'react'

export default function useFavoritesList() {
  // Favorites
  const [favorites, setFavorites] = useState<VolumeType[]>()

  async function fetchFavorites() {
    try {
      const data = await favoritesGetAll()

      setFavorites(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleFavorite(bookInfo: VolumeType) {
    const isIt = favorites?.some((book) => book.title === bookInfo.title)
    const {
      title,
      description,
      authors,
      imageLinks,
      publishedDate,
      publisher,
    } = bookInfo
    if (isIt) {
      await favoriteDelete(bookInfo.title)
    } else {
      await favoriteCreate({
        title,
        authors,
        imageLinks,
        publishedDate,
        publisher,
        description,
      })
    }

    await fetchFavorites()
  }
  function isFavorite(bookInfo: VolumeType) {
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
