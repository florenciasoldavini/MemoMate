import styles from './Notes.module.css';
import Cards from '../components/Cards';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getAllNotes from '../redux/actions/getAllNotes';
import Filters from '../components/Filters';
import FormCreate from '../components/FormCreate';
import getAllCategories from '../redux/actions/getAllCategories';

function Notes() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser.id;
  const notes = useSelector(state => state.notes.allNotes);
  const [filters, setFilters] = useState([]);

  console.log(notes);

  useEffect(() => {
    dispatch(getAllNotes(userId, filters));
    dispatch(getAllCategories(userId));
  }, [dispatch, userId, filters]);


  return (
    <div className={styles.notes}>
      <Filters filters={filters} setFilters={setFilters}/>
      <FormCreate />
      {notes && notes.length ? <Cards notes={notes} /> : null}
    </div>
  )
};


export default Notes;