import { observeElementInViewport, Options } from 'observe-element-in-viewport'
import { RefObject, useCallback, useRef, useState } from 'react'

export type HookOptions = Partial<
  Pick<Options, Exclude<keyof Options, 'viewport'>> & { viewport: RefObject<HTMLElement | null> }
>

export default function useIntersectionObserver(
  options?: HookOptions
): [boolean | null, (node: Element | null) => void] {
  const [isInViewport, setIsInViewport] = useState<boolean | null>(null)
  const unobserveFnRef = useRef(() => {}) // tslint:disable-line:no-empty

  if (!options) {
    options = {}
  }

  if (!options.viewport) {
    options.viewport = { current: null }
  }

  const childCallbackRef = useCallback(
    (node: Element | null): void => {
      unobserveFnRef.current()

      if (node) {
        unobserveFnRef.current = observeElementInViewport(
          node,
          () => setIsInViewport(true),
          () => setIsInViewport(false),
          {
            ...options,
            viewport: options!.viewport!.current
          }
        )
      }
    },
    [options]
  )

  return [isInViewport, childCallbackRef]
}
