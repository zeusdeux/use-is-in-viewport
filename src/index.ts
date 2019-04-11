import { observeElementInViewport, Options } from 'observe-element-in-viewport'
import { useCallback, useState } from 'react'

export default function useIntersectionObserver(options: Partial<Options> = {}) {
  const [isInViewport, setIsInViewport] = useState<boolean | null>(null)

  const ref: any = useCallback(
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
          options
        )
      }
    },
    [options]
  )

  return [isInViewport, ref]
}
