// EditNoteModal.jsx
import styles from './EditNoteModal.module.css';
import updateNote from '../redux/actions/updateNote';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getAllNotes from '../redux/actions/getAllNotes';

function EditNoteModal({ isOpen, onClose, noteId, title, content }) {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser.id;


    useEffect(() => {
        setNote({
            title: title,
            content: content
        });
    }, [title, content]);

    const [note, setNote] = useState({
        title: null,
        content: null
    });

    if (!isOpen) {
        return null;
    }

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const autoResizeTextarea = (e) => {
        e.target.style.height = 'auto';
        if (e.target.scrollHeight > e.target.clientHeight) {
            e.target.style.height = e.target.scrollHeight + 'px';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateStatus = await updateNote(noteId, note);

        if (updateStatus && updateStatus.status === "Success") {
            dispatch(getAllNotes(userId));
        };
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <textarea className={styles.input} id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    onChange={handleChange}
                    value={note.title}
                    onInput={autoResizeTextarea}>

                </textarea>
                <textarea className={styles.input} id="content"
                    name="content"
                    type="text"
                    placeholder="Create new note..."
                    onChange={handleChange}
                    value={note.content}
                    onInput={autoResizeTextarea}>
                </textarea>
                <div className={styles.containerBtn}>
                    <div className={styles.containerLeft}>
                        <button onClick={onClose} className={styles.btnClear}>Cancel</button>
                    </div>
                    <div className={styles.containerRight}>
                        <button className={styles.btn} type="submit">Update</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
}

export default EditNoteModal;