import React from 'react';
import { Container, Image } from 'semantic-ui-react';

export default class noMatch extends React.Component {
  state = {
    imageUrls: [],
  };

  render() {
    return (
      <Container textAlign='center'>
        <Image fluid />
        <h1>Not found</h1>
      </Container>
    );
  }
}