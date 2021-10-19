// const dictionary = await fetch('10k_common.txt');
// const text = await dictionary.text();
// const allWords = text.split('\n');

const dictionary = await fetch('scrabble.json');
const text = await dictionary.json();
const allWords = text;

const min4Words = allWords.filter((word) => word.length >= 4);



// find only words which consist of letters in the pangram
export function findWordsForPangram(pangram, center) {
    const re = new RegExp('^[' + pangram + ']+$');
    let matches = min4Words.filter((word) => re.test(word));
    if (center) {
        matches = matches.filter((word) => word.includes(center));
    }

    const minimums = matches.filter((word) => word.length > 3);
    return minimums;
}

export function determineCenterLetter(pangram) {
    const allWords = findWordsForPangram(pangram);

    const possibilities = {};
    for (const letter of pangram) {
        possibilities[letter] = allWords.filter((word) => word.includes(letter));
    }
    return possibilities;
}