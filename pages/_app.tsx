import type { AppContext, AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'libs/theme'
import { User } from 'interfaces/User'
import { getUser } from 'libs/auth'
import App from 'next/app'

export interface BaseNextProps {
  user?: User
}

function MyApp({ Component, pageProps }: AppProps<BaseNextProps>) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  // append user props to all component
  appProps.pageProps.user = await getUser(appContext.ctx.req?.headers.cookie).catch(() => ({} as User))
  return { ...appProps }
}

export default MyApp
