import { cx } from 'emotion'
import React from 'react'
import ReactDOM from 'react-dom'
import useIsInViewport from './use-is-in-viewport'
import {
  container,
  growContainer,
  box,
  inWindowViewport,
  outsideWindowViewport,
  visible,
  altVisible,
  button
} from './styles'

function App() {
  const parentRef = React.useRef(null)

  const [isInViewport1, boxEl1, parentCbRef] = useIsInViewport({
    viewport: parentRef
  })
  const [isInViewport2, boxEl2] = useIsInViewport({
    threshold: [50]
  })
  const [isLarge, toggleContainerSize] = React.useState(false)

  return (
    <>
      <button
        className={button}
        data-testid="toggle-container-size"
        onClick={() => toggleContainerSize(isLarge => !isLarge)}
      >
        {isLarge ? 'Shrink' : 'Grow'} container
      </button>
      <div
        className={cx(container, {
          [growContainer]: isLarge
        })}
        ref={parentCbRef}
      >
        <div
          className={cx(box, inWindowViewport, {
            [visible]: isInViewport1
          })}
          ref={boxEl1}
          data-testid="div-viewport-parent-el"
        >
          <p>{isInViewport1 ? 'Intersecting with parent' : 'Not intersecting with parent'}</p>
        </div>
        <div
          className={cx(box, outsideWindowViewport, {
            [altVisible]: isInViewport2
          })}
          ref={boxEl2}
          data-testid="div-viewport-window"
        >
          <p>{isInViewport2 ? 'Visible' : 'Hidden'}</p>
        </div>
      </div>
    </>
  )
}

async function run() {
  if (!window.IntersectionObserver) {
    await import('intersection-observer')
  }

  const rootElement = document.getElementById('root')
  ReactDOM.render(<App />, rootElement)
}

run()
