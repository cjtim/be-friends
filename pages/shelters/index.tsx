import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'

import { Shelter } from 'interfaces/Shelter'
import { GetStaticPropsContext, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { UserProps } from 'pages/_app'

const ShelterTableList = dynamic(() => import('components/shelters/TableList'))

interface Props extends UserProps {
  shelters: Shelter[]
}

const SheltersPage: NextPage<Props> = ({ user, shelters }) => {
  const { t } = useTranslation(['common'])

  return (
    <PageLayout title={t('navbar.shelters')}>
      <Navbar user={user} />
      <ShelterTableList shelters={shelters} />
    </PageLayout>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'us', ['common', 'index', 'pet'])),
      shelters: Array(50)
        .fill(null)
        .map((i, idx) => ({
          name: `Shelter${idx}`,
          address: `Samsennai${idx}`,
          contacts: {
            line: '',
            messenger: `fb.me/${idx}`,
          },
        })),
    } as Props,
  }
}

export default SheltersPage
