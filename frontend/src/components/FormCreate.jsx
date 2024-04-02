import createNote from '../redux/actions/createNote';
import styles from './FormCreate.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import getAllNotes from '../redux/actions/getAllNotes';

function FormCreate() {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser.id;

    const [note, setNote] = useState({
        title: null,
        content: null
    });

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const handleClear = () => {
        setNote({
            title: '',
            content: ''
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

        const creationStatus = await createNote(userId, note);

        if (creationStatus && creationStatus.status === "Success") {
            dispatch(getAllNotes(userId));

            setNote({
                title: '',
                content: ''
            });
        };
    };

    return (
        <div className={styles.containerForm} >
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
                        <button onClick={handleClear} className={styles.btnClear}>Clear</button>
                    </div>
                    <div className={styles.containerRight}>
                        <button className={styles.btn} type="submit">Create</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default FormCreate;