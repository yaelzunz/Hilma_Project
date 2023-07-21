import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Assets
import { BiHide, BiShow } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineLock } from 'react-icons/ai'
// Styles
import styles from '../styles/pages/login.module.css'


function Login() {
    // States
    const [isShowingPassword, setIsShowingPassword] = useState(false)

    return (
        <div className={styles["Login"]}>
            <img src="imgs/bulb-books.png" alt="bulb-books" />
            <div className={styles["modal"]}>
                <h1>התחברות</h1>
                <form>
                    <div className={styles["input-text"]}>
                        <input type="text" placeholder="שם משתמש" />
                    </div>
                    <div className={styles["input-text"]}>
                        <input type={isShowingPassword ? "text" : 'password'} placeholder="סיסמא" />
                        <div className={styles["show-input"]} 
                            title={`${isShowingPassword ? 'Hide' : 'Show'} password`}
                            onClick={() => setIsShowingPassword(s => !s)}>
                            { isShowingPassword 
                                ? <BiShow size={18} />
                                : <BiHide size={18} />
                            }
                        </div>
                    </div>
                    <section className={styles["or"]}>
                        <span>or</span>
                    </section>
                    <button className={styles["loginopt-google"]}>
                        <span>התחברות באמצעות גוגל</span>
                        <FcGoogle size={30} />
                    </button>
                    <section className={styles["links"]}>
                        <NavLink to='/signup' className={styles['signup']}>
                            <span>אין לך משתמש? צור עכשיו</span>
                        </NavLink>
                        <NavLink to='/restore-password' className={styles['forgot-password']}>
                            <AiOutlineLock size={14} />
                            <span>שכחת סיסמא?</span>
                        </NavLink>
                    </section>
                    <input type="submit" value="התחבר" />
                </form>
            </div>
        </div>
    )
}

export default Login