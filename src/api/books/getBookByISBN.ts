import { api } from '@api/config'
import { useQuery } from '@tanstack/react-query'

type GetBooksQueryParams = {
  isbn: string
}

const fetchBooks = async ({ isbn }: GetBooksQueryParams) => {
  const { data } = await api.get(`isbn:${isbn}`)
  console.log('data', data.items[0].volumeInfo.title)
  return data
}

export const useBookdByISBN = (params: GetBooksQueryParams) => {
  return useQuery({
    queryKey: ['booksByISBN', params],
    queryFn: () => {
      return fetchBooks(params)
    },
    // enabled: false,
  })
}

export default useBookdByISBN
