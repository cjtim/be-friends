import { Tag, TagProps } from '@chakra-ui/react'
import { Status } from 'interfaces/status'

interface Props {
  status: Status
}

const colorMap = (status: Status): TagProps => {
  switch (status) {
    case Status.NEW:
      return {
        colorScheme: 'blue',
      }
    case Status.PENDING:
      return {
        colorScheme: 'yellow',
      }
    case Status.ADOPED:
      return {
        colorScheme: 'green',
      }
    default:
      return {}
  }
}

const PetStatusTag: React.FC<Props> = ({ status }) => (
  <Tag {...colorMap(status)} textTransform="uppercase">
    {status}
  </Tag>
)

export default PetStatusTag
