import { translations } from '../../../_data/database.json';
import languages from '../../../_data/languages.json';

import style from './Search.module.css';

// TODO: Write a service that will restructure the database
//       and provide the details in the correct format. 
//       OR
//       Restructure the database to make it easier to suit
//       a search. Assumptions made is that we can pick any
//       source country and translate. The database at the moment
//       is easy for english translations, but not from one language
//       to another.

export const Search = () => {
    const searchForTranslations = (e) => {
        e.preventDefault();
        //  Get form data
        const formData = new FormData(e.target.form);
        // Get the search query from the form input
        const searchQuery = formData.get('wordSearch');
        // display on console;
        console.log("Search query:", searchQuery);
    }

    const languageOptions = Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
    ));

    return (
        <section>
            <h2>Search</h2>

            <form>
                <div id={style.translationFormContainer}>
                    <label htmlFor="fromLanguage">From</label>
                    <select id="fromLanguage" className={style.searchInput}>
                        {languageOptions}
                    </select>
                    <label htmlFor="toLanguage">To</label>
                    <select id="toLanguage" className={style.searchInput}>
                        {languageOptions}
                    </select>
                    <label htmlFor="wordSearch">Word</label>
                    <input id="wordSearch" name= 'wordSearch'type="text" placeholder="Translate a word" className={style.translateBox} />
                </div>

                <button className={style.searchButton} onClick={searchForTranslations}>Translate</button>
            </form>
        </section>
    );
}