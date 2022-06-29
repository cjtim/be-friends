/* eslint-disable react/display-name */
/* eslint-disable no-new */
import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { config } from 'config'
import { useEffect, useState } from 'react'
import PetMiniDetailCard from 'components/pet/PetMiniDetailCard'

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
  const [onClicks, setOnClicks] = useState<(() => void)[]>()
  const id = 'map'

  useEffect(() => {
    const bangkok = { lat: 13.75, lng: 100.5 }
    const map = new window.google.maps.Map(document.getElementById(id) as HTMLElement, {
      zoom: 4,
      center: bangkok,
    })

    const finishMarkers = markers.map(marker => {
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
          shouldFocus: true,
        })
      })

      return ggmarker
    })
    const onClickFns = finishMarkers.map(marker => () => window.google.maps.event.trigger(marker, 'click'))
    setOnClicks(onClickFns)
  }, [markers])

  return (
    <Flex w="100vw" h="90vh">
      <Box w="20%" overflowY="scroll">
        {onClicks &&
          markers?.map((marker, idx) => (
            <PetMiniDetailCard
              key={marker.id}
              title={marker.title}
              id={marker.id}
              onClick={onClicks[idx]}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr5wT7rfkjkGvNeqgXjBmarC5ZNoZs-H2uMpML8O7Q4F9W-IlUQibBT6IPqyvX45NOgw&usqp=CAU"
            />
          ))}
      </Box>
      <Box id={id} w="79%" />
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
