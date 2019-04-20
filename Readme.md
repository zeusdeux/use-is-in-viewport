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

[![Edit use-intersection-observer example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/54r7k92m04?fontsize=14)

## Tasks

- [x] Setup the hook to work with CRA, codesandbox and standalone react app
- [x] Write the hook in a way that can be tested with Cypress
- [x] Write tests
- [x] Setup CI
- [ ] Write awesome docs!
