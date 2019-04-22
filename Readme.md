# use-is-in-viewport

[![CircleCI](https://circleci.com/gh/zeusdeux/use-is-in-viewport.svg?style=svg)](https://circleci.com/gh/zeusdeux/use-is-in-viewport)

A react hook to use the
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
declaratively in your React app for the purposes of finding out if an element is in a given
viewport.

## Installation

`npm install use-is-in-viewport`

Please note that this hook declares `react` and as _peer dependency_. Therefore, you must have
`react` installed to use this package.

Please [open as issue](https://github.com/zeusdeux/use-is-in-viewport/issues/new) if this default
causes an issue in your application.

## Usage

### Example 1: Element with its parent document as viewport

As soon as at least 1px of the child element is visible in the parent document viewport,
`isInViewport` evaluates to true.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import useIsInViewport from 'use-is-in-viewport

export default function OnlyChildWithNullViewport() {
  const [isInViewport, childElToWatch] = useIsInViewport()

  return (
      <div ref={childElToWatch}>
        <p>{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
      </div>
  )
}

```

More example coming soon...

## Tasks

- [x] Setup the hook to work with CRA, codesandbox and standalone react app
- [x] Write the hook in a way that can be tested with Cypress
- [x] Write tests
- [x] Setup CI
- [ ] Write awesome docs!
