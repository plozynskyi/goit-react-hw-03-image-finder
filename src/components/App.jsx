import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from '../shared/components/Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ErrorNotification from 'shared/components/Notification/ErrorNotification';

import { searchImage } from 'shared/services/image-api';

import { AppSection } from './app.styled';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    page: 1,
    error: null,
    loading: false,
    showModal: false,
    imageDetails: {},
    loadMoreButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    const prevSearchQuery = prevState.searchQuery;
    const prevPage = prevState.page;

    if (prevSearchQuery !== searchQuery || prevPage !== page) {
      this.fetchImage();
    }
  }

  async fetchImage() {
    try {
      this.setState({ loading: true });
      const { searchQuery, page } = this.state;
      const { hits } = await searchImage(searchQuery, page);

      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...hits],
      }));

      if (hits.length === 0) {
        this.setState({ gallery: [], loadMoreButton: false });
        return toast.warn(
          `No images for ${searchQuery}. Please try something else`
        );
      }
      if (hits.length <= 11) {
        this.setState({ loadMoreButton: false });
        toast.warn(
          `We're sorry, but you've reached the end of search results.`
        );
      } else {
        this.setState({ loadMoreButton: true });
      }
    } catch (error) {
      this.setState({ error: error.message, loadMoreButton: false });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState({ loadMoreButton: false });
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      imageDetails: { largeImageURL, tags },
    }));
  };

  newSearch = ({ searchQuery }) => {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery,
        page: 1,
        gallery: [],
      });
    } else
      toast.warn(
        'Please enter new text for search, the result of current search is already shown'
      );
  };

  render() {
    const { newSearch, toggleModal, loadMore } = this;
    const { showModal, gallery, loading, imageDetails, loadMoreButton, error } =
      this.state;

    return (
      <AppSection>
        <Searchbar onSubmit={newSearch} />
        {Boolean(gallery.length) && (
          <ImageGallery openModal={toggleModal} items={gallery} />
        )}
        {Boolean(loading) && <Loader />}
        {Boolean(loadMoreButton) && <Button loadMore={loadMore} />}
        {Boolean(error) && <ErrorNotification errorMessage={error} />}
        {Boolean(showModal) && (
          <Modal toggleModal={toggleModal} urlImage={imageDetails} />
        )}
        <ToastContainer theme="light" autoClose={3000} />
      </AppSection>
    );
  }
}

export default App;
