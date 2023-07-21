import { useEffect, useState } from 'react'
// Assets
import { AiOutlineStar } from 'react-icons/ai'
// Styles
import styles from '../styles/pages/article.module.css'
import { useParams } from 'react-router-dom'


/**
 * Component renders the article page.
 */
function Article() {
    // State
    const { id } = useParams()
    const [data, setData] = useState(null)
    // Handlers
    const loadData = async () => {
        // Load data (specific article) asynchronously from public json file.
        const res = await fetch('/data/favorite-articles.json')
        const articles = await res.json()
        setData(articles.filter(a => a.id == id)?.[0])
    }

    // Effects
    useEffect(() => {
        // Load data on initial page load.
        loadData()
    }, [])

    return (
        <div className={styles["Article"]}>
            <section className={styles["text"]}>
                <div className={styles["heading"]}>
                    <h2>Title: {data?.title}</h2>
                    <AiOutlineStar size={26}/>
                </div>
                <span className={styles['introduction']}>Introduction: {data?.description
                    // .split('\n')
                    // .map(l => <>{l}<br/></>)
                    .split(' ')
                    .map((w,i) => <><HighlightWords 
                        key={i} 
                        w={w}
                        meaning={data?.meaningsByWordIndex?.[i] ?? 'unknown'} 
                        isHighlghted={i % 10 === 0} />&nbsp;
                    </>)
                }</span>
            </section>
            <section className={styles["forms"]}>
                {data?.questions.map((q,i) => <QuestionForm key={i} q={q}/>)}
            </section>
        </div>
    )
}

export default Article


// Halper components


/**
 * Component renders an article question form
 */
function QuestionForm({ q }) {
    return (
        <form>
            <section className={styles["question"]}>
                <h4>שאלה:</h4>
                <span>{q.q}</span>
            </section>
            <section className={styles["answer"]}>
                <h4>{q?.opts ? 'תשובות:' : 'תשובה:'}</h4>
                { !q?.opts
                    ? <textarea cols="30" rows="10" placeholder='כתוב כאן' />
                    : <ol className={styles["options-list"]}>
                        { q.opts.map((o,i) => 
                            <li key={i}>{o}</li>) }
                    </ol>
                }
            </section>
        </form>
    )
}


/**
 * Component gets a word and returns a highlighted word with explanation.
 * The component currently determines the highlighted word via a 10% probability function, but a defined function can be implemented later.
 */
function HighlightWords({ w, isHighlghted, meaning }) {
    // States
    const [show, setShow] = useState(false)
    // Handlers
    const showHandler = () => {
        if (isHighlghted)
            setShow(true)
    }
    return (
        <span className={isHighlghted ? styles['marked'] : ''} onClick={showHandler}>
            {show ? <>&nbsp;&nbsp;{meaning}&nbsp;&nbsp;</> : w}
        </span>
    )
}