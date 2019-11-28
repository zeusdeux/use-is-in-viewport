import React from 'react'
import ReactDOM from 'react-dom'
import { button, nav } from './styles'
import {
  SimpleElement as DocViewportSimple,
  RefForwardingElement as DocViewportRefForwading
} from './viewportParentDocument'
import {
  SimpleElement as ParentElementViewportSimple,
  RefForwardingElement as ParentElementViewportRefForwading
} from './viewportAnotherElement'

function App() {
  const [testToShow, setTestToShow] = React.useState(0)
  const forwardedTargetRef = node => {
    window.forwardedTargetRef = window.forwardedTargetRef || []
    window.forwardedTargetRef.push(node)
  }
  const forwardedViewportRef = node => {
    window.forwardedViewportRef = window.forwardedViewportRef || []
    window.forwardedViewportRef.push(node)
  }

  return (
    <>
      <nav className={nav}>
        <button
          className={button}
          onClick={() => setTestToShow(v => ([0, 2, 3, 4].includes(v) ? 1 : 0))}
          data-testid="toggle-simple-parent-doc-test"
        >
          {testToShow !== 1 ? 'Show simple parent doc test' : 'Hide simple parent doc test'}
        </button>
        <button
          className={button}
          onClick={() => setTestToShow(v => ([0, 1, 3, 4].includes(v) ? 2 : 0))}
          data-testid="toggle-ref-forwarding-parent-doc-test"
        >
          {testToShow !== 2 ? 'Show ref fwd parent doc test' : 'Hide ref fwd parent doc test'}
        </button>
        <button
          className={button}
          onClick={() => setTestToShow(v => ([0, 1, 2, 4].includes(v) ? 3 : 0))}
          data-testid="toggle-simple-parent-element-test"
        >
          {testToShow !== 3 ? 'Show simple parent element test' : 'Hide simple parent element test'}
        </button>
        <button
          className={button}
          onClick={() => setTestToShow(v => ([0, 1, 2, 3].includes(v) ? 4 : 0))}
          data-testid="toggle-ref-forwarding-parent-element-test"
        >
          {testToShow !== 4
            ? 'Show ref fwd parent element test'
            : 'Hide ref fwd parent element test'}
        </button>
      </nav>
      {testToShow !== 1 ? null : <DocViewportSimple />}
      {testToShow !== 2 ? null : (
        <DocViewportRefForwading threshold={50} ref={forwardedTargetRef} />
      )}
      {testToShow !== 3 ? null : <ParentElementViewportSimple />}
      {testToShow !== 4 ? null : (
        <ParentElementViewportRefForwading ref={forwardedViewportRef} threshold={75} />
      )}
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
