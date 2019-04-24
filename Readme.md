# use-is-in-viewport

[![CircleCI](https://circleci.com/gh/zeusdeux/use-is-in-viewport.svg?style=svg)](https://circleci.com/gh/zeusdeux/use-is-in-viewport)

A react hook to use the
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
declaratively in your React app for the purposes of finding out if an element is in a given
viewport.

## Motivation

I wrote [isInViewport](https://github.com/zeusdeux/isInViewport) for the jQuery world back in the
day and while how we build interfaces has changed massively since, the problem
[isInViewport](https://github.com/zeusdeux/isInViewport) solved still remains. What did change was
that the web platform gave us better primitives to solve this problem in the shape of the
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

I was looking for a simple way to use the
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
in my React app for the purposes of checking if a component is in some viewport. I started off by
writing [a wrapper](https://github.com/zeusdeux/observe-element-in-viewport) around the Intersection
Observer API but that still didn't _feel_ right. Its dev ergonomics felt off due to the callback
based core interface it shares with the Intersection Observer API.

Then, [React Hooks happened](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html)! I started
playing around attempting to write a generic `useIntersectionObserver` hook. I gave up on that idea
in favour of a more directed hook. One which solves a problem that I and many other devs have.

The following guiding principles in combination with the
[community](https://twitter.com/muditameta/status/1117854963911340042?s=12) helped shape the api for
this hook.

### Guiding principles

1. Solve a real problem
   - Test an element in a viewport for visibility
2. Make it straightforward to consume the package
   - Simple, to the point name
   - Easy installation
   - Correct peer dependencies to prevent foot-guns
   - Tons of docs and examples (in progress)
3. Make it easy to solve the most likely use cases
   - e.g., "Tell me when an element is visible in the current window viewport", "Tell me when 75% of
     an element is visible in current window viewport"
4. Make it possible to solve other problems without unnecessary noise
   - e.g., "Tell me when an element is visible in my custom viewport", "Let me customize the
     viewport I want to pass down", "Let me use this with a component that uses React.forwardRef",
     etc
5. Provide as much developer feedback as possible
   - made possible by types that ship with the project
6. Only solve the actual problem
   - e.g., providing a polyfill for Intersection Observer is not this package's job
7. Be trustworthy
   - All use cases have corresponding integration tests using Cypress (in progress)

> With all
> [all major browsers having added support for Intersection Observer API](https://caniuse.com/#search=intersection%20observer),
> this package is even more easier to drop into your application!

## Installation

`npm install use-is-in-viewport`

Please note that this hook declares `react` and as _peer dependency_. Therefore, you must have
`react` installed to use this package.

Please [open as issue](https://github.com/zeusdeux/use-is-in-viewport/issues/new) if this default
causes an issue in your application.

## API

### useIsInViewport([options]) => [boolean | null, TargetCbRef, ViewportCbRef]

> The nomenclature (target, viewport, threshold, etc) are borrowed from that of the
> [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage)

The hook accepts an optional `options` object. When not provided, sane defaults are used. They are
described in the `options` section below.

It returns an array that contains the following in order:

1. a flag that is one of `null`, `true`, `false` based on the visibility of target element in
   provided viewport
   - `null` -> first call to the hook when nothing is initialized
   - `true` -> target element is visible in the given viewport
   - `false` -> target element is visible in the given viewport
2. A [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) to pass to the
   element you want to know the visibility of.
3. A [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) to pass to the
   element you want to use as the viewport.

#### Options

All options are optional. Please (ab)use your editor's Typescript capabilities to capitalize on
types for this hook.

##### options.threshold

The threshold describes what **percent** of the target element should intersect with the given
viewport for it to be considered as visible in the viewport.

It can be a number or an array of numbers. The number is interpreted as a percent of the target
element's dimensions.

Passing an array of numbers is likely to be useless for most use cases. It only exists as an
artefact of the library this hook is built on and hence will most likely will be deprecated and
removed based on feedback from the community.

example: `useIsInViewport({ threshold: 50 })` would report an element as visible in its parent
document viewport when at least 50% of the target intersects with the viewport.

##### options.target

The target accepts a [ref](https://reactjs.org/docs/refs-and-the-dom.html) for the element you want
track the visibility in viewport of. This ref is wrapped and a new ref is returned at index 1 in the
returned array.

example: `useIsInViewport({ target: node => console.log(node) })` or
`useIsInViewport({ target: useRef(null) })`

##### options.viewport

##### options.{modTop, modRight, modBottom, modLeft}

## Usage

### Example 1: Element with its parent document as viewport

As soon as at least 1px of the child element is visible in the parent document viewport,
`isInViewport` evaluates to true.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import useIsInViewport from 'use-is-in-viewport

export default function SimpleElement() {
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
