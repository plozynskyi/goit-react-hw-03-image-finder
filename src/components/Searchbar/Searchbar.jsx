import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchButtonLabel,
  SearchFormInput,
} from './searchbar.styled.jsx';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.warn('Please enter what you are looking for');
    }
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      searchQuery: '',
    });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { searchQuery } = this.state;

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            name="searchQuery"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search images and photos"
            required
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;
