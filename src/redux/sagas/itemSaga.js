import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addItemSaga(action) {
    try {
        // passes new item info from the payload to the server
        yield axios.post('/api/shelf', action.payload);
        yield put({ type: 'FETCH_ITEMS' });

    } catch (error) {
        console.log('Error with addItemSaga:', error);
        alert('Sorry could not add item at this time.');
    }
}

// worker Saga: will be fired on "FETCH_ITEMS" actions
function* fetchItems() {
    try {
    const response = yield axios.get('/api/shelf');

    // this saga will trigger SET_ITEMS reducer and store DB response in said itemReducer
    yield put({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.log('Items get request failed', error);
  }
} 

function* deleteItem(action) {
    try {
        yield axios.delete(`/api/shelf/${action.payload.id}`);
        yield put({ type: 'FETCH_ITEMS' });
    }
    catch (error) {
        console.log('Error with deleteItemSaga', error);
        alert('You are not authorized to delete this gizzoat.');
    }
}

function* itemSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
    yield takeLatest('ADD_ITEM', addItemSaga);
    yield takeLatest('DELETE_ITEM', deleteItem)
}

export default itemSaga;
