import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  componentDidMount(){
    ImageService.getImages('car', 1)
  }
  render() {
    return (
      <>
      <SearchForm />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
