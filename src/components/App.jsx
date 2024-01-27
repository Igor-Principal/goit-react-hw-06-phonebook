import css from './app.module.css';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from 'store/contacts/contactSlice';
import { filterValue } from 'store/filter/filterSlice';

export const App = () => {
  const { contacts } = useSelector(state => state.contacts);
  const { filter } = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const createContact = data => {
    dispatch(addContact({ ...data, id: nanoid() }));
  };

  const handleFilter = ({ target }) => {
    dispatch(filterValue(target.value));
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <Phonebook createContact={createContact} data={contacts} />
      {contacts.length > 0 && (
        <>
          <h2 className={css.title}>Contacts</h2>
          <Filter filter={filter} onChange={handleFilter} />
          <Contacts data={filtered} handleDelete={handleDelete} />
        </>
      )}
    </div>
  );
};
