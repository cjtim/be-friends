/* eslint-disable react/display-name */
/* eslint-disable no-new */
import { Box, Spinner } from '@chakra-ui/react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { config } from 'config'
import { useEffect } from 'react'

interface Props {
  // eslint-disable-next-line no-unused-vars
  onChange: (lat: number, lng: number) => void
}

const Map: React.FC<Props> = ({ onChange }) => {
  const id = 'map'

  useEffect(() => {
    const bangkok = { lat: 13.75, lng: 100.5 }
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
  }, [onChange])

  return <Box id={id} w="100%" h="100%" />
}

const render = (onChange: Props['onChange']) => (status: Status) => {
  switch (status) {
    case Status.FAILURE:
      return <>Failed</>
    case Status.SUCCESS:
      return <Map onChange={onChange} />
    default:
      return <Spinner />
  }
}

const SelectLocationMap: React.FC<Props> = ({ onChange }) => (
  <Wrapper apiKey={config.google.mapApiKey} render={render(onChange)} />
)

export default SelectLocationMap
