import React from 'react';
import { Segment, Header, Button, Icon, Modal, Form, Input} from 'semantic-ui-react';
import ItemModal from './item-modal'

const ItemsList = ({ items, deleteItem, editItem }) => {

  const itemsList = items.map( item => {
    console.log(item)
    return (

    <Segment key = { item.id } color = 'teal'>
      <Header>{ item.name }</Header>
      <div>address: { item.address }</div>
      <div>price: { item.price }</div>

      
          <ItemModal item={item} type={'edit'}></ItemModal>
          <ItemModal item={item} type={'delete'}></ItemModal>
          {/*
        <Modal.Header>Edit restaurant info</Modal.Header>
        <Modal.Content>
        <Form >
          <Form.Group widths='equal'>
            <Form.Field>
            <label>Name</label>
            <Input placeholder={item.name} type="text" id="name"/>
            </Form.Field>
            <Form.Field>
            <label>Address</label>
            <Input placeholder={item.address} type="text" id="address"/>
            </Form.Field>
            <Form.Field>
            <label>Price</label>
            <Input placeholder={item.price} type="number" id="price"/>
            </Form.Field>
          </Form.Group>
          
          <Button primary onClick={() => {editItem(item)}}>Submit</Button>
          </Form>
        </Modal.Content>

      <Button color='red' size='mini' onClick={() => {deleteItem(item.id)}}>
        <Icon name='delete'></Icon>Delete
      </Button>*/}

    </Segment>
    );
  });
  return (
    <div>
      { itemsList }
    </div>
  )
}
export default ItemsList;
