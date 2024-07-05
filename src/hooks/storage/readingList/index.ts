import {
  readingListCreate,
  readingListDelete,
  readingListGetAll,
} from '@storage/readingList'
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

export default function useReadingList() {
  const [readingList, setReadingList] = useState<NewBook[]>()

  async function fetchReadingList() {
    try {
      const data = await readingListGetAll()
      setReadingList(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleReadingList(bookInfo: NewBook) {
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

  function isInReadingList(bookInfo: NewBook) {
    const isIt = readingList?.some((book) => book.title === bookInfo.title)
    return isIt
  }
  return {
    readingList,
    handleReadingList,
    fetchReadingList,
    isInReadingList,
  }
}
