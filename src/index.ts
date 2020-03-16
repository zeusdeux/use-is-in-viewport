import { observeElementInViewport, Options } from 'observe-element-in-viewport'
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

export type CallbackRef = (node: HTMLElement | null) => any
export type HookOptions = Partial<
  Pick<Options, Exclude<keyof Options, 'viewport'>> & {
    viewport: CallbackRef | MutableRefObject<HTMLElement | null>
    target: CallbackRef | MutableRefObject<HTMLElement | null>
  }
>

export default function useIsInViewport(
  options: HookOptions = {}
): [boolean | null, CallbackRef, CallbackRef] {
  const [isInViewport, setIsInViewport] = useState<boolean | null>(null)
  const { target, viewport, ...restOpts } = options
  const parentRef: MutableRefObject<HTMLElement | null> = useRef(null)
  const childRef: MutableRefObject<HTMLElement | null> = useRef(null)

  const parentCbRef: CallbackRef = useCallback(
    node => {
      parentRef.current = node
      if (viewport) {
        if (isCallbackRef(viewport)) {
          viewport(node)
        } else if (isRefObject(viewport)) {
          viewport.current = node
        }
      }
    },
    [parentRef, viewport]
  )

  const childCbRef: CallbackRef = useCallback(
    node => {
      childRef.current = node
      if (target) {
        if (isCallbackRef(target)) {
          target(node)
        } else if (isRefObject(target)) {
          target.current = node
        }
      }
    },
    [childRef, target]
  )

  useEffect(() => {
    if (!childRef.current) {
      return;
    }
    return observeElementInViewport(
      childRef.current,
      () => setIsInViewport(true),
      () => setIsInViewport(false),
      {
        ...restOpts,
        viewport: parentRef.current
      }
    )
  }, [childRef.current, restOpts, parentRef])

  return [isInViewport, childCbRef, parentCbRef]
}

function isRefObject(x: any): boolean {
  return typeof x === 'object' && 'current' in x
}

function isCallbackRef(f: any): f is CallbackRef {
  return typeof f === 'function' && typeof f.call === 'function'
}
