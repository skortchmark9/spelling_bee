function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export class Game {
    constructor(center, outers, answers) {
        this.center = center;
        this.outers = outers;
        this.letters = outers.concat(center);
        this.answers = answers;
        this.found = [];
    }
    validate(word) {
        if (this.found.includes(word)) {
            return false;
        }
        if (word.length < 4) {
            return false;
        }

        for (const char of word) {
            if (!this.letters.includes(char)) {
                return false;
            }
        }

        return this.answers.includes(word);
        return true;
    }
    _isPangram(word) {
        const remainingChars = new Set(this.letters);
        for (const char of word) {
            remainingChars.delete(char);
        }
        return remainingChars.size === 0;
    }
    add(word) {
        this.found.push(word);
    }
    scoreNew(word) {
        if (word.length === 4) {
            return 1;
        }
        if (this._isPangram(word)) {
            return word.length + 7;
        }
        return word.length;    
    }
    
    shuffle() {
        shuffleArray(this.outers);
    }
    get score() {
        let score = 0;
        for (const word of this.found) {
            score += this.scoreNew(word);
        }
        return score;
    }
}