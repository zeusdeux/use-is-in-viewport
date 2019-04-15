import { observeElementInViewport, Options } from 'observe-element-in-viewport'
import { RefObject, useEffect, useRef, useState } from 'react'

export type HookOptions = Partial<
  Pick<Options, Exclude<keyof Options, 'viewport'>> & {
    viewport: RefObject<HTMLElement | null>
  }
>

export default function useIntersectionObserver(
  options: HookOptions = {}
): [boolean | null, RefObject<HTMLElement | null>] {
  const target = useRef(null)
  const [isInViewport, setIsInViewport] = useState<boolean | null>(null)
  let { viewport, ...restOpts } = options // tslint:disable-line:prefer-const

  if (!viewport) {
    viewport = { current: null }
  }

  useEffect(() => {
    return observeElementInViewport(
      target.current,
      () => setIsInViewport(true),
      () => setIsInViewport(false),
      {
        ...restOpts,
        viewport: viewport!.current
      }
    )
  })

  return [isInViewport, target]
}
