import { observeElementInViewport, Options } from 'observe-element-in-viewport'
import { RefObject, useEffect, useState } from 'react'

export type HookOptions = Partial<
  Pick<Options, Exclude<keyof Options, 'viewport'>> & {
    viewport: RefObject<HTMLElement | null>
  }
> & { target: RefObject<HTMLElement | null> }

export default function useIntersectionObserver(options: HookOptions): boolean | null {
  const [isInViewport, setIsInViewport] = useState<boolean | null>(null)
  let { target, viewport, ...restOpts } = options // tslint:disable-line:prefer-const

  if (!target || typeof target !== 'object' || !('current' in target)) {
    throw new Error(`Expected target to be a ref but received ${target}`)
  }

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

  return isInViewport
}
