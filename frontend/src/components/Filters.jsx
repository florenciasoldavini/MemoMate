import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Filters.module.css';
import getAllNotes from '../redux/actions/getAllNotes';

function Filters({filters, setFilters}) {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser.id;
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const categories = useSelector((state) => state.categories.allCategories);
    const popupRef = useRef(null);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsPopupVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCheckboxChange = (categoryName) => {
        setFilters((prevFilters) => {
            const isCategoryInFilters = prevFilters.includes(categoryName);

            if (isCategoryInFilters) {
                return prevFilters.filter(category => category !== categoryName);
            } else {
                return [...prevFilters, categoryName];
            }
        });

        dispatch(getAllNotes(userId, filters));
    }

    return (
        <div className="filters">
            <button className={styles.btn} onClick={togglePopup}>
                <svg height="30px"
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    class="w-6 h-6">
                    <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
            </button>
            <div ref={popupRef} className={`${styles.popupMenu} ${isPopupVisible ? styles.show : ''}`}>
                {categories && categories.length ?
                    categories.map((category) => (
                        <div className={styles.listItem} key={category.id}>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={filters.includes(category.name)}
                                onChange={() => handleCheckboxChange(category.name)}
                            />
                            <label className="roboto-regular-20-black" htmlFor={category.id}>{category.name}</label>
                        </div>
                    )) : null}
            </div>
        </div>
    );
};

export default Filters;