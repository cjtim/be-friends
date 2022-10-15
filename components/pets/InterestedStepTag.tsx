import { Tag, TagProps } from '@chakra-ui/react'
import { Interested } from 'interfaces/interested'

interface Props {
  step: Interested['step']
}

const colorMap = (status: Interested['step']): TagProps => {
  switch (status) {
    case 'PENDING':
      return {
        colorScheme: 'blue',
      }
    case 'REVIEWING':
      return {
        colorScheme: 'yellow',
      }
    case 'ADOPED':
      return {
        colorScheme: 'green',
      }
    default:
      return {}
  }
}

const InterestedStepTag: React.FC<Props> = ({ step }) => (
  <Tag {...colorMap(step)} textTransform="uppercase">
    {step}
  </Tag>
)

export default InterestedStepTag
