import { useState } from 'react'
import { Link } from 'react-router-dom'

// Assets
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai'
// Styles
import styles from '../styles/components/header.module.css'
// firebase
import { auth } from "../firebase/config";

/**
 * Component renders the main app header.
 */
function Header({ setMenu }) {
    const name = auth?.currentUser?.displayName;

    return (
        <header>
            <Link to="/home">
                <img src='/imgs/logo.png' alt="Capish logo" />
            </Link>
            <h2> {name ? auth?.currentUser?.displayName : auth?.currentUser?.email} שלום </h2>
            <nav className={styles["links"]}>
            </nav>
            <section className={styles["r"]}>
                <LogoutBtn />
                <button title='Menu' className={styles['menu-btn']} onClick={() => setMenu(s => !s)}>
                    <AiOutlineMenu size={22}/>
                </button>
            </section>
        </header>
    )
}

export default Header


// Helper components

function LogoutBtn() {
    // States
    const [isLoggingout, setIsLoggingOut] = useState(false)
    // Handlers
    const cancelLogoutHanler = e => {
        e.stopPropagation()
        setIsLoggingOut(false)
    }
    const logoutHandler = e => {
        e.stopPropagation()
        console.log('Logging out...');
      window.location.href = '/login'; 
    }

    return (
        <div className={styles["logout"]} onClick={() => setIsLoggingOut(true)}>
            <span>Logout</span>
            <AiOutlineLogout size={24} />
            {/* confirmation modal */}
            <div className={`${styles["confirmation"]} ${isLoggingout ? styles['show'] : ''}`}>
                <section className={styles["heading"]}>
                    <span>צא</span>
                </section>
                <section className={styles["question"]}>
                    <span>האם אתה בטוח רוצה לצאת?</span>
                </section>
                <section className={styles["btns"]}>
                    <button onClick={cancelLogoutHanler}>לא</button>
                    <button onClick={logoutHandler}>כן</button>
                </section>
            </div>
        </div>
    )
}