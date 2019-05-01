# use-is-in-viewport

[![CircleCI](https://circleci.com/gh/zeusdeux/use-is-in-viewport.svg?style=svg)](https://circleci.com/gh/zeusdeux/use-is-in-viewport)

A react hook to use the
[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
declaratively in your React app for the purposes of finding out if an element is in a given
viewport.

[![Edit use-intersection-observer example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/54r7k92m04?fontsize=14)

- [Motivation](#motivation)
- [Guiding principles](#guiding-principles)
- [Installation](#installation)
- [API docs](#api)
  - [Return value](#return-value)
  - [Input options](#options)
    - [options.threshold](#optionsthreshold)
    - [options.target](#optionstarget)
    - [options.viewport](#optionsviewport)
    - [options.{modTop, modRight, modBottom, modLeft}](#optionsmodtop-modright-modbottom-modleft)
- [Example usage](#example-usage)
- [Tasks](#tasks)

## Motivation

I wrote [isInViewport](https://github.com/zeusdeux/isInViewport) for the jQuery world back in the
day and while how we build interfaces has changed massively since, the problem
[isInViewport](https://github.com/zeusdeux/isInViewport) solves still remains. Since then, the web
platform has grown massively and now gives us better primitives to solve this problem in the shape
of the
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
[community](https://twitter.com/muditameta/status/1117854963911340042?s=12) helped shape the api and
serve as a north star for this hook.

### Guiding principles

1. Solve a real problem
   - Test an element in a viewport for visibility
2. Make it straightforward to consume the package
   - Simple, to the point name
   - Easy installation
   - Correct peer dependencies to prevent foot-guns
   - Tons of docs and examples (in progress)
3. Make it easy to address the most likely use-cases
   - e.g., "Tell me when an element is visible in the current window viewport", "Tell me when 75% of
     an element is visible in current window viewport"
4. Make it possible to address other use-cases without unnecessary noise
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

**Note**: This hook relies on
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
and hence if you want to use it in a browser that doesn't support it, the onus of shipping the
polyfill is on the developer.

Please [open an issue](https://github.com/zeusdeux/use-is-in-viewport/issues/new) if these defaults
cause a problem in your application.

## API

### useIsInViewport([options]) => [boolean | null, TargetCbRef, ViewportCbRef]

> The nomenclature (target, viewport, threshold, etc) are borrowed from that of the
> [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_concepts_and_usage)

- [Return value](#return-value)
- [Input options](#options)

#### Return value

It returns an `array` that contains the following in order:

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

The hook accepts an optional `options` object. When not provided, "sane" defaults are used. They are
described in the `options` section below.

#### _options.threshold_

The threshold describes what **percent** of the target element should intersect with the given
viewport for it to be considered as visible in the viewport.

It can be a number or an array of numbers. The number is interpreted as a percent of the target
element's dimensions.

Passing an array of numbers is likely to be useless for most use cases. It only exists as an
artefact of the library this hook is built on and hence will most likely will be deprecated and
removed based on feedback from the community.

**Default**: `0%` -> as soon as even `1px` of your target element is visible in viewport it'll be
reported as visible in viewport.

**Example**:

```jsx
// this would report an element as visible in its parent document viewport when
// at least 50% of the target intersects with the viewport
const [isInViewport, targetRef] = useIsInViewport({ threshold: 50 })
...
<div ref={wrappedTargetRef}>{ isInViewport ? 'Visible' : 'Nope' }</div>
```

#### _options.target_

The target accepts a [ref](https://reactjs.org/docs/refs-and-the-dom.html) for the element you want
track the visibility of in a viewport. This is useful when you have a `ref` that is created outside
of this hook (for e.g., passed in via `ref` prop from another component, a forwarded ref, etc).

This ref is wrapped and a new ref is returned at index 1 in the returned array. The returned ref is
what you must pass to the `ref` property of the element you want to track the visibility of.

**Default**: `undefined`

**Example**:

```jsx
const targetRef = useCallback(node => console.log(node)) // can come from anywhere
// or
const targetRef = useRef(null) // can come from anywhere

const [isInViewport, wrappedTargetRef] = useIsInViewport({ target: targetRef })
...
<div ref={wrappedTargetRef}>{ isInViewport ? 'Visible' : 'Nope' }</div>
```

#### _options.viewport_

The viewport accepts a [ref](https://reactjs.org/docs/refs-and-the-dom.html) for the element you
want to use as the viewport. This _must_ be a parent of the element you want to track the visibility
of. This options is useful when you have a `ref` that is created outside of this hook (for e.g.,
passed in via `ref` prop from another component, a forwarded ref, etc).

This ref is wrapped and a new ref is returned at index 2 in the returned array. The returned ref is
what you must pass to the `ref` property of the element you want to use as the viewport.

Also, if you want plan to use the same viewport for multiple child elements, then the viewport ref
must be **_chained_** as shown in the example below. This might feel a bit weird at first but this
chaining is necessary so that we can -

1. Preserve whatever behaviour the incoming viewport ref has (it could be a fn or a object ref)
2. Have only one viewport ref that can then be passed to the element you want to use as viewport

**Default**: `undefined`

**Example**:

```jsx
const MyElement = React.forwardRef(function MyElement(props, parentRef) {
  const [isFirstDivInViewport, firstDiv, wrappedViewportRef] = useIsInViewport({
    viewport: parentRef
  })
  const [isSecondDivInViewport, secondDiv, finalViewportRef] = useIsInViewport({
    viewport: wrappedViewportRef, // viewport ref is chained
    threshold: 20
  })

  return (
    <section ref={finalViewportRef}>
      <div ref={firstDiv}>{isFirstDivInViewport ? 'Visible' : 'Nope'}</div>
      <div ref={secondDiv}>{isSecondDivInViewport ? 'Visible' : 'Nope'}</div>
    </section>
  )
})


function App() {
  const ref = // however you want to create a ref (useRef, raw fn, useCallback, useMemo, React.createRef, etc)

  return <MyElement ref={ref} />
}

```

#### _options.{modTop, modRight, modBottom, modLeft}_

These values map directly to
[`rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#The_intersection_root_and_root_margin)
in Intersection Observer API. The can have values similar to the CSS
[`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin) property.

> The values in rootMargin define offsets added to each side of the intersection root's bounding box
> to create the final intersection root bounds.

**Defaults**:

- `modTop`: `'0px'`
- `modRight`: `'0px'`
- `modBottom`: `'0px'`
- `modLeft`: `'0px'`

**Example**:

```jsx
...
const [isInViewport, targetRef] = useIsInViewport({
  modTop: '10px',
  modRight: '1em',
  modBottom: '2.5rem',
  modLeft: '10%'
})
...
```

## Example usage

A CRA based example app (which is also used in the test suite) can be found under
[examples/cra](examples/cra). Inline examples showcasing use-cases are below.

### Example 1: Element with its parent document as viewport

As soon as at least 1px of the child element is visible in the parent document viewport,
`isInViewport` evaluates to true.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import useIsInViewport from 'use-is-in-viewport'

export default function SimpleElement() {
  const [isInViewport, childElToWatch] = useIsInViewport()

  return (
    <div ref={childElToWatch}>
      <p>{isInViewport ? 'In viewport' : 'Out of viewport'}</p>
    </div>
  )
}
```

More examples coming soon...

## Tasks

- [x] Setup the hook to work with CRA, codesandbox and standalone react app
- [x] Write the hook in a way that can be tested with Cypress
- [x] Setup CI
- [x] Increase test coverage
- [x] Write awesome docs!
  - [x] Deploy example app to [useisinviewport.zdx.cat/](https://useisinviewport.zdx.cat/)
  - [x] Document the motivation and API in the readme
