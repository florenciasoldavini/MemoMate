import React, { useState, useEffect, useRef } from 'react';
import styles from "./Card.module.css";
import deleteNote from '../redux/actions/deleteNote';
import restoreNote from '../redux/actions/restoreNote';
import getAllNotes from '../redux/actions/getAllNotes';
import getDeletedNotes from '../redux/actions/getDeletedNotes';
import archiveNote from '../redux/actions/archiveNote';
import unarchiveNote from '../redux/actions/unarchiveNote';
import getArchivedNotes from '../redux/actions/getArchivedNotes';
import createCategory from '../redux/actions/createCategory';
import getAllCategories from '../redux/actions/getAllCategories';
import updateNote from '../redux/actions/updateNote';
import EditNoteModal from './EditNoteModal';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Card({ id, title, content, categories = [] }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser.id;
    const isDeleted = location.pathname === "/deleted";
    const isArchived = location.pathname === "/archived";
    const popupRef = useRef(null);
    const addTagPopupRef = useRef(null);
    const allCategories = useSelector((state) => state.categories.allCategories);

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [isAddTagPopupVisible, setIsAddTagPopupVisible] = useState(false);

    const [search, setSearch] = useState('');

    const [tags, setTags] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(isModalOpen);

    const togglePopup = () => {
        console.log('togglePopup');
        setIsPopupVisible(!isPopupVisible);
    };

    const toggleAddTagPopup = () => {
        setIsAddTagPopupVisible(!isAddTagPopupVisible);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        document.body.classList.toggle('blur');
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsPopupVisible(false);
        }
    };

    const handleAddTagPopupClickOutside = (event) => {
        if (addTagPopupRef.current && !addTagPopupRef.current.contains(event.target)) {
            setIsAddTagPopupVisible(false);
        }
    };

    const handleDelete = async () => {
        await deleteNote(id)

        if (isArchived) {
            dispatch(getArchivedNotes(userId))
        } else {
            dispatch(getAllNotes(userId))
        }
    };

    const handleRestore = async () => {
        await restoreNote(id)

        dispatch(getDeletedNotes(userId))
    };

    const handleArchive = async () => {
        await archiveNote(id)

        dispatch(getAllNotes(userId))
    };

    const handleUnarchive = async () => {
        await unarchiveNote(id)

        dispatch(getArchivedNotes(userId))
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleCheckboxChange = async (categoryName) => {
        setTags((prevTags) => {
            const isCategoryInTags = prevTags.includes(categoryName);

            if (isCategoryInTags) {
                return prevTags.filter(category => category !== categoryName);
            } else {
                return [...prevTags, categoryName];
            }
        });
    };

    useEffect(() => {
        const updateNoteWithNewTags = async () => {
            const updateStatus = await updateNote(id, {
                title,
                content,
                tags,
            });

            if (updateStatus && updateStatus.status === "Success") {
                dispatch(getAllNotes(userId));
            }
        };
        updateNoteWithNewTags();
    }, [tags, id, title, content, dispatch, userId]);

    const handleCreateTag = async () => {
        if (!search || search === "") return;

        const creationStatus = await createCategory(userId, search);

        if (creationStatus.status === "Success") {
            dispatch(getAllCategories(userId));
            setSearch('');
        };
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleAddTagPopupClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleAddTagPopupClickOutside);
        };
    }, []);

    return (
        <div className={styles.card}>
            <h1 className="roboto-medium-20-black">{title}</h1>
            <p className="roboto-regular-20-black">{content}</p>
            <div className={styles.containerTags}>
                {categories && categories.length ?
                    categories.map(category => {
                        return <div className={styles.tag}>
                            <p className="roboto-medium-16-black">{category.name}</p>
                        </div>
                    }) : null
                }
            </div>
            {isDeleted ?
                <button className={styles.btn} onClick={handleRestore}>
                    <svg height="25px"
                        width="25px"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button> :
                <button className={styles.btn} onClick={togglePopup}>
                    <svg height="30px"
                        width="30px"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </button>
            }
            <div ref={popupRef} className={`${styles.popupMenu} ${isPopupVisible ? styles.show : ''}`}>
                <button className={styles.menuItem} onClick={toggleModal}>
                    <p className="roboto-regular-20-black">Edit note</p>
                </button>
                <EditNoteModal isOpen={isModalOpen} onClose={toggleModal} noteId={id} title={title} content={content} />
                <button className={styles.menuItem} onClick={toggleAddTagPopup}>
                    <p className="roboto-regular-20-black">Edit tags</p>
                </button>
                {isArchived ?
                    <button className={styles.menuItem} onClick={handleUnarchive}>
                        <p className="roboto-regular-20-black">Unarchive note</p>
                    </button> :
                    <button className={styles.menuItem} onClick={handleArchive}>
                        <p className="roboto-regular-20-black">Archive note</p>
                    </button>
                }
                <button className={styles.menuItem} onClick={handleDelete}>
                    <p className="roboto-regular-20-black">Delete note</p>
                </button>
            </div>
            <div ref={addTagPopupRef} className={`${styles.popupMenu} ${isAddTagPopupVisible ? styles.show : ''}`}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder='Search tags...'
                    value={search}
                    onChange={handleSearch}
                />
                {allCategories && allCategories.length ?
                    allCategories.map((category) => (
                        <div className={styles.listItem} key={category.id}>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={tags.includes(category.name)}
                                onChange={() => handleCheckboxChange(category.name)}
                            />
                            <label className="roboto-regular-20-black" htmlFor={category.id}>{category.name}</label>
                        </div>
                    )) : null}
                <button onClick={handleCreateTag}>
                    <p className="roboto-regular-12-black">Create tag "{search}"</p>
                </button>
            </div>
        </div >
    );
};

export default Card;
