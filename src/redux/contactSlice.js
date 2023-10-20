import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContacts } from './operations';

function isRejectedAction(action) {
  return action.type.endsWith('rejected');
}
function isPendingAction(action) {
  return action.type.endsWith('pending');
}
function isFulfilledAction(action) {
  return action.type.endsWith('fulfilled');
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(isPendingAction, state => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
