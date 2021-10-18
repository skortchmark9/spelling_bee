const dictionary = await fetch('10k_common.txt');
const text = await dictionary.text();
const allWords = text.split('\n');

const min4Words = allWords.filter((word) => word.length >= 4);



// find only words which consist of letters in the pangram
export function findWordsForPangram(pangram) {
    const re = new RegExp('^[' + pangram + ']+$');
    const matches = min4Words.filter((word) => re.test(word));

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