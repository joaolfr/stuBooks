import { favoriteDelete } from '@storage/favorites/favoriteDelete'
import { favoritesCreate } from '@storage/favorites/favoritesCreate'
import { favoritesGetAll } from '@storage/favorites/favoritesGetAll'
import { useState } from 'react'

type NewBook = {
  title: string
  publisher: string
}

export default function useHome() {
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

  async function handleFavorite(bookInfo) {
    const isIt = favorites?.some((book) => book.title === bookInfo.title)
    if (isIt) {
      await favoriteDelete(bookInfo.title)
    } else {
      await favoritesCreate({
        title: bookInfo.title,
        publisher: bookInfo.publisher,
      })
    }

    await fetchFavorites()
  }

  return { favorites, handleFavorite, fetchFavorites }
}
