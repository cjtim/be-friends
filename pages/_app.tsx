import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { config } from 'config'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log(document.cookie)
    Cookies.set(config.cookies.token, 'test token')
  }, [])
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
