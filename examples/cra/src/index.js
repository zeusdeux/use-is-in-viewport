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
import { ConditionalChild, ConditionalViewport } from './conditionalRender'

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
  const toggleExample = exampleIndex => () => {
    setTestToShow(v => {
      return v === exampleIndex ? 0 : exampleIndex
    })
  }

  return (
    <>
      <nav className={nav}>
        <button
          className={button}
          onClick={toggleExample(1)}
          data-testid="toggle-simple-parent-doc-test"
        >
          {testToShow !== 1 ? 'Show simple parent doc test' : 'Hide simple parent doc test'}
        </button>
        <button
          className={button}
          onClick={toggleExample(2)}
          data-testid="toggle-ref-forwarding-parent-doc-test"
        >
          {testToShow !== 2 ? 'Show ref fwd parent doc test' : 'Hide ref fwd parent doc test'}
        </button>
        <button
          className={button}
          onClick={toggleExample(3)}
          data-testid="toggle-simple-parent-element-test"
        >
          {testToShow !== 3 ? 'Show simple parent element test' : 'Hide simple parent element test'}
        </button>
        <button
          className={button}
          onClick={toggleExample(4)}
          data-testid="toggle-ref-forwarding-parent-element-test"
        >
          {testToShow !== 4
            ? 'Show ref fwd parent element test'
            : 'Hide ref fwd parent element test'}
        </button>
        <button
          className={button}
          onClick={toggleExample(5)}
          data-testid="toggle-conditional-render-child-test"
        >
          {testToShow !== 5
            ? 'Show conditional render child test'
            : 'Hide conditional render child test'}
        </button>
        <button
          className={button}
          onClick={toggleExample(6)}
          data-testid="toggle-conditional-render-viewport-test"
        >
          {testToShow !== 6
            ? 'Show conditional render viewport test'
            : 'Hide conditional render viewport test'}
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
      {testToShow !== 5 ? null : <ConditionalChild />}
      {testToShow !== 6 ? null : <ConditionalViewport />}
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
