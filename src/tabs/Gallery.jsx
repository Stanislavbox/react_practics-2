import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    isEmpty: false,
    isShowButton: false,
  };

  // componentDidMount() {
  //   ImageService.getImages('car', 1);
  // }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.getImages(query, page);
    }
    console.log(this.state);
  }

  handleSubmit = value => {
    this.setState({ query: value });
  };

  getImages = async (query, page) => {
    const some = await ImageService.getImages(query, page);
    this.setState({ images: some.photos });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
