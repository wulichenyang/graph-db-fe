import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './assets/css/App.less';
// import Header from './components/Layout/Header/Header'
import Footer from './components/Layout/Footer/Footer'
import SideBar from './components/Layout/SideBar/SideBar';
import Main from './components/Main/Main';
import * as themes from './assets/css/themes'
import { ThemeProvider } from 'styled-components'
import { ITheme } from './assets/css/themes'

import {
  StyledWrapper,
  AppWrapper,
  StyledApp,
  StyledBody,
  StyledMainWrapper,
} from './styled'
// import Home from './views/Home';
// import About from './views/About';
// import Topics from './views/Topics';
import ErrorBoundary from './components/Error/ErrorBoundary';

interface Iprops {
  // drawer,
  // cmdchar,
  // handleNavClick,
  // activeConnection,
  // connectionState,
  theme: string,
  // errorMessage,
  // loadExternalScripts,
  // loadSync,
  // syncConsent,
  // browserSyncMetadata,
  // browserSyncConfig,
  // browserSyncAuthStatus,
  // experimentalFeatures
}

interface IState {

}

class App extends React.Component<Iprops, IState> {
  render() {
    const {
      // drawer,
      // cmdchar,
      // handleNavClick,
      // activeConnection,
      // connectionState,
      theme,
      // errorMessage,
      // loadExternalScripts,
      // loadSync,
      // syncConsent,
      // browserSyncMetadata,
      // browserSyncConfig,
      // browserSyncAuthStatus,
      // experimentalFeatures
    } = this.props

    const themeData = (themes as ITheme)[theme] || themes['normal']

    return (
      <Router>
        <ErrorBoundary>
          <ThemeProvider theme={themeData}>
            <AppWrapper> {/* Not used */}
              <StyledWrapper>
                {/* DocTitle/UserInteraction/DesktopInteration/... */}
                {/* <Header /> */}
                <StyledApp>
                  <StyledBody>
                    <ErrorBoundary>
                      <SideBar />
                    </ErrorBoundary>
                  
                    <StyledMainWrapper>
                      <Main />
                    </StyledMainWrapper>
                  </StyledBody>
                </StyledApp>

              </StyledWrapper>

              <Footer />
            </AppWrapper>
          </ThemeProvider>
        </ErrorBoundary>
      </Router>
    );
  }
}


export default App;
