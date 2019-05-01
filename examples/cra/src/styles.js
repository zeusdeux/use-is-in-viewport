import { css, injectGlobal } from 'emotion'

injectGlobal`
  :root {
    --offset: 0vh;
  }
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const button = css`
  height: 30px;
  width: 100%;
`

export const app = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & > button {
    position: fixed;
    margin-top: 51px;
  }
`

export const nav = css`
  display: flex;
  height: 50px;
  padding: 10px 0;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
`

export const container = css`
  font-family: sans-serif;
  text-align: center;
  height: 50vh;
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
  width: 100%;
  margin-top: 94px;
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

export const offset = css`
  margin-left: 20px;
  --offset: 10vh;
`

export const inWindowViewport = css`
  top: 55vh;
`

export const outsideWindowViewport = css`
  top: 150vh;
`

export const inContainerViewport = css`
  top: calc(var(--offset) + 20vh);
`

export const outsideContainerViewport = css`
  top: calc(var(--offset) + 60vh);
`

export const visible = css`
  background: pink;
`

export const altVisible = css`
  background: orange;
  color: black;
`
