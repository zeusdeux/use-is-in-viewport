import { observeElementInViewport, Options } from 'observe-element-in-viewport'
import { RefObject, useCallback, useState } from 'react'

export default function useIntersectionObserver(
  parentRef: RefObject<any> = { current: null },
  options: Partial<Pick<Options, Exclude<keyof Options, 'viewport'>>> = {}
) {
  const [isInViewport, setIsInViewport] = useState<boolean | null>(null)

  const childRef: any = useCallback(
    (node: Element | null) => {
      if (node) {
        observeElementInViewport(
          node,
          (_, unobserveFn) => {
            unobserveFn()
            setIsInViewport(true)
          },
          (_, unobserveFn) => {
            unobserveFn()
            setIsInViewport(false)
          },
          {
            ...options,
            viewport: parentRef.current
          }
        )
      }
    },
    [options]
  )

  return [isInViewport, childRef, parentRef]
}
