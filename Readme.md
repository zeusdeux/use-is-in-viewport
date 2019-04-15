# use-intersection-observer

[![CircleCI](https://circleci.com/gh/zeusdeux/use-intersection-observer.svg?style=svg)](https://circleci.com/gh/zeusdeux/use-intersection-observer)

A react hook to use the
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
declaratively in your React app.

## Installation

`npm install @zeusdeux/use-intersection-observer`

This hook declares `react` and `react-dom` as _peer dependencies_. While it does not depend on
`react-dom` itself, hooks can misbehave if the renderer and react version don't match up. Given that
the `IntersectionObserver` is a web platform api, `react-dom` was added as a the renderer peer
dependency.

Please [open as issue](https://github.com/zeusdeux/use-intersection-observer/issues/new) if this
default causes an issue in your application.

## Usage

There are two distinct scenarios that this hook is designed to handle.

1. An element wants to know its own visibility in relation to a container
2. A parent cotainer wants to know when its children intersect with itself or some other node higher
   in the hierarchy

### Scenario 1: An element wants to know its own visibility

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import useIntersectionObserver from '@zeusdeux/use-intersection-observer'

function App() {
  const [isInViewport, targetRef] = useIntersectionObserver({
    threshold: 50
  })

  return (
    <div ref={targetRef}>
      <p>{isInViewport ? 'Visible' : 'Not visible'}</p>
    </div>
  )
}
```

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vyr0xw5o70?fontsize=14)

[Working example in a codesandbox](https://codesandbox.io/s/54r7k92m04?fontsize=14).

## Tasks

- [x] Setup the hook to work with CRA, codesandbox and standalone react app
- [x] Write the hook in a way that can be tested with Cypress
- [x] Write tests
- [x] Setup CI
- [ ] Write awesome docs!
