import React from 'react';
import { Segment, Message, Icon, Button, Label } from 'semantic-ui-react';
import ItemModal from './restaurant-modal';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './restaurant.css';

class ItemsList extends React.Component {
  state = {
    items: [],
    authId: '',
    portalOpen: false,
    randomItem: null,
    map: null,
  };

  log = () => {
    console.log('props', this.props);
    console.log('state', this.state);
  };

  processItems(items) {
    if (!this.state.filter) return items;
    let filteredNameItems = this.filterItemsByName(items);
    let filteredPriceItems = this.filterItemsByPrice(filteredNameItems);
    let sortedItems = this.sortItems(filteredPriceItems);
    let tagMatchItems = this.filterItemsByTag(sortedItems);
    return tagMatchItems;
  }

  filterItemsByName = (items) => {
    let searchText = this.state.filter.searchText;
    return searchText
      ? [...items].filter((item) =>
          item.name.toUpperCase().includes(searchText.toUpperCase())
        )
      : [...items];
  };

  filterItemsByPrice = (items) => {
    if (this.state.filter.minPrice) {
      items = items.filter((item) => item.price >= this.state.filter.minPrice);
    }
    if (this.state.filter.maxPrice) {
      items = items.filter((item) => item.price <= this.state.filter.maxPrice);
    }
    return items;
  };

  filterItemsByTag = (items) => {
    let newItems;
    if (this.props.filter.tags[0]) {
      newItems = items.filter((item) =>
        this.props.filter.tags.some((tag) =>
          item.tags ? item.tags.includes(tag) : false
        )
      );
      return newItems;
    }

    return items;
  };

  sortItems = (filteredItems) => {
    let order = this.state.filter.order;
    switch (order) {
      case 'PL2H':
        return filteredItems.sort((a, b) => {
          return a.price - b.price;
        });
      case 'PH2L':
        return filteredItems.sort((a, b) => {
          return b.price - a.price;
        });

      default:
        return filteredItems.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
    }
  };

  displayRandom = () => {
    let filteredList = this.processItems(this.state.items);
    let index = Math.floor(Math.random() * filteredList.length);
    let randomItem = filteredList[index];
    this.setState({ randomItem });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let rawItems = nextProps.items;

    return {
      items: rawItems,
      filter: nextProps.filter,
    };
  }

  render() {
    let processedList = this.state.items ? this.processItems(this.state.items) : [];
    return (
      <div>
        {this.state.randomItem ? (
          <Segment className='random-select-container'>
            <div>
              <h3>{this.state.randomItem.name}</h3>

              <a
                target='_blank'
                href={this.state.randomItem.url}
                rel='noopener noreferrer'
              >
                <Icon name='map marker alternate' color='grey' />
                {this.state.randomItem.address}
              </a>
              <p>
                <Icon name='dollar sign' color='grey' />
                {this.state.randomItem.price}
              </p>

              <p>{/*this.state.randomItem.comments*/}</p>
            </div>

            <Button
              basic
              onClick={() => {
                this.setState({ randomItem: null });
              }}
              content='Close'
              icon='close'
              color='red'
            />
          </Segment>
        ) : (
          ''
        )}

        <div className='space-between'>
          <ItemModal
            map={this.state.map}
            item={{}}
            type={'add'}
            disabled={!this.props.auth.uid}
          ></ItemModal>

          <Button
            size='small'
            disabled={!this.state.items || !this.state.items.length}
            onClick={this.displayRandom}
            content={'Random Select'}
            icon='random'
          />
        </div>

        <p>Number of results: {processedList ? processedList.length : 0}</p>
        {this.state.items ? (
          processedList.map((item) => (
            <Segment key={item.id} color='grey'>
              <h3 className='item-title'>{item.name}</h3>

              <div>
                {item.tags
                  ? item.tags.map((tag) => (
                      <Label key={tag} color='grey'>
                        {tag}
                      </Label>
                    ))
                  : null}
              </div>

              <hr />

              <div className='address'>
                <Icon name='map marker alternate' color='grey' />
                <a target='_blank' href={item.url} rel='noopener noreferrer'>
                  {item.address}
                </a>
              </div>

              <div className='price'>
                {' '}
                <Icon name='dollar sign' color='grey' />
                {item.price}
              </div>

              {/*item.comments ? (
                <div className='comments'>
                  <span>Comments:</span>
                  <div>{item.comments}</div>
                </div>
              ) : (
                ''
              )*/}

              <div className='in-list-actions'>
                <ItemModal map={this.state.map} item={item} type={'edit'}></ItemModal>
                <ItemModal item={item} type={'delete'}></ItemModal>
              </div>
            </Segment>
          ))
        ) : (
          <Message color='yellow'>
            <Icon name='circle notch' loading={true}></Icon>
            loading...
          </Message>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.firestore.ordered.restaurants,
    filter: state.restaurant.filter,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(['restaurants'])
)(ItemsList);
