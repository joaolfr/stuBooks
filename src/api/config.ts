import axios from 'axios'

export type GetBooksQueryParams = {
  inputKeyword: string
  startIndex: number
}

export const fetchBooks = async ({
  inputKeyword,
  startIndex,
}: GetBooksQueryParams) => {
  const { data } = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${inputKeyword}&startIndex=${startIndex}&maxResults=20`,
  )
  console.log('axios', inputKeyword)
  return data
}
