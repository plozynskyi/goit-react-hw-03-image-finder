import PropTypes from 'prop-types';

import { ButtonLoadMore } from './button.style';

const Button = ({ loadMore }) => {
  return <ButtonLoadMore onClick={() => loadMore()}>Load more</ButtonLoadMore>;
};
export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
