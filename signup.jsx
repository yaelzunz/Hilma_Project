import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Assets
import { BiHide, BiShow } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
// Styles
import styles from '../styles/pages/signup.module.css'
// firebase
import { createUserWithEmailAndPassword, sendSignInLinkToEmail, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";



function Signup() {
    // States
    const [isShowingPassword, setIsShowingPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [value, setValue] = useState('');


    
    const handleSignup = (e) => {
        e.preventDefault();

        if (email === "" || password === "" || name === "" || selectedDifficulty === null ||selectedInterests === []) {
            alert("אחד מהשדות ריק")

        }
       
        else{
          createUserWithEmailAndPassword(auth, email, password, selectedDifficulty, selectedInterests)
    
            .then(userDetails => {
              const user = userDetails.user;
    
              updateProfile(user, {
                displayName: `${name}`,
                photoURL: null
    
              })
              .then(() => console.log("Sign up successfully!"))
              sendSignInLinkToEmail(auth,email,{
                  url: "http://localhost:3000/home",
                  handleCodeInApp: true,
              })
              alert("שלחנו לך לינק למייל שהזנת. לחץ עליו ותוכל להמשיך לאתר :)")
              console.log(name,selectedDifficulty,selectedInterests)
            })
            .catch((err) => alert("Error in Signup" + err.message));
        }
        
      };




       // Event handler to update the selected difficulty when a radio button is clicked
            const handleDifficultyChange = (event) => {
            const selectedValue = event.target.value;
            setSelectedDifficulty(selectedValue);
            }


        // Event handler to update the selected interests array when checkboxes are checked or unchecked
            const handleInterestChange = (event) => {
            const interest = event.target.value;
            const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedInterests((prevSelectedInterests) => [
                ...prevSelectedInterests,
                interest,
            ]);
        } else {
            setSelectedInterests((prevSelectedInterests) =>
                prevSelectedInterests.filter((item) => item !== interest)
            );
            }
        console.log(selectedInterests)
        }

         // Define the options for interests
             const interestsOptions = [
                "animals",
                "sport",
                "art",
                "carpentry",
                "wrestling",
                "movies",
                "food",
                "toys",
                "books",
                "music",
                "fantasy",
                "cooking",
                "cars",
                "technology",
                    ];

//        Signup with Google
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
                                <input type="radio" name='difficulty' id='Hard' value='hard' onChange={handleDifficultyChange}/>
                                <label htmlFor="">Hard</label>
                                <input type="radio" name='difficulty' id='Meduim' value='medium' onChange={handleDifficultyChange} />
                                <label htmlFor="">Medium</label>
                                <input type="radio" name='difficulty' id='Easy' value='easy' onChange={handleDifficultyChange}/>
                                <label htmlFor="">Easy</label>
                            </div>
                        </div>

                        <button className={styles["loginopt-google"]}onClick={(e) => handleLoginWithGoogle(e)}>
                            <span>התחברות באמצעות גוגל</span>
                            <FcGoogle size={30} />
                        </button>
                    </section>

                    <section className={styles["inputs-r"]}>
                        <div className={styles["input-text"]}>
                            <input type="text" placeholder="שם מלא" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>

                        <div className={styles["input-select"]}>
                            <div
                             className={styles["input-text"]}
                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                            <input type="text" placeholder="תחומי עיניין" />
                            </div>
                            {isDropdownOpen && (
                        <div className={styles["checkbox-list"]}>
                            {interestsOptions.map((interest) => (
                                <label key={interest} className={styles["checkbox-label"]}>
                                <input
                                type="checkbox"
                                value={interest}
                                checked={selectedInterests.includes(interest)}
                                onChange={handleInterestChange}
                                className={styles["checkbox-input"]}
                            />
                            <span className={styles["custom-checkbox"]} />
                                {interest}
                            </label>
                                ))}
                            </div>
                            )}
                        </div>

                        <div className={styles["input-text"]}>
                            <input type="text" placeholder="אימייל" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div className={styles["input-text"]}>
                            <input type={isShowingPassword ? "text" : 'password'} placeholder="צור סיסמא" value={password} onChange={(e)=>setPassword(e.target.value)}/>
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
                                <span>יש לך כבר חשבון? התחבר</span>
                            </NavLink>
                        </section>

                    <input type="submit" value="הירשם" onClick={(e)=> handleSignup(e)}/>
                    </section>

                </form>
            </div>
        </div>
    )
}

export default Signup