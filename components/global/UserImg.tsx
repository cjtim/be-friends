import { Img, Avatar } from '@chakra-ui/react'
import { User } from 'interfaces/User'

interface Props {
  user: User
  size?: string
}

const UserImg: React.FC<Props> = ({ user, size = '12' }) =>
  user &&
  (user.picture_url ? (
    <Img src={user.picture_url || ''} borderRadius="full" width={size} height={size} />
  ) : (
    <Avatar borderRadius="full" width={size} height={size} />
  ))

export default UserImg
