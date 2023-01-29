import PropTypes from 'prop-types';

import { GalleryItem, GalleryImage } from './image-gallery-item.styled';

const ImageGalleryItem = ({ smallImage, bigImage, tags, openModal }) => {
  return (
    <GalleryItem onClick={() => openModal(bigImage, tags)}>
      <GalleryImage src={smallImage} alt={tags} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  smallImage:
    'https://cdn.pixabay.com/photo/2018/03/22/02/37/background-3249063_960_720.png',
  bigImage:
    'https://cdn.pixabay.com/photo/2018/03/22/02/37/background-3249063_960_720.png',
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  id: PropTypes.number,
  smallImage: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
