import styles from './Topbar.module.css';
import illustration from "../assets/MemoMate_logo.png"
import { useLocation } from 'react-router-dom';

function Topbar() {
    const location = useLocation();
    const isLogin = location.pathname === "/login";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const image = currentUser.image;
    const username = currentUser.name;

    return (
        <div className={styles.topbar}>
            <img className={styles.illustration} src={illustration} alt="MemoMate logo" />
            {
                !isLogin ? 
                <div className={styles.containerRight}>
                <h1 className="roboto-medium-20-black">Hello, {username}</h1>
                <img className={styles.img} src={image} alt="user" />
            </div> : null
            }
        </div>
    );
};

export default Topbar;
