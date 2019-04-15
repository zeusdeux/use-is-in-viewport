import { css, cx } from 'emotion'
import React from 'react'
import ReactDOM from 'react-dom'
import useIntersectionObserver from './use-intersection-observer'

const container = css`
  font-family: sans-serif;
  text-align: center;
  height: 50vh;
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const growContainer = css`
  height: 56vh;
`

const box = css`
  height: 150px;
  width: 150px;
  background: teal;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`

const box1 = css`
  top: 55vh;
`

const box2 = css`
  top: 150vh;
`

const visible = css`
  background: pink;
`

const altVisible = css`
  background: orange;
  color: black;
`

const button = css`
  height: 30px;
  width: 100%;
`

function App() {
  const parentRef = React.useRef(null)
  const boxEl1 = React.useRef(null)
  const boxEl2 = React.useRef(null)

  const isInViewport1 = useIntersectionObserver({
    viewport: parentRef,
    target: boxEl1
  })
  const isInViewport2 = useIntersectionObserver({
    threshold: [50],
    target: boxEl2
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
        ref={parentRef}
      >
        <div
          className={cx(box, box1, {
            [visible]: isInViewport1
          })}
          ref={boxEl1}
          data-testid="div-viewport-parent-el"
        >
          <p>{isInViewport1 ? 'Intersecting with parent' : 'Not intersecting with parent'}</p>
        </div>
        <div
          className={cx(box, box2, {
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
