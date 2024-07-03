import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { fetchBooks, GetBooksQueryParams } from '../config'

export const useBookdByKeyword = (params: GetBooksQueryParams) => {
  return useInfiniteQuery({
    queryKey: ['bookies', params],
    queryFn: ({ pageParam }) => {
      console.log('parasm: ', pageParam)
      return fetchBooks(pageParam)
    },
    enabled: false,
    initialPageParam: params,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, pages) => {
      return {
        startIndex: pages.length * 20,
        inputKeyword: params.inputKeyword,
      }
    },
  })
}

export default useBookdByKeyword
