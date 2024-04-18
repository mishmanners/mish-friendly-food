import database from '../../../_data/database.json';
import languages from '../../../_data/languages.json';
import React, { useState } from 'react';

import style from './Search.module.css';

// TODO: Write a service that will restructure the database
//       and provide the details in the correct format. 
//       OR
//       Restructure the database to make it easier to suit
//       a search. Assumptions made is that we can pick any
//       source country and translate. The database at the moment
//       is easy for english translations, but not from one language
//       to another.

const translationsDictionary = database.translations
const getTranslationsForLanguages = (fromLang, toLang, word) => {
    // // display test
    // console.log('Word:', word);
    // console.log('From Language:', fromLang);
    // console.log('To Language:', toLang);

    if (translationsDictionary.hasOwnProperty(word)) {
        const translationsCategory = translationsDictionary[word];
        // Check if translations exist for the selected languages
        if (translationsCategory.hasOwnProperty(fromLang) &&
            translationsCategory.hasOwnProperty(toLang))
            {
                const translateFrom = translationsCategory[fromLang];
                const translateTo = translationsCategory[toLang];

                const relevantTranslations = {};
                Object.keys(translateFrom).forEach((key) => {
                    if (translateTo.hasOwnProperty(key)){
                        relevantTranslations[key] = [translateFrom[key], translateTo[key]];
                    }
                });

                return relevantTranslations;
        } else {
            console.log('Translations not available for selcted language combination');
            return {}
        }
    } else {
    console.log('Word not found in database. Consider checking for typos or adding it in the repository.')
    return {};
    }

    }
export const Search = () => {
    const [translationResults, setTranslationResults] = useState({});
    const searchForTranslations = (e) => {
        e.preventDefault();
        //  Get form data
        const formData = new FormData(e.target.form);
        // Get the search query from the form input
        const searchQuery = formData.get('wordSearch').toLowerCase();
        // get selected languages
        const fromLanguage = formData.get('fromLanguage');
        const toLanguage = formData.get('toLanguage');

        // // display test
        // console.log('Word:', searchQuery);
        // console.log('From Language:', fromLanguage);
        // console.log('To Language:', toLanguage);

        if (fromLanguage && toLanguage) {
            // Retrieve translations for the selected languages
            const translationsDictionary = getTranslationsForLanguages(fromLanguage, toLanguage, searchQuery);
            // Display translations to the user as needed
            console.log(translationsDictionary);
            setTranslationResults(translationsDictionary);
        
        } else {
            console.log('Please select both From and To languages.');
        }
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
                    <select id="fromLanguage" name= 'fromLanguage' className={style.searchInput}>
                        {languageOptions}
                    </select>
                    <label htmlFor="toLanguage">To</label>
                    <select id="toLanguage" name= 'toLanguage' className={style.searchInput}>
                        {languageOptions}
                    </select>
                    <label htmlFor="wordSearch">Word</label>
                    <input id="wordSearch" name= 'wordSearch'type="text" placeholder="Translate a word" className={style.translateBox} />
                </div>

                <button className={style.searchButton} onClick={searchForTranslations}>Translate</button>
            </form>

            {/* Display translation results */}
            <h3>Translation Results</h3>
            <ul>
                {Object.entries(translationResults).map(([key, value]) => (
                    <li key = {key}> {value[1]} </li>
                ))}
            </ul>


        </section>
    );
}