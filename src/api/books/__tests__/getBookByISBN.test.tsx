import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react-native'

import { useBookByISBN } from '../getBookByISBN'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        enabled: true,
      },
    },
  })

  // eslint-disable-next-line react/display-name
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe(useBookByISBN, () => {
  it('valid ISBN number', async () => {
    const { result } = renderHook(
      () => useBookByISBN({ isbn: '9781633439290' }),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBeDefined()
    expect(result.current.data.totalItems).toEqual(1)
  })
})
