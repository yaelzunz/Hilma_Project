import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Assets
import { BiHide, BiShow } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineLock } from 'react-icons/ai'
// Styles
import styles from '../styles/pages/restore-password.module.css'


/**
 * Component renders the restore-password page.
 */
function RestorePassword() {
    // States
    const [isShowingPassword, setIsShowingPassword] = useState(false)

    return (
        <div className={styles["Login"]}>
            <img src="imgs/bulb-books.png" alt="bulb-books" />
            <div className={styles["modal"]}>
                <div className={styles["title"]}>
                    <AiOutlineLock size={24} />
                    <h1>שחזור סיסמא</h1>
                </div>
                <form className={styles["email-verification"]}>
                    <div className={styles["input-text"]}>
                        <label htmlFor="email">רשום את חשבון האימייל שלך</label>
                        <input type="email" id='email' />
                    </div>
                    <div className={styles["input-submit"]}>
                        <input type="submit" value="שלח" />
                    </div>
                </form>
                <span className={styles['form-seperator']}>&nbsp;</span>
                <form className={styles['email-code']}>
                    <div className={styles["input-text"]}>
                        <label htmlFor="code">רשום את הקוד שנשלח אליך</label>
                        <input type="text" id='code' />
                    </div>
                    <div className={styles["input-submit"]}>
                        <input type="submit" value="בדיקה" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RestorePassword