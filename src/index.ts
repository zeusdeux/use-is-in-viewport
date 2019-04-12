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
            setIsInViewport(true)
            unobserveFn()
          },
          (_, unobserveFn) => {
            setIsInViewport(false)
            unobserveFn()
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
