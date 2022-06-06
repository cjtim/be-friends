import type { AppContext, AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'libs/theme'
import { User } from 'interfaces/User'
import { getUser } from 'libs/auth'
import App from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'

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
  const user = await getUser(appContext.ctx.req?.headers.cookie).catch(() => ({} as User))

  const newPageProps = { ...appProps.pageProps, user }
  return { ...appProps, pageProps: newPageProps }
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'us', ['common'])),
      // Will be passed to the page component as props
    },
  }
}

export default appWithTranslation(MyApp)
