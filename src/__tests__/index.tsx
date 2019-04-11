import 'jest-dom/extend-expect'
import { CustomEntry, observeElementInViewport } from 'observe-element-in-viewport'
import * as React from 'react'
import { act, render } from 'react-testing-library'
import useIntersectionObserver from '../'

jest.mock('observe-element-in-viewport')

type ExtractArgTypes<T> = T extends (...args: infer U) => any ? U : never

describe('useIntersectionObserver', () => {
  const noop = () => { } // tslint:disable-line:no-empty

  it('should show a different message based on visibility in the viewport', () => {
    function MyComponent() {
      const [isInViewport, spanEl] = useIntersectionObserver()

      return (
        <span data-testid="my-span" ref={spanEl}>
          {isInViewport ? 'In viewport' : 'Not in viewport'}
        </span>
      )
    }

    const { getByTestId } = render(<MyComponent />)
    const [, extractedInHandler, extractedOutHandler] = (observeElementInViewport as jest.Mock<
      ReturnType<typeof observeElementInViewport>,
      ExtractArgTypes<typeof observeElementInViewport>
    >).mock.calls[0]

    expect(getByTestId('my-span')).toHaveTextContent('Not in viewport')
    act(() => extractedInHandler({} as CustomEntry, noop, {} as Element))
    expect(getByTestId('my-span')).toHaveTextContent('In viewport')
    act(() => extractedOutHandler!({} as CustomEntry, noop, {} as Element))
    expect(getByTestId('my-span')).toHaveTextContent('Not in viewport')
  })

  it.only('should blah', () => {
    function MyComponentWithChildren() {
      let nodex: Element | null = null
      const [firstSpanIsInViewport, firstSpanEl] = useIntersectionObserver({ viewport: nodex })
      const [secondSpanIsInViewport, secondSpanEl] = useIntersectionObserver({ viewport: nodex })

      return (
        <div data-testid="parent-div" ref={node => (nodex = node)}>
          <span data-testid="first-span" ref={firstSpanEl}>
            {firstSpanIsInViewport ? 'First span in viewport' : 'First span not in viewport'}
          </span>
          <span data-testid="second-span" ref={secondSpanEl}>
            {secondSpanIsInViewport ? 'Second span in viewport' : 'Second span not in viewport'}
          </span>
        </div>
      )
    }

    const { getByTestId } = render(<MyComponentWithChildren />)

    const [el, , , options] = (observeElementInViewport as jest.Mock<
      ReturnType<typeof observeElementInViewport>,
      ExtractArgTypes<typeof observeElementInViewport>
    >).mock.calls[0]
    console.log(options!.viewport)
    expect(getByTestId('first-span')).toEqual(el)
  })
})
