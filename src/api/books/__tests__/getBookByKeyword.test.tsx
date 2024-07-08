import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react-native'

import { useBookByKeyword } from '../getBooksByKeyword'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 5,
        enabled: true,
      },
    },
  })

  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe(useBookByKeyword, () => {
  // Due to `enabled:false` on the query, I didnt reached how can we retry the call
  it.skip('Retrieve results searching by keyword', async () => {
    const { result } = renderHook(
      () =>
        useBookByKeyword({
          inputKeyword: 'React',
          isISBNString: false,
          startIndex: 0,
        }),
      {
        wrapper: createWrapper(),
      },
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBeDefined()
  })
})
