import React from 'react'
import { cx } from 'emotion'
import useIsInViewport from 'use-is-in-viewport'
import { app, box, button, container, inWindowViewport, outsideWindowViewport, visible } from './styles'

export function ConditionalChild() {
  const [isInViewport, childRef] = useIsInViewport()
  const [hidden, toggleHide] = React.useState(true)

  return (
    <div className={app}>
      <button
        className={button}
        onClick={() => toggleHide(h => !h)}
        data-testid="toggle-box-hidden"
      >
        {hidden ? 'Show box' : 'Hide box'}
      </button>
      <p data-testid="box-status">{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
      {!hidden && (
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
      )}
    </div>
  )
}

export function ConditionalViewport() {
  const parentRef = React.useRef(null)
  const [isInViewport, childRef] = useIsInViewport({
    viewport: parentRef
  })
  const [hidden, toggleHide] = React.useState(true)

  return (
    <div className={app}>
      <button
        className={button}
        onClick={() => toggleHide(h => !h)}
        data-testid="toggle-viewport-hidden"
      >
        {hidden ? 'Show viewport' : 'Hide viewport'}
      </button>
      <p data-testid="box-status">{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
      {!hidden && (
        <div ref={parentRef} data-testid="viewport" className={cx('viewport', container)}>
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
      )}
    </div>
  )
}
