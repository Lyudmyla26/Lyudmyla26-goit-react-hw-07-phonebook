import { useDispatch, useSelector } from 'react-redux';

import { IoPersonRemove } from 'react-icons/io5';
import { Btn, Item, List } from './ContactList.styled';

// redux
import { deleteContacts } from 'redux/operations';
import { getFilteredContacts } from 'redux/selectors';

export const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <List>
      {filteredContacts.map(({ name, number, id }) => {
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
