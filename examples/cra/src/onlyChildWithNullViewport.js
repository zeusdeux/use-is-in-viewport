import React from 'react'
import ReactDOM from 'react-dom'
import { cx } from 'emotion'
import useIsInViewport from './use-is-in-viewport'
import { box, button, inWindowViewport, outsideWindowViewport, visible } from './styles'

export default function OnlyChildWithNullViewport() {
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
      >
        <p>{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
      </div>
    </>
  )
}
