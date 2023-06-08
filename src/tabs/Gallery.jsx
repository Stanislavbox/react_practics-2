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
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
    console.log(this.state);
  }

  handleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],

      error: null,
      isEmpty: false,
      isShowButton: false,
    });
  };

  getImages = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const {
        page: currentPage,
        per_page,
        photos,
        total_results,
      } = await ImageService.getImages(query, page);

      if (!photos.length) {
        this.setState({ isEmpty: true });
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isShowButton: currentPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleClickBtn = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const { images, isEmpty, isLoading, error, isShowButton } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {images.map(({ id, src: { small }, alt }) => {
            return (
              <GridItem key={id}>
                <CardItem>
                  <img src={small} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isLoading && <Text textAlign="center">Loading ...</Text>}
        {error && <Text textAlign="center">{error}</Text>}
        {isShowButton && (
          <Button onClick={this.handleClickBtn}>Load more</Button>
        )}
      </>
    );
  }
}
