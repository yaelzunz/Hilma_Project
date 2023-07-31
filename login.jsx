import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Assets
import { BiHide, BiShow } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineLock } from 'react-icons/ai'
// Styles
import styles from '../styles/pages/login.module.css'
// firebase
import { signInWithEmailAndPassword, signInWithPopup, sendSignInLinkToEmail } from "firebase/auth";
import { auth, provider } from "../firebase/config";


function Login() {
    // States
    const [isShowingPassword, setIsShowingPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [value, setValue] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "" || password === "") 
            alert("אחד מהשדות ריק")
        else {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Loged in successfully!")
                sendSignInLinkToEmail(auth,email,{
                    url: "http://localhost:3000/home",
                    handleCodeInApp: true,
                })
                alert("שלחנו לך לינק למייל שהזנת. לחץ עליו ותוכל להמשיך לאתר :)")
              })            .catch((err) => alert("שם משתמש או סיסמה לא נכונים"));
        }
      };

    //   signup with google
      const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth,provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem("email", data.user.email)

        }).catch((err)=>{
            console.log(err)
        })

      }

     

    

    return (
        <div className={styles["Login"]}>
            <img src="imgs/bulb-books.png" alt="bulb-books" />
            <div className={styles["modal"]}>
                <h1>התחברות</h1>
                <form>
                    <div className={styles["input-text"]}>
                        <input type="text" placeholder="אימייל" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className={styles["input-text"]}>
                        <input type={isShowingPassword ? "text" : 'password'} placeholder="סיסמא" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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
                    {value ? window.location.href = '/home' : <button className={styles["loginopt-google"]} onClick={(e) => handleLoginWithGoogle(e)}>
                        <span>התחברות באמצעות גוגל</span>
                        <FcGoogle size={30} />
                    </button>}
                    <section className={styles["links"]}>
                        <NavLink to='/signup' className={styles['signup']}>
                            <span>אין לך משתמש? צור עכשיו</span>
                        </NavLink>
                        <NavLink to='/restore-password' className={styles['forgot-password']}>
                            <AiOutlineLock size={14} />
                            <span>שכחת סיסמא?</span>
                        </NavLink>
                    </section>
                    <input type="submit" value="התחבר" onClick={(e)=> handleLogin(e)}/>
                </form>
            </div>
        </div>
    )
}

export default Login