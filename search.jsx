// import './ChoosePage.css'
import styles from '../styles/pages/ChoosePage.css'

import * as WordDifficulty from '../difficulty/WordDifficulty';
import {useState} from "react";

export default function ChoosePage() {
    const apiKey = 'pub_18767787af9162e3c70233a7ce9bc92aa9fe4';
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [query, setQuery] = useState('');
    const [difficulty, setDifficulty] = useState(WordDifficulty.EASY);

    return <div className={'container'}>
        <div className={'form'}>
            <small className={'label'}>Subject:</small>
            <input onChange={event => setQuery(event.target.value)} className={'input'} type="text"/>
        </div>
        <div className={'form'}>
            <small className={'label'}>Difficulty:</small>
            <div style={{width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                        <input onInput={e => setDifficulty(WordDifficulty.EASY)} type={'radio'} defaultChecked={true} id={'easy'} name={'difficulty'} value={'easy'}/>
                        <label htmlFor={'easy'}>Easy</label>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                        <input onInput={e => setDifficulty(WordDifficulty.HARD)} type={'radio'} id={'hard'} name={'difficulty'} value={'hard'}/>
                        <label htmlFor={'hard'}>Hard</label>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={() => handleSubmit(query, apiKey, setContent, setTitle, setAuthor, setImage, difficulty)}>Submit</button>
        <img style={{height: 300, marginTop: 20}} src={image} alt={'article'}/>
        <p>{title}</p>
        <p>{content}</p>
        <p>{author}</p>
    </div>
}

// On submit click.
const handleSubmit = (query, apiKey, setContent, setTitle, setAuthor, setImage, difficulty) => {
    loadArticle(query, apiKey, setContent, setTitle, setAuthor, setImage, difficulty);
};

// Loads articles and shows them on the screen.
const loadArticle = (query, apiKey, setContent, setTitle, setAuthor, setImage, difficulty) => {
    const url = `https://newsdata.io/api/1/news?` +
        `apikey=${apiKey}&` + 
        `q=${query}&` + 
        `language=he,en`;

    const minWordCount = 500;
    const maxWordCount = 1000;

    const req = new Request(url);

    fetch(req).then(function(response) {
        response.json().then(data => {
            let chosenArticle = null;
            let difficultyMaxWordCount = -1;
            let results = data.results.filter(article => wordCount(article.content) > minWordCount && wordCount(article.content) < maxWordCount)
            results.forEach(article => {
                const words = article.content.split(' ');

                let difficultyWordCount = 0;

                switch (difficulty) {
                    case WordDifficulty.EASY:
                        words.forEach(word => {
                            if (WordDifficulty.easy.includes(word)) 
                                difficultyWordCount++
                        });
                        break;
                    case WordDifficulty.HARD:
                        words.forEach(word => {
                            if (WordDifficulty.hard.includes(word))
                                difficultyWordCount++
                        });
                        break;
                }

                for (let i = 0; i < words.length; i++)
                {
                    if (difficulty === WordDifficulty.EASY) {
                        const index = WordDifficulty.easy.indexOf(words[i]);
                        if (index !== -1) {
                            const word = words[i];
                            const translatedWord = WordDifficulty.easy_hebrew[index];
                            words[i] = <span><span onClick={e => e.currentTarget.innerText = WordDifficulty.easy.indexOf(e.currentTarget.innerText) !== -1 ? translatedWord : word} style={{backgroundColor: "yellow", cursor: 'help'}}>{word}</span> </span>
                        }
                        else
                            words[i] += ' '
                    }
                    else {
                        const index = WordDifficulty.hard.indexOf(words[i]);
                        if (index !== -1) {
                            const word = words[i];
                            const translatedWord = WordDifficulty.hard_hebrew[index];
                            words[i] = <span><span onClick={e => e.currentTarget.innerText = WordDifficulty.hard.indexOf(e.currentTarget.innerText) !== -1 ? translatedWord : word} style={{backgroundColor: "yellow", cursor: 'help'}}>{word}</span> </span>
                        }
                        else
                            words[i] += ' '
                    }
                }

                article.words = words;

                if (difficultyWordCount > difficultyMaxWordCount) {
                    difficultyMaxWordCount = difficultyWordCount;
                    chosenArticle = article;
                }
            });

            setTitle(chosenArticle.title);
            setContent(chosenArticle.words);
            setImage(chosenArticle.image_url);
        })
    })
};

// returns the amount of words in a given string
const wordCount = str => {
    let count = 0;

    if (str === null)
        return count;

    for (const char of str) {
        if (char === ' ')
            count++;
    };

    return count;
}