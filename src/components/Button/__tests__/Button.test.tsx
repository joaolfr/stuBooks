import { fireEvent, render } from '@utils/test-utils'
import * as React from 'react'

import { Button } from '../index'

it(`renders correctly`, () => {
  const mockSearchPress = jest.fn()
  const { getByText } = render(
    <Button onPress={mockSearchPress} disabled={false} fetching={false}>
      Search
    </Button>,
  )

  const btn = getByText('Search')
  fireEvent.press(btn)

  expect(mockSearchPress).toHaveBeenCalled()
  expect(btn).toBeDefined()
})
