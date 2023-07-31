import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Assets
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai'
// Styles
import styles from '../styles/pages/home.module.css'
// firebase
import { auth } from "../firebase/config";
import 'firebase/auth';


/**
 * Component renders the `404 not found` page.
 */
function Home() {
    // State
    const [data, setData] = useState([])
    // Handlers
    const loadData = async () => {
        // Load data asynchronously from public json file.
        const res = await fetch('data/favorite-articles.json')
        setData(await res.json())
    }
    const user = auth.currentUser;
    
    // Effects
    useEffect(() => {
        // Load data on initial page load.
        loadData()
        userExist()
        
    }, [user])

    const userExist = () => {
        if (user) {
            // User is authenticated, perform the action.
            console.log('User exists:', user.email);
            // Place the action you want to perform here.
          } else {
            // User is not authenticated, prompt them to log in or show an error message.
            console.log('User not authenticated');
            // window.location.href = '/login'; 
          }
    }


    return (
        <div className={styles["Home"]}>
            <div className={styles["modal"]}>
                <section className={styles["favorite-articles"]}>
                    <div className={styles["heading"]}>
                        <div className={styles["title"]}>
                            <AiFillStar size={32} />
                            <h1>המאמרים המועדפים שלי</h1>
                        </div>
                        <div className={styles["search"]}>
                            <AiOutlineSearch size={22} />
                            <input type="text" placeholder='חיפוש מאמר' onClick={()=> window.location.href = '/search'}/>
                        </div>
                    </div>
                    <div className={styles["articles-list"]}>
                        {data.map((a,i) => <Article key={i} {...a}/>)}
                    </div>
                </section>
                <section className={styles["interesting-articles"]}>
                    <div className={styles["heading"]}>
                        <div className={styles["title"]}>
                            <h3>מאמרים שיכולים לעניין אותך</h3>
                        </div>
                    </div>
                    <div className={styles["articles-list"]}>
                        {data.map((a,i) => <Article key={i} {...a}/>)}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home


// Helper components

function Article({ title, description, id }) {
    // States
    const navigate = useNavigate()

    return (
        <div className={styles["article"]} onClick={() => navigate(`/article/${id}`)}>
            <h4 className={styles['title']}>{title}</h4>
            <p className={styles["description"]}>{description}</p>
        </div>
    )
}