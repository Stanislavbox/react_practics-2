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
    this.setState({ isLoading: true });
    try {
      const result = await ImageService.getImages(query, page);
      if (!result.photos.length) { 
        this.setState.isEmpty = true;
        return;
      } 
        this.setState({ images: result.photos });
      
    } catch (error) {
      this.setState({error : error.message})
    } finally {
      this.setState({ isLoading: false });
    }
  }
  

  render() {
    const { images, isEmpty, isLoading, error } = this.state; 
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
      </>
    );
  }
}
