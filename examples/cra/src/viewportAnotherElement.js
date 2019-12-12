import React from 'react'
import { cx } from 'emotion'
import useIsInViewport from 'use-is-in-viewport'
import {
  altVisible,
  app,
  box,
  button,
  container,
  inContainerViewport,
  offset,
  outsideContainerViewport
} from './styles'

export function SimpleElement() {
  const [isInViewport, targetRef, viewportRef] = useIsInViewport()
  const [hidden, toggleHide] = React.useState(false)

  return (
    <div className={app}>
      <button
        className={button}
        onClick={() => toggleHide(h => !h)}
        data-testid="toggle-box-position"
      >
        {hidden ? 'Show box' : 'Hide box'}
      </button>
      <div ref={viewportRef} data-testid="viewport" className={container}>
        <div
          ref={targetRef}
          data-testid="child"
          className={cx(box, {
            [inContainerViewport]: !hidden,
            [outsideContainerViewport]: hidden,
            [altVisible]: isInViewport
          })}
        >
          <p>{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
        </div>
      </div>
    </div>
  )
}

export const RefForwardingElement = React.forwardRef(function RefForwardingElement(
  { threshold = 0 },
  incomingParentRef
) {
  const firstChildRef = React.useRef(null)
  const [isFirstInViewport, firstChildWrappedRef, chainedParentRef] = useIsInViewport({
    viewport: incomingParentRef,
    target: firstChildRef,
    threshold
  })
  const [isSecondInViewport, secondChildRef, finalParentRef] = useIsInViewport({
    viewport: chainedParentRef,
    threshold
  })
  const [hidden, toggleHide] = React.useState(false)

  return (
    <div className={app}>
      <button
        className={button}
        onClick={() => toggleHide(h => !h)}
        data-testid="toggle-boxes-positions"
      >
        {hidden ? 'Show boxes' : 'Hide boxes'}
      </button>
      <div ref={finalParentRef} data-testid="viewport" className={cx('viewport', container)}>
        <div
          ref={firstChildWrappedRef}
          data-testid="first-child"
          className={cx(box, {
            [inContainerViewport]: !hidden,
            [outsideContainerViewport]: hidden,
            [altVisible]: isFirstInViewport
          })}
        >
          <p>
            {isFirstInViewport ? 'First child >= 75% in viewport' : 'First child out of viewport'}
          </p>
        </div>
        <div
          ref={secondChildRef}
          data-testid="second-child"
          className={cx(box, offset, {
            [inContainerViewport]: !hidden,
            [outsideContainerViewport]: hidden,
            [altVisible]: isSecondInViewport
          })}
        >
          <p>
            {isSecondInViewport
              ? 'Second child >= 75% in viewport'
              : 'Second child out of viewport'}
          </p>
        </div>
      </div>
    </div>
  )
})
