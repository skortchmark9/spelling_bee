// const dictionary = await fetch('1k_common.json');
// const json = await dictionary.json()
// const allWords = json.commonWords;

const dictionary = await fetch('10k_common.txt');
const text = await dictionary.text();
const allWords = text.split('\n');

const min4Words = allWords.filter((word) => word.length >= 4);

const pangrams = [
    'triptych',
    'gouache',
    'saltine',
    'fritopie',
    'licorace',
    'flippers',
    'dartboard',
    'schlomp',
    'crosstrek',
    'mineral',
    'boulder',
];


function isPangram(word, game) {
    const remainingChars = new Set(game.outers.concat(game.center));
    for (const char of word) {
        remainingChars.delete(char);
    }
    return remainingChars.size === 0;
}

function score(word, game) {
    if (word.length === 4) {
        return 1;
    }
    if (isPangram(word)) {
        return word.length + 7;
    }
    return word.length;
}


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