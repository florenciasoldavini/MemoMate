import Cards from '../components/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getArchivedNotes from '../redux/actions/getArchivedNotes';
import styles from './Notes.module.css';

function Archived() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser.id;
  const notes = useSelector(state => state.notes.archivedNotes);

  useEffect(() => {
    dispatch(getArchivedNotes(userId));
  }, [dispatch, userId])

  return (
    <div className={styles.notes}>
      {notes && notes.length ? <Cards notes={notes} /> : <p>You have no archived notes yet</p>}
    </div>
  );
};

export default Archived;