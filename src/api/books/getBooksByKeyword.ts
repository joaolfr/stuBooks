import { api } from '@api/config'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

type GetBooksQueryParams = {
  inputKeyword: string
  startIndex: number
  isISBNString: boolean
}

const fetchBooks = async ({
  inputKeyword,
  startIndex,
  isISBNString,
}: GetBooksQueryParams) => {
  console.log(
    `${isISBNString ? 'isbn:' + inputKeyword : inputKeyword}&startIndex=${startIndex}&maxResults=20`,
  )
  const { data } = await api.get(
    `${isISBNString ? 'isbn:' + inputKeyword : inputKeyword}&startIndex=${startIndex}&maxResults=20`,
  )
  return data
}

export const useBookByKeyword = (params: GetBooksQueryParams) => {
  return useInfiniteQuery({
    queryKey: ['bookies', params],
    queryFn: ({ pageParam }) => {
      return fetchBooks(pageParam)
    },
    enabled: false,
    initialPageParam: params,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, pages) => {
      return {
        startIndex: pages.length * 20,
        inputKeyword: params.inputKeyword,
        isISBNString: params.isISBNString,
      }
    },
  })
}

export default useBookByKeyword
