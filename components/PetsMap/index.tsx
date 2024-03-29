/* eslint-disable react/display-name */
/* eslint-disable no-new */
import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { config } from 'config'
import { Pet } from 'interfaces/Pet'
import { useEffect, useState } from 'react'

interface Marker extends Pet {
  SideContent: React.FC<{ onClick: () => void }>
  MarkerContent: string
}

interface Props {
  markers: Marker[]
}

const Map: React.FC<Props> = ({ markers }) => {
  const [onClicks, setOnClicks] = useState<(() => void)[]>()
  const id = 'map'

  useEffect(() => {
    const bangkok = { lat: 13.75, lng: 100.5 }
    const map = new window.google.maps.Map(document.getElementById(id) as HTMLElement, {
      zoom: 4,
      center: bangkok,
    })

    const finishMarkers = markers.map(marker => {
      if (!(marker?.lat && marker?.lng)) {
        return undefined
      }
      const { lat, lng, MarkerContent, name } = marker
      const location = { lat, lng }

      const infowindow = new window.google.maps.InfoWindow({
        content: MarkerContent,
      })

      const ggmarker = new window.google.maps.Marker({
        position: location as any, // already filted undefined
        map,
        title: name,
      })

      ggmarker.addListener('click', () => {
        infowindow.open({
          anchor: ggmarker,
          map,
          shouldFocus: true,
        })
      })

      return ggmarker
    })
    const onClickFns = finishMarkers.map(marker => () => marker && window.google.maps.event.trigger(marker, 'click'))
    setOnClicks(onClickFns)
  }, [markers])

  return (
    <Flex w="100vw" h="90vh">
      <Box w="25%" overflowY="scroll">
        {onClicks && markers?.map((marker, idx) => <marker.SideContent key={marker.name} onClick={onClicks[idx]} />)}
      </Box>
      <Box id={id} w="74%" />
    </Flex>
  )
}

const render = (markers: Props['markers']) => (status: Status) => {
  switch (status) {
    case Status.FAILURE:
      return <>Failed</>
    case Status.SUCCESS:
      return <Map markers={markers} />
    default:
      return <Spinner />
  }
}

const PetsMap: React.FC<Props> = ({ markers }) => <Wrapper apiKey={config.google.mapApiKey} render={render(markers)} />

export default PetsMap
