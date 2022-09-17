/* eslint-disable react/display-name */
/* eslint-disable no-new */
import { Box, Spinner } from '@chakra-ui/react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { config } from 'config'
import { useEffect } from 'react'

interface Props {
  // eslint-disable-next-line no-unused-vars
  onChange: (lat: number, lng: number) => void
  defaultLocation?: {
    lat: number
    lng: number
  }
}

const Map: React.FC<Props> = ({ onChange, defaultLocation }) => {
  const id = 'map'

  useEffect(() => {
    const bangkok = defaultLocation
    const newMap = new window.google.maps.Map(document.getElementById(id) as HTMLElement, {
      zoom: 12,
      center: bangkok,
    })
    const newMarker = new window.google.maps.Marker({
      draggable: true,
      position: bangkok,
      map: newMap,
      title: 'Selected location',
    })

    newMarker.addListener('dragend', (e: any) => {
      onChange(e.latLng.lat(), e.latLng.lng())
    })
  }, [defaultLocation, onChange])

  return <Box id={id} w="100%" h="100%" />
}

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

const SelectLocationMap: React.FC<Props> = ({ onChange, defaultLocation = { lat: 13.75, lng: 100.5 } }) => (
  <Wrapper apiKey={config.google.mapApiKey} render={render({ onChange, defaultLocation })} />
)

export default SelectLocationMap
