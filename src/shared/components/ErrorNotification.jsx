import PropTypes from 'prop-types';

import { Error } from './error-notification.styled';

const ErrorNotification = ({ errorMessage }) => {
  return <Error>{errorMessage}</Error>;
};

export default ErrorNotification;

ErrorNotification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
