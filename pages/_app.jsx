import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Amplify from 'aws-amplify'
import { Provider as ReduxProvider } from 'react-redux'
import { theme } from '../src/theme'
import { configureStore } from '../src/store/configureStore'
import AuthProvider from '../src/auth/AuthProvider'
import { initGA, logPageView } from '../src/lib/GoogleAnalytics'
import config from '../src/config'
import 'swiper/css/swiper.css'

const awsconfig = config.aws

Amplify.configure(awsconfig)

const store = configureStore()

const App = (props) => {
  const { Component, pageProps } = props

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

  // @link: https://github.com/zeit/next.js/tree/master/examples/with-dynamic-app-layout
  const Layout = Component.Layout || React.Fragment

  return (
    <ReduxProvider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />
            <Layout>
              <Head>
                <title>{config.seo.title}</title>
              </Head>
              <Component {...pageProps} />
              <div id="modal-root" />
            </Layout>
          </AuthProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </ReduxProvider>
  )
}

export default App
