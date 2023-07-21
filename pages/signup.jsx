import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Assets
import { BiHide, BiShow } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineLock } from 'react-icons/ai'
// Styles
import styles from '../styles/pages/signup.module.css'


function Signup() {
    // States
    const [isShowingPassword, setIsShowingPassword] = useState(false)

    return (
        <div className={styles["Signup"]}>
            <div className={styles["modal"]}>
                <div className={styles["title"]}>
                    <h1>הרשמה</h1>
                    <h3>בואו לגלות את קאפיש</h3>
                </div>
                <form>
                    <section className={styles["inputs-l"]}>
                        <div className={styles["input-radio"]}>
                            <span>רמת קושי</span>
                            <div className={styles["radio-list"]}>
                                <input type="radio" name='difficulty' id='Hard' value='hard' />
                                <label htmlFor="">Hard</label>
                                <input type="radio" name='difficulty' id='Meduim' value='medium' />
                                <label htmlFor="">Medium</label>
                                <input type="radio" name='difficulty' id='Easy' value='easy' />
                                <label htmlFor="">Easy</label>
                            </div>
                        </div>
                        <button className={styles["loginopt-google"]}>
                            <span>התחברות באמצעות גוגל</span>
                            <FcGoogle size={30} />
                        </button>
                    </section>
                    <section className={styles["inputs-r"]}>
                        <div className={styles["input-text"]}>
                            <input type="text" placeholder="שם מלא" />
                        </div>
                        <div className={styles["input-select"]}>
                            <select name="preferences" id="references" value="תחומי עניין">
                                <option defaultChecked={true}>תחומי עניין</option>
                            </select>
                        </div>
                        <div className={styles["input-text"]}>
                            <input type="text" placeholder="אימייל" />
                        </div>
                        <div className={styles["input-text"]}>
                            <input type="text" placeholder="שם משתמש" />
                        </div>
                        <div className={styles["input-text"]}>
                            <input type={isShowingPassword ? "text" : 'password'} placeholder="צור סיסמא" />
                            <div className={styles["show-input"]} 
                                title={`${isShowingPassword ? 'Hide' : 'Show'} password`}
                                onClick={() => setIsShowingPassword(s => !s)}>
                                { isShowingPassword 
                                    ? <BiShow size={18} />
                                    : <BiHide size={18} />
                                }
                            </div>
                        </div>
                        <section className={styles["links"]}>
                            <NavLink to='/login' className={styles['login']}>
                                <span>יש לך כבר חשבון? הירשם</span>
                            </NavLink>
                        </section>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Signup