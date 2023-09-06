import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getItem } from 'redux/contactsSlice';
import {
  FormStyled,
  InputStyled,
  LabelStyled,
  ButtonStyled,
} from './ContactForm.styled';
import { nanoid } from 'nanoid';

const BASE_STATE = {
  name: '',
  number: '',
};

function ContactForm() {
  const [{ name, number }, setState] = useState(BASE_STATE);
  const dispatch = useDispatch();
  const contacts = useSelector(getItem);

  const submitHandle = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.some(c => c.name.toLowerCase() === newContact.name.toLowerCase())
    ) {
      alert('This contact already exist');
      return;
    }
    dispatch(addContact(newContact));
    setState({ ...BASE_STATE });
  };

  function onInput(e) {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <FormStyled onSubmit={submitHandle}>
      <LabelStyled htmlFor="name">
        Name
        <InputStyled
          onChange={onInput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Name"
        />
      </LabelStyled>
      <LabelStyled htmlFor="number">
        Number
        <InputStyled
          onChange={onInput}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Number"
        />
      </LabelStyled>
      <ButtonStyled type="submit">Add contact</ButtonStyled>
    </FormStyled>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactForm;
