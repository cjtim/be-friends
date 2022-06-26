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

      const infowindow = new window.google.maps.InfoWindow({
        content: `
        <div id="marker-content-${idDOM}" class="chakra-text">
        <h1>${title}</h1>
        ${idDOM}
          <button id="marker-content-btn-${idDOM}" onclick="getElementById('${idDOM}').click()">
          More info
          </button>
        </div>
        `,
      })

      const ggmarker = new window.google.maps.Marker({
        position: location,
        map,
        title,
      })

      ggmarker.addListener('click', () => {
        infowindow.open({
          anchor: ggmarker,
          map,
          shouldFocus: false,
        })
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

const GGMap: React.FC<Props> = ({ markers }) => <Wrapper apiKey={config.google.mapApiKey} render={render(markers)} />

export default GGMap
