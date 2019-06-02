import styled from 'styled-components'

export const AppWrapper = styled.div`

`
// App outer wrapper
export const StyledWrapper = styled.div`
display: flex;
flex-direction: row;
height: 100vh;
font-family: ${props => props.theme.primaryFontFamily};
font-size: 13px;
-webkit-font-smoothing: antialiased;
overflow: hidden;
`

// App inner wrapper
export const StyledApp = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

// Body wrapper of left Sidebar and right Main
export const StyledBody = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  height: inherit;
`

// Right wrapper of main graph info
export const StyledMainWrapper = styled.main`
  flex: auto;
  overflow: auto;
  padding: 0;
  z-index: 1;
  height: auto;
  width: 0;
  background-color: ${props => props.theme.primaryBackground};
  color: ${props => props.theme.primaryText};
`