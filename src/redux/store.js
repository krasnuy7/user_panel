import {createStore, combineReducers} from 'redux';

import {addUserToArray} from './actions'

const rootReduce = combineReducers({
    users:addUserToArray,
})
const store = createStore(rootReduce);
export default store
