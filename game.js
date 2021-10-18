function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export class Game {
    constructor(center, outers, answers) {
        shuffleArray(outers);
        this.center = center;
        this.outers = outers;
        this.letters = outers.concat(center);
        this.answers = answers;
        this.found = [];

        const tiers = [
            { score: 0, label: 'Zarf' },
            { score: 10, label: 'Melvin' },
            { score: 20, label: 'Bad Minton' },
            { score: 40, label: 'Falso Fuego' },
            { score: 50, label: 'El Capitan' },
        ];

        for (let i = 0; i < tiers.length; i++) {
            const tier = tiers[i];
            tier.idx = i;
            tier.score = Math.round(this.maxScore * (i / tiers.length));
        }

        this.tiers = tiers;
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
    isPangram(word) {
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
        if (this.isPangram(word)) {
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
    get maxScore() {
        let score = 0;
        for (const word of this.answers) {
            score += this.scoreNew(word);
        }
        return score;
    }
    get currentTier() {
        const score = this.score;
        let currentTier = this.tiers[0];
        for (const tier of this.tiers) {
            if (score >= tier.score) {
                currentTier = tier;
            }
        }
        return currentTier;
    }
}