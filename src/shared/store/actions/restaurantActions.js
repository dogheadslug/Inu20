export const deleteItem = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('restaurants')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_ITEM' });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_ITEM_ERROR', payload: err });
      });
  };
};

export const editItem = (item) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const restaurantRef = firestore.collection('restaurants');
    restaurantRef
      .where('address', '==', item.address)
      .get()
      .then((doc) => {
        if (doc.docs[0].id !== item.id) {
          dispatch({
            type: 'EDIT_ITEM_ERROR',
            payload: 'EDIT restaurant failed. This place already exist in the database',
          });
        } else {
          restaurantRef
            .doc(item.id)
            .update({
              name: item.name,
              address: item.address,
              url: item.url,
              price: item.price,
              comments: item.comments || '',
              tags: item.tags,
            })
            .then(() => {
              dispatch({ type: 'EDIT_ITEM' });
            })
            .catch((err) => {
              dispatch({ type: 'EDIT_ITEM_ERROR', payload: err });
            });
        }
      });
  };
};

export const addItem = (item) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const restaurantRef = firestore.collection('restaurants');
    restaurantRef
      .where('address', '==', item.address)
      .get()
      .then(function (doc) {
        if (doc.size) {
          dispatch({
            type: 'ADD_ITEM_ERROR',
            payload: 'Add restaurant failed. This place already exist in the database',
          });
        } else {
          restaurantRef
            .add({
              name: item.name,
              address: item.address,
              url: item.url,
              price: item.price,
              comments: item.comments || '',
              tags: item.tags,
            })
            .then(() => {
              dispatch({ type: 'ADD_ITEM' });
            })
            .catch((err) => {
              dispatch({ type: 'ADD_ITEM_ERROR', payload: err });
            });
        }
      });
  };
};

export const updateFilter = (filter) => {
  return { type: 'UPDATE_FILTER', filter };
};

export const updateFilterTags = (tags) => {
  return { type: 'UPDATE_FILTER_TAGS', tags };
};
