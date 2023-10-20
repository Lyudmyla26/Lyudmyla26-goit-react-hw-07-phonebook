import { useDispatch, useSelector } from 'react-redux';

import { IoPersonRemove } from 'react-icons/io5';
import { Btn, Item, List } from './ContactList.styled';

// redux
import { deleteContacts, fetchContacts } from 'redux/operations';
import { getFilteredContacts } from 'redux/selectors';
import { useEffect } from 'react';

export const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = contactId => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <List>
      {contacts.items.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            <span>{name}:</span>
            <span>{number}</span>
            <Btn type="button" onClick={() => onDeleteContact(id)}>
              <IoPersonRemove size="14" />
            </Btn>
          </Item>
        );
      })}
    </List>
  );
};
