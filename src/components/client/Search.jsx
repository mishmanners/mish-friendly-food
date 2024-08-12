import database from '../../../_data/database.json';
import languages from '../../../_data/languages.json';
import React, { useState } from 'react';

import style from './Search.module.css';

// initialise an object to search properties of JSON database
const translationsDictionary = database.translations;

// define a function to check if a language is valid
const isValidLanguage = (language) => language in languages;

// define a custom error class for translation errors
class TranslationError extends Error {};

const toError = (error) => ({category: 'ERROR', matches: [error.message]});

// define a function to get translations for the selected languages and word
const getTranslationsForLanguages = (fromLang, toLang, word) => {
    // check if the selected languages are valid
    if (!isValidLanguage(fromLang) || !isValidLanguage(toLang)) {
        throw new TranslationError('Invalid language');
    }

    // iterate over each category and translations in the database
    for (let [category, translationsWords] of Object.entries(translationsDictionary)) {
        // check if the word exists in the fromLang translations
        if (translationsWords[fromLang].some(fromWord => fromWord.toLowerCase() === word)) {
            let result = translationsWords[toLang];
            // check if translations exist for the toLang
            if (result?.length > 0) return {
                category,
                matches: result
            };

            throw new TranslationError('Translations not found for selected language combination. Consider adding them to the GitHub repo!');
        }
    }

    throw new TranslationError('Word not found in database. Consider checking for typos or adding it in the GitHub repo!');
}

export const Search = () => {
    // use React state variables to return dynamic dictionaries
    const [translationResults, setTranslationResults] = useState([]);
    
    const searchForTranslations = (e) => {
        e.preventDefault();

        //  Get form data
        const formData = new FormData(e.target.form);

        // get selected languages
        const fromLanguage = formData.get('fromLanguage');
        const toLanguage = formData.get('toLanguage');

        // Get the search query from the form input
        const word = formData.get('wordSearch').trim().toLowerCase();

        if (fromLanguage && toLanguage) {
            // Initialize an object to store the translation results
            let translations = [];

            // Retrieve translations for the selected languages
            try {
                translations.push([word, getTranslationsForLanguages(fromLanguage, toLanguage, word)]);
            } catch(e) {
                translations.push([word, toError(e)]);
            }

            // Display translations to the user as needed
            setTranslationResults(translations);
        
        } else {
            setTranslationResults(['ERROR', toError(new TranslationError('Please select languages'))]);
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
            <ul data-testid="translation-results">
                {translationResults.flatMap(([_query, value]) => value.matches).map((value) => (
                    <li key={value}>{value}</li>
                ))}
            </ul>


        </section>
    );
}
