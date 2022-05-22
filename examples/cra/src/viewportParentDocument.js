import React from 'react'
import { cx } from 'emotion'
import useIsInViewport from 'use-is-in-viewport'
import { app, box, button, inWindowViewport, outsideWindowViewport, visible } from './styles'

export function SimpleElement() {
  const [isInViewport, childRef] = useIsInViewport()
  const [hidden, toggleHide] = React.useState(false)

  return (
    <div className={app}>
      <button
        className={button}
        onClick={() => toggleHide(h => !h)}
        data-testid="toggle-box-position"
      >
        {hidden ? 'Show box (or scroll to show it)' : 'Hide box'}
      </button>
      <div
        className={cx(box, {
          [inWindowViewport]: !hidden,
          [outsideWindowViewport]: hidden,
          [visible]: isInViewport
        })}
        data-testid="box"
        ref={childRef}
      >
        <p>{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
      </div>
    </div>
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
  targetRef
) {
  const [isInViewport, childRef] = useIsInViewport({
    target: targetRef,
    threshold // if threshold is passed as an option, it MUST be a number or number[]
  })
  const [hidden, toggleHide] = React.useState(false)

  return (
    <div className={app}>
      <button
        className={button}
        onClick={() => toggleHide(h => !h)}
        data-testid="toggle-box-position"
      >
        {hidden ? 'Show box (or scroll to show it)' : 'Hide box'}
      </button>
      <div
        className={cx('target-div', box, {
          [inWindowViewport]: !hidden,
          [outsideWindowViewport]: hidden,
          [visible]: isInViewport
        })}
        data-testid="box"
        ref={childRef}
      >
        <p>{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
      </div>
    </div>
  )
})
