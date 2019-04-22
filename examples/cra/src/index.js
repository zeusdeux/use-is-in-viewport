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
import { RefForwardingElement } from './viewportParentDocument'

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

function App2() {
  const forwardRef = React.useCallback(node => {
    console.log('node ->', node)
  })
  const [showElement, toggleElement] = React.useState(true)

  return (
    <>
      <button onClick={_ => toggleElement(v => !v)}>
        {showElement ? 'Hide Element' : 'Show Element'}
      </button>
      {showElement ? <RefForwardingElement ref={forwardRef} threshold={75} /> : null}
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
