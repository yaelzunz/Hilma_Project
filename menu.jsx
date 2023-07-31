import { useNavigate } from 'react-router-dom'
// Assets
import { LiaUserSlashSolid } from 'react-icons/lia'
import { AiFillTag, AiFillEdit } from 'react-icons/ai'
// Styles
import styles from '../styles/components/menu.module.css'


/**
 * Component renders the app main menu.
 */
function Menu() {
    // States
    const navigate = useNavigate()

    return (
        <div className={styles["Menu"]}>
            <div className={styles["btns-list"]}>
                <button>
                    מחק את המשתמש לצמיתות
                    <LiaUserSlashSolid size={24}/>
                </button>
                <button>
                    סיווג רמת קושי המאמרים
                    <AiFillTag size={24}/>
                </button>
                <button onClick={() => navigate('/restore-password')}>
                    שינוי סיסמא
                    <AiFillEdit size={24}/>
                </button>
            </div>
        </div>
    )
}

export default Menu
