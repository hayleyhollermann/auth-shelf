import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addItemSaga(action) {
    try {
        // passes new item info from the payload to the server
        yield axios.post('/api/shelf', action.payload);

        // automatically log a user in after registration
        yield put({ type: 'FETCH_ITEMS' });

    } catch (error) {
        console.log('Error with addItemSaga:', error);
        alert('Sorry could not add item at this time.');
    }
}

function* itemSaga() {
    yield takeLatest('ADD_ITEM', addItemSaga);
}

export default itemSaga;
