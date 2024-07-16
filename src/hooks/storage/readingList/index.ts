import {
  readingListCreate,
  readingListDelete,
  readingListGetAll,
} from '@storage/readingList'
import { useState } from 'react'

export default function useReadingList() {
  const [readingList, setReadingList] = useState<VolumeType[]>()

  async function fetchReadingList() {
    try {
      const data = await readingListGetAll()
      setReadingList(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleReadingList(bookInfo: VolumeType) {
    const isIt = readingList?.some((book) => book.title === bookInfo.title)
    const {
      title,
      authors,
      description,
      imageLinks,
      publishedDate,
      publisher,
    } = bookInfo

    if (isIt) {
      await readingListDelete(bookInfo.title)
    } else {
      await readingListCreate({
        title,
        authors,
        imageLinks,
        publishedDate,
        publisher,
        description,
      })
    }

    await fetchReadingList()
  }

  function isInReadingList(bookInfo: VolumeType) {
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
