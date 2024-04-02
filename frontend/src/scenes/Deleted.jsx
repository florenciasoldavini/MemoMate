import Cards from '../components/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getDeletedNotes from '../redux/actions/getDeletedNotes';
import styles from './Notes.module.css';

function Deleted() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser.id;
  const notes = useSelector(state => state.notes.deletedNotes);

  useEffect(() => {
    dispatch(getDeletedNotes(userId));
  }, [dispatch, userId])

  return (
    <div className={styles.notes}>
      {notes && notes.length ? <Cards notes={notes} /> : <p>You have no deleted notes yet</p>}
    </div>
  );
};

export default Deleted;