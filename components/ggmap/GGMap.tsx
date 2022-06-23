/* eslint-disable react/display-name */
/* eslint-disable no-new */
import { Box, Spinner } from '@chakra-ui/react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { config } from 'config'
import { useEffect } from 'react'

interface Props {
  markers: {
    lat: number
    lng: number
    id: string
    title: string
    content: React.ReactNode
  }[]
}

const Map: React.FC<Props> = ({ markers }) => {
  const id = 'map'

  useEffect(() => {
    const bangkok = { lat: 13.75, lng: 100.5 }
    const map = new window.google.maps.Map(document.getElementById(id) as HTMLElement, {
      zoom: 4,
      center: bangkok,
    })

    markers.forEach(marker => {
      const { lat, lng, id: idDOM, title } = marker
      const location = { lat, lng }

      const rawElement = window.document.createElement('div')
      rawElement.setAttribute('id', idDOM)

      const ggmarker = new window.google.maps.Marker({
        position: location,
        map,
        title,
      })

      ggmarker.addListener('click', () => {
        window.document.getElementById(idDOM)?.click()
      })
    })
  }, [markers])

  return (
    <Box w="100%" h="100%">
      {markers && markers.map(marker => marker.content)}
      <Box id={id} w="100%" h="100%" />
    </Box>
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

const GGMap: React.FC<Props> = ({ markers }) => (
  <Box w="100vw" h="100vh">
    <Wrapper apiKey={config.google.mapApiKey} render={render(markers)} />
  </Box>
)

export default GGMap
