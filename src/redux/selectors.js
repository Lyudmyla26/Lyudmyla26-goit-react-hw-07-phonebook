import { toast } from 'react-toastify';

export const selectContacts = store => store.contacts;
export const selectFilter = store => store.filter;
export const selectLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const getFilteredContacts = store => {
  const { filter, contacts } = store;
  if (!filter) {
    return contacts;
  }
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().trim().includes(normalizedFilter) ||
      number.trim().includes(normalizedFilter)
  );

  if (normalizedFilter && !filteredContacts.length) {
    toast.warn(`No contacts matching your request`, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      toastId: 'custom-id-yes',
    });
  }
  return filteredContacts;
};
