import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'libs/theme'
import { User } from 'interfaces/User'
import { appWithTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import { config } from 'config'
import Cookies from 'js-cookie'
import axios from 'libs/axios'
export interface BaseNextProps extends AppProps {
  user?: User
}

function MyApp({ Component, pageProps }: BaseNextProps) {
  const [user, setuser] = useState({} as User)
  const firstLoad = useRef(false)
  useEffect(() => {
    if (!firstLoad.current) {
      firstLoad.current = true
      ;(async () => {
        const jwt = Cookies.get(config.cookies.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
        const { data: user } = await axios.get<User>(config.login.GET_me)
        setuser(user)
      })()
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} user={user} />
    </ChakraProvider>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)

//   const newPageProps = { ...appProps.pageProps }
//   return {
//     ...appProps,
//     pageProps: newPageProps,
//   }
// }

export default appWithTranslation(MyApp)
