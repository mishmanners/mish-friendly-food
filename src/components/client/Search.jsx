import database from '../../../_data/database.json';
import languages from '../../../_data/languages.json';
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    const [defaultFromLanguage, setDefaultFromLanguage] = useState('en');

    useEffect(() => {
        const browserLanguage = navigator.language.split('-')[0];
        if (isValidLanguage(browserLanguage)) {
            setDefaultFromLanguage(browserLanguage);
        }
    }, []);

    const searchForTranslations = (e) => {
        e.preventDefault();

        //  Get form data
        const formData = new FormData(e.target.form);

        // get selected languages
        const fromLanguage = formData.get('fromLanguage');
        const toLanguage = formData.get('toLanguage');

        // Split the search query on comma
        const words = formData.get('foodSearch').split(',').map((word) => word.trim().toLowerCase());

        if (fromLanguage && toLanguage) {
            // Initialize an object to store the translation results
            let translations = [];

            // Iterate over each unique word and perform translation
            new Set(words).forEach((word) => {
                // Retrieve translations for the selected languages
                try {
                    translations.push([
                        word,
                        getTranslationsForLanguages(fromLanguage, toLanguage, word)
                    ]);
                } catch(e) {
                    translations.push([word, toError(e)]);
                }
            });

            // Display translations to the user as needed
            setTranslationResults(translations);
        
        } else {
            setTranslationResults(['ERROR', toError(new TranslationError('Please select languages'))]);
        }
    }

    const exportCard = (style) => {
        const cardElement = document.createElement('div');
        cardElement.style = `
            width: 500px;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            border: 2px solid black;
            background-color: ${style === 'cute' ? '#FFDDC1' : style === 'anime' ? '#D1C4E9' : style === 'modern' ? '#CFD8DC' : '#FFFFFF'};
        `;
        cardElement.innerHTML = `<h3>${style} Card</h3><ul>${translationResults.map(([fromWord, result]) => `<li><strong>${fromWord}</strong>: ${result.matches.join(', ')}</li>`).join('')}</ul>`;
        document.body.appendChild(cardElement);

        html2canvas(cardElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save(`${style}-card.pdf`);
            document.body.removeChild(cardElement);
            document.getElementById('export-success-message').style.display = 'block';
        });
    };

    const languageOptions = Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
    ));

    return (
        <section>
            <h2>Search and Translate</h2>

            <form>
                <div id={style.translationFormContainer}>
                    <label htmlFor="fromLanguage">From</label>
                    <select id="fromLanguage" name='fromLanguage' className={style.searchInput} defaultValue={defaultFromLanguage}>
                        {languageOptions}
                    </select>
                    <label htmlFor="toLanguage">To</label>
                    <select id="toLanguage" name='toLanguage' className={style.searchInput}>
                        {languageOptions}
                    </select>
                    <label htmlFor="foodSearch">Translate food/s</label>
                    <textarea id="foodSearch" name='foodSearch' placeholder="Translate food/s" className={style.translateBox} />
                </div>

                <button className={style.searchButton} onClick={searchForTranslations}>Translate</button>
            </form>

            {/* Display translation results */}
            <h3>Translation Results</h3>
            <ul data-testid="translation-results">
                {translationResults.map(([fromWord, result]) => (
                    <li key={fromWord}>
                        <strong>{fromWord}</strong>
                        <ul>
                            {result.matches.map((word) => (
                                <li key={word}>{word}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <h3>Export Translation as Card</h3>
            <div>
                {['cute', 'anime', 'modern', 'corporate'].map((style) => (
                    <button key={style} class="_searchButton_mlrr6_49" onClick={() => exportCard(style)}>{`Export ${style} Card`}</button>
                ))}
            </div>

            <div id="export-success-message" style={{ display: 'none' }}>Export Successful!</div>
        </section>
    );
}