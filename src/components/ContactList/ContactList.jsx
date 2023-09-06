import { ButtonStyled, ListItem } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getItem } from 'redux/contactsSlice';
import { getFilter } from 'redux/filterSlice';
import PropTypes from 'prop-types';
function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getItem);
  const filter = useSelector(getFilter);
  const onDelete = e => {
    dispatch(deleteContact(e.target.name));
  };
  const contactsFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <ul>
      {contactsFilter().map(({ id, name, number }) => {
        return (
          <ListItem key={id}>
            {name}: {number}
            <ButtonStyled name={id} type="botton" onClick={onDelete}>
              Delete
            </ButtonStyled>
          </ListItem>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
