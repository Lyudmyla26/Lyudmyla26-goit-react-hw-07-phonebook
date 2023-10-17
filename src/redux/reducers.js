import { combineReducers } from 'redux';

import contactsReducer from './contactSlice';
import filterReducer from './filterSlice';

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
