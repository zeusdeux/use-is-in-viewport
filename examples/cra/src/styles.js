import { css } from 'emotion'

export const container = css`
  font-family: sans-serif;
  text-align: center;
  height: 50vh;
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const growContainer = css`
  height: 56vh;
`

export const box = css`
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

export const inWindowViewport = css`
  top: 55vh;
`

export const outsideWindowViewport = css`
  top: 150vh;
`

export const visible = css`
  background: pink;
`

export const altVisible = css`
  background: orange;
  color: black;
`

export const button = css`
  height: 30px;
  width: 100%;
`
