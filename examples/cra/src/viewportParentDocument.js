import React from 'react'
import { cx } from 'emotion'
import useIsInViewport from './use-is-in-viewport'
import { box, button, inWindowViewport, outsideWindowViewport, visible } from './styles'

export function SimpleElement() {
  const [isInViewport, childElToWatch] = useIsInViewport()
  const [hide, toggleHide] = React.useState(false)

  return (
    <>
      <button
        className={button}
        onClick={() => toggleHide(h => !h)}
        data-testid="toggle-box-position"
      >
        {hide ? 'Show box' : 'Hide box'}
      </button>
      <div
        className={cx(box, {
          [inWindowViewport]: !hide,
          [outsideWindowViewport]: hide,
          [visible]: isInViewport
        })}
        data-testid="box"
        ref={childElToWatch}
      >
        <p>{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
      </div>
    </>
  )
}

/**
 * This component forwards a ref to the child element being watched for intersection
 * with the viewport. Forwarding the ref to the child is not necessary. This is only
 * an example to show that you useIsInViewport preserves origin ref behaviour (ref/cb ref)
 * by returning a new wrapped ref to be passed to the child.
 * If the ref wasn't meant for the child and instead for its container, then passing the
 * forwarded ref as the `target` option isn't necessary.
 */

export const RefForwardingElement = React.forwardRef(function RefForwardingElement(
  { threshold = 10 }, // default value for threshold so that we don't pass it in as undefined
  ref
) {
  const [isInViewport, childRef] = useIsInViewport({
    target: ref,
    threshold // if threshold is passed as an option, it MUST be a number or number[]
  })
  const [hide, toggleHide] = React.useState(false)

  return (
    <>
      <button
        className={button}
        onClick={() => toggleHide(h => !h)}
        data-testid="toggle-box-position"
      >
        {hide ? 'Show box' : 'Hide box'}
      </button>
      <div
        className={cx(box, {
          [inWindowViewport]: !hide,
          [outsideWindowViewport]: hide,
          [visible]: isInViewport
        })}
        data-testid="box"
        ref={childRef}
      >
        <p>{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
      </div>
    </>
  )
})
