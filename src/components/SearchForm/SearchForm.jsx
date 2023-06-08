import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    value: '',
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    const {value} = this.state
    return (
      <SearchFormStyled>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handleChange}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={value}
        />
      </SearchFormStyled>
    );
  }
}
