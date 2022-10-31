import { Tag, TagProps } from '@chakra-ui/react'
import { Interested, InterestedStep } from 'interfaces/interested'

interface Props {
  step: Interested['step']
}

const colorMap = (status: Interested['step']): TagProps => {
  switch (status) {
    case InterestedStep.PENDING:
      return {
        colorScheme: 'blue',
      }
    case InterestedStep.SCREENING:
      return {
        colorScheme: 'yellow',
      }
    case InterestedStep.CONFIRMATION:
      return {
        colorScheme: 'green',
      }
    case InterestedStep.FAILED:
      return {
        colorScheme: 'red',
      }
    case InterestedStep.PICKEDUP:
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
