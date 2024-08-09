import database from '../../../_data/database.json';
import languages from '../../../_data/languages.json';
import React, { useState } from 'react';

import style from './Search.module.css';


// initialise an object to search properties of JSON database
const translationsDictionary = database.translations

// define a function to search through database
const getTranslationsForLanguages = (fromLang, toLang, word) => {

    // check if word exists
    if (translationsDictionary.hasOwnProperty(word)) {
        const translationsCategory = translationsDictionary[word];

        // Check if translations exist for the selected languages
        if (translationsCategory.hasOwnProperty(fromLang) &&
            translationsCategory.hasOwnProperty(toLang)) {
            const translateFrom = translationsCategory[fromLang];
            const translateTo = translationsCategory[toLang];

            // define a dictionary to return as value
            const relevantTranslations = [];
            Object.keys(translateFrom).forEach((key) => {
                if (translateTo.hasOwnProperty(key)) {
                    relevantTranslations.push([translateFrom[key], translateTo[key]]);
                }
            });

            return relevantTranslations;
        } else {
            // return an error code and a description of the error
            return [[word, 'Translations not found for selected language combination. Consider adding them to the GitHub repo!']];
        }
    } else {
        // return an error code and a description of the error
        return [[word, 'Word not found in database. Consider checking for typos, ensure your words are separated by commas, or add the translation in the GitHub repo!']];
    }

}
export const Search = () => {
    // use React state variables to return dynamic dictionaries
    const [translationResults, setTranslationResults] = useState([]);

    const searchForTranslations = (e) => {
        e.preventDefault();

        //  Get form data
        const formData = new FormData(e.target.form);

        // Get the search query from the form input
        const searchQuery = formData.get('wordSearch').toLowerCase();

        // Split the search query on comma
        const words = searchQuery.split(',');

        // get selected languages
        const fromLanguage = formData.get('fromLanguage');
        const toLanguage = formData.get('toLanguage');

        if (fromLanguage && toLanguage) {
            // Initialize an object to store the translation results
            let translations = [];

            // Iterate over each word and perform translation
            words.forEach((word) => {
            // Trim and lowercase the word
            const trimmedWord = word.trim().toLowerCase();

            // Retrieve translations for the selected languages
            const translationsArray = getTranslationsForLanguages(fromLanguage, toLanguage, trimmedWord);
            
            // Add the translations to the result object
            translations = translations.concat(translationsArray);
            });

            // Display translations to the user as needed
            console.log(translations);
            setTranslationResults(translations);
        
        } else {
            var error = [['000', 'Please select both From and To languages.']]
            setTranslationResults(error)
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
                    <select id="fromLanguage" name='fromLanguage' className={style.searchInput}>
                        {languageOptions}
                    </select>
                    <label htmlFor="toLanguage">To</label>
                    <select id="toLanguage" name='toLanguage' className={style.searchInput}>
                        {languageOptions}
                    </select>
                    <label htmlFor="wordSearch">Word</label>
                    <input id="wordSearch" name='wordSearch' type="text" placeholder="Translate a word" className={style.translateBox} />
                </div>

                <button className={style.searchButton} onClick={searchForTranslations}>Translate</button>
            </form>

            {/* Display translation results */}
            <h3>Translation Results</h3>
            <ul data-testid="translation-results">
                {translationResults.map(([fromWord, toWord]) => (
                        <li key={fromWord}>
                            <strong>{fromWord}</strong> {toWord}
                        </li>
                    ))
                }
            </ul>


        </section>
    );
}
