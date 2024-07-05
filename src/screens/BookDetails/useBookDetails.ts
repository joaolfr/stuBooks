import {
  favoriteCreate,
  favoriteDelete,
  favoritesGetAll,
} from '@storage/favorites'
import {
  readingListCreate,
  readingListDelete,
  readingListGetAll,
} from '@storage/readingList'
import { useState } from 'react'

type NewBook = {
  title: string
  publisher: string
}

export default function useBookDetail() {
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
      await favoriteCreate({
        title: bookInfo.title,
        publisher: bookInfo.publisher,
      })
    }

    await fetchFavorites()
  }

  async function isFavorite(bookInfo){
    const isIt = favorites?.some((book) => book.title === bookInfo.title)
    return isIt
  }

  // Reading List

  const [readingList, setReadingList] = useState<NewBook[]>()

  async function fetchReadingList() {
    try {
      const data = await readingListGetAll()
      setReadingList(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleReadingList(bookInfo) {
    const isIt = readingList?.some((book) => book.title === bookInfo.title)
    if (isIt) {
      await readingListDelete(bookInfo.title)
    } else {
      await readingListCreate({
        title: bookInfo.title,
        publisher: bookInfo.publisher,
      })
    }

    await fetchReadingList()
  }
  return {
    favorites,
    handleFavorite,
    fetchFavorites,
    isFavorite,
    readingList,
    handleReadingList,
    fetchReadingList,
  }
}
