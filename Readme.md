# use-is-in-viewport

[![CircleCI](https://circleci.com/gh/zeusdeux/use-is-in-viewport.svg?style=svg)](https://circleci.com/gh/zeusdeux/use-is-in-viewport)

A react hook to use the
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
declaratively in your React app for the purposes of finding out if an element is in a given
viewport.

## Installation

`npm install @zeusdeux/use-is-in-viewport`

This hook declares `react` and `react-dom` as _peer dependencies_. While it does not depend on
`react-dom` itself, hooks can misbehave if the renderer and react version don't match up. Given that
the `IntersectionObserver` is a web platform api, `react-dom` was added as a the renderer peer
dependency.

Please [open as issue](https://github.com/zeusdeux/use-is-in-viewport/issues/new) if this default
causes an issue in your application.

## Usage

### Example 1: Element with its parent document as viewport

As soon as at least 1px of the child element is visible in the parent document viewport,
`isInViewport` evaluates to true.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import useIsInViewport from '@zeusdeux/use-is-in-viewport

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
