import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContacts } from './operations';
// import { nanoid } from 'nanoid';
// const initialContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: initialContacts,
//   reducers: {
//     addContact: {
//       reducer: (state, { payload }) => {
//         //state.push(payload);
//         return [...state, payload];
//       },
//       // підготовча ф-ція
//       prepare: data => {
//         return {
//           payload: {
//             id: nanoid(),
//             ...data,
//           },
//         };
//       },
//     },
//     deleteContact: (state, { payload }) => {
//       return state.filter(({ id }) => id !== payload);
//     },
//   },
// });

// export const { addContact, deleteContact } = contactsSlice.actions;
// export default contactsSlice.reducer;

// function isRejectedAction(action) {
//   return action.type.endsWith('rejected');
// }
// function isPendingAction(action) {
//   return action.type.endsWith('pending');
// }
// function isFulfilledAction(action) {
//   return action.type.endsWith('fulfilled');
// }
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,
    [deleteContacts.pending]: handlePending,
    [deleteContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContacts.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;
