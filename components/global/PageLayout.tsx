/* eslint-disable no-undef */
import Head from 'next/head'

interface Props {
  title: string
  children: React.ReactNode
}

const PageLayout: React.FC<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <main>{children}</main>
  </>
)

export default PageLayout
