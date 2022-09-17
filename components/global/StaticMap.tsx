import { Box, Spinner } from '@chakra-ui/react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { config } from 'config'
import { useEffect } from 'react'

interface Props {
  lat: number
  lng: number
}

const Map: React.FC<Props> = ({ lat, lng }) => {
  const id = 'map'

  useEffect(() => {
    const newMap = new window.google.maps.Map(document.getElementById(id) as HTMLElement, {
      zoom: 12,
      center: { lat, lng },
    })
    // eslint-disable-next-line no-new
    new window.google.maps.Marker({
      draggable: false,
      position: { lat, lng },
      map: newMap,
      title: 'Selected location',
    })
  }, [lat, lng])

  return <Box id={id} w="100%" h="100%" />
}

// eslint-disable-next-line react/display-name
const render = (props: Props) => (status: Status) => {
  switch (status) {
    case Status.FAILURE:
      return <>Failed</>
    case Status.SUCCESS:
      return <Map {...props} />
    default:
      return <Spinner />
  }
}

const StaticMap: React.FC<Props> = ({ lat, lng }) => (
  <Wrapper apiKey={config.google.mapApiKey} render={render({ lat, lng })} />
)

export default StaticMap
