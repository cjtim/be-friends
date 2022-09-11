import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'

import 'react-image-gallery/styles/css/image-gallery.css'

interface Props {
  imgs?: ReactImageGalleryItem[]
}

const fallback = '/img/404.png'

const Gallery: React.FC<Props> = ({ imgs = [{ original: fallback, thumbnail: fallback }] }) => (
  <ImageGallery items={imgs} lazyLoad />
)

export default Gallery
