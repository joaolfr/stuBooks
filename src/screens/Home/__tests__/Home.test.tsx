import { render } from '@utils/test-utils'

import { Home } from '..'

describe(Home, () => {
  it('home render correct', () => {
    const { getByText, getByPlaceholderText } = render(<Home />)
    const searchButton = getByText('Search')
    const searchInput = getByPlaceholderText('search for the book')
    expect(searchButton).toBeDefined()
    expect(searchInput).toBeDefined()
  })
})
