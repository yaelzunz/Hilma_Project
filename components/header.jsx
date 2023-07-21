import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Assets
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai'
// Styles
import styles from '../styles/components/header.module.css'


/**
 * Component renders the main app header.
 */
function Header({ setMenu }) {
    return (
        <header>
            <img src='/imgs/logo.png' alt="Capish logo" />
            <nav className={styles["links"]}>
                <NavLink to='/signup'>Sign-Up</NavLink>
                <NavLink to='/home'>Home</NavLink>
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
        // ...
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