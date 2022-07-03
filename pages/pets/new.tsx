import { Center } from '@chakra-ui/react'
import Navbar from 'components/global/Navbar'
import PageLayout from 'components/global/PageLayout'
import PetRegisterCard from 'components/pets/RegisterCard'
import { PetRegister } from 'interfaces/Pet'
import { GetServerSidePropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { UserProps } from 'pages/_app'
import { SubmitHandler } from 'react-hook-form'

const PetNewPage: NextPage<UserProps> = ({ user }) => {
  const onSubmit: SubmitHandler<PetRegister> = data => {
    console.log(data)
  }
  return (
    <PageLayout title="New pet">
      <Navbar user={user} />
      <Center>
        <PetRegisterCard onSubmitRegister={onSubmit} />
      </Center>
    </PageLayout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale || 'us', ['common', 'pet'])),
  },
})

export default PetNewPage
