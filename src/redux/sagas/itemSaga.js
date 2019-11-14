import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

function* itemSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
}

export default itemSaga;
