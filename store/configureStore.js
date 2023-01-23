import { createStore, combineReducers } from 'redux';
import userReducer from './reducer/userReducer';
const rootReducer = combineReducers(
    { user: userReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;