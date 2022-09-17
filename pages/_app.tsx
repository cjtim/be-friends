/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'libs/theme'
import { User } from 'interfaces/User'
import { appWithTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import { config } from 'config'
import Cookies from 'js-cookie'
import axios from 'libs/axios'
import { useRouter } from 'next/router'

export interface UserProps {
  user?: User | undefined
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter() // Next.JS router
  const [user, setuser] = useState<User | undefined>(undefined) // save user payload
  const firstLoad = useRef(false) // ensure first load

  // Get user from cookie
  // Set header to Axios
  // Cleanup if logout
  const getUser = async () => {
    const jwt = Cookies.get(config.cookies.token)
    if (jwt && jwt !== '') {
      try {
        axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
        const { data: userPayload } = await axios.get<User>(config.login.GET_me)
        setuser(userPayload)
        return
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    Cookies.remove(config.cookies.token)
    setuser(undefined)
  }

  useEffect(() => {
    if (!firstLoad.current) {
      firstLoad.current = false
      getUser() // fetch user on first load
      // Register
      router.events.on('routeChangeStart', () => {
        // fetch user every time they change page
        getUser()
      })
    }
  }, [router.events])

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
