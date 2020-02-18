import React from 'react';
import { Container } from 'semantic-ui-react';

export default class DogheadZh extends React.Component {
  // epid: smaller value means older episode
  // will default to latest one
  state = { epid: 0 };

  /*static getDerivedStateFromProps(nextProps, prevState) {
    const id = nextProps.match.params.epid;
    return {
      epid: id,
    };
  }*/

  goNext = () => {
    const curr = this.state.epid;
    if (true) {
      this.setState({ epid: curr + 1 });
    }
    console.log(this.state.epid);
  };
  goPrev = () => {
    const curr = this.state.epid;
    if (true) {
      this.setState({ epid: curr - 1 });
    }
    console.log(this.state.epid);
  };

  data = [
    {
      url: 'https://i.imgur.com/ECa8jB6.jpg',
      date: '2020/02/19',
      title: '女朋友的照片',
    },
    {
      url: 'https://i.imgur.com/vAk0eTn.jpg',
      date: '2019/12/26',
      title: 'Boxing Day',
    },
  ];

  checkEpidValidity(id) {
    if (id >= 0 && id < this.data.length) return true;
    return false;
  }

  render() {
    if (this.checkEpidValidity(this.state.epid))
      return (
        <Container>
          <button onClick={this.goPrev}>{'<<'}PREV</button>
          <button onClick={this.goNext}>NEXT>></button>

          <div>
            <img src='https://i.imgur.com/IR42UdO.jpg' />
            <img src={this.data[this.state.epid].url} />
          </div>
        </Container>
      );
    else return <div>Invalid request</div>;
  }
}