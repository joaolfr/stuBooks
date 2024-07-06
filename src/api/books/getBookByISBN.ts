import { api } from '@api/config'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

type GetBooksQueryParams = {
  isbn: string
}

const fetchBooks = async ({ isbn }: GetBooksQueryParams) => {
  const { data } = await api.get(`isbn:${isbn}`)
  return data
}

export const useBookByISBN = (params: GetBooksQueryParams) => {
  return useQuery({
    queryKey: ['booksByISBN'],
    queryFn: () => {
      return fetchBooks(params)
    },
    placeholderData: keepPreviousData,
  })
}

export default useBookByISBN
