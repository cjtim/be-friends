import { useColorModeValue } from '@chakra-ui/react'
import LogoImg from 'public/logo/logo_vector.svg'
import NextImage from 'next/image'

const Logo: React.FC = () => {
  const logoColor = useColorModeValue(
    'invert(34%) sepia(41%) saturate(1170%) hue-rotate(112deg) brightness(93%) contrast(101%)',
    'invert(87%) sepia(30%) saturate(457%) hue-rotate(230deg) brightness(117%) contrast(103%)',
  )
  return <NextImage src={LogoImg} style={{ filter: logoColor }} />
}

export default Logo
