import { Game } from './game.js';
import { games } from './games.js';


const timeout = (n) => new Promise((resolve) => setTimeout(resolve, n));

const bindEvents = (node, evts, callback) => {
    for (const eventType of evts) {
        node.addEventListener(eventType, callback);
    }
}

// const initialGame = new Game('u', [ 'd', 'e', 'i', 'n', 't', 'c'], [
//     "inducted",
//     "inductee",
//     "cued",
//     "cute",
//     "cutie",
//     "deduce",
//     "deduced",
//     "deduct",
//     "deducted",
//     "denude",
//     "denuded",
//     "deuce",
//     "duct",
//     "ducted",
//     "dude",
//     "duded",
//     "duet",
//     "duetted",
//     "dunce",
//     "dune",
//     "dunned",
//     "educe",
//     "educed",
//     "endue",
//     "endued",
//     "ennui",
//     "etude",
//     "induce",
//     "induced",
//     "induct",
//     "intuit",
//     "intuited",
//     "nude",
//     "nudie",
//     "tune",
//     "tuned",
//     "tunic",
//     "tutee",
//     "tutted",
//     "tutti",
//     "tutu",
//     "uncut",
//     "undecided",
//     "undetected",
//     "undid",
//     "undue",
//     "unedited",
//     "unintended",
//     "unit",
//     "unite",
//     "united",
//     "unneeded",
//     "untie",
//     "untied",
//     "untune",
//     "untuned"
// ]
// );

// initialGame.found = ['inducted', 'inductee', 'cued', 'cute', 'cutie', 'deduce', 'deduced', 'deducted', 'denude', 'denuded']
const initialGame = games[8];

export class SpellingBee {
    constructor(container, game) {
        this._container = container;
        this._game = game;

        this._setupEvents(container);

        this.newGame(game);
    }
    newGame(game) {
        this._game = game;
        this._setupTiles(this._game);
        this._setupProgress(game);
        this._showScore(game);
    }
    _setupEvents(container) {
        const cells = [...container.querySelectorAll('.hive-cell')];
        const input = container.querySelector('#text-input');

        cells.forEach((cell) => {
            bindEvents(cell, ['mousedown', 'touchstart'], (evt) => {
                cell.classList.add('push-active');
                input.value = input.value += cell.textContent.trim();
                evt.preventDefault();
            });

        });

        bindEvents(window, ['mouseup', 'touchend'], (evt) => {
            cells.forEach((cell) => {
                cell.classList.remove('push-active');
            });
        })

        const form = container.querySelector('form');
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitWord();
        });

        const shuffle = container.querySelector('#shuffle');
        bindEvents(shuffle, ['click', 'touchstart'], (evt) => {
            evt.preventDefault();
            this.shuffle();
        })

        const _delete = container.querySelector('#delete');
        bindEvents(_delete, ['click', 'touchstart'], (evt) => {
            evt.preventDefault();
            this.delete();
        })

        const enter = container.querySelector('#enter');
        bindEvents(enter, ['click', 'touchstart'], (evt) => {
            evt.preventDefault();
            this.submitWord();
        })
    }
    _setupTiles(game) {
        this._game = game;
        const cells = this._container.querySelectorAll('.hive-cell .cell-letter');
        cells[0].innerHTML = game.center;

        game.outers.forEach((letter, i) => {
            cells[i + 1].innerHTML = letter;
        });
    }
    _setupProgress(game) {
        const progress = this._container.querySelector('#progress-dots');
        progress.innerHTML = '';
        game.tiers.forEach(() => {
            const div = document.createElement('div');
            div.classList.add('progress-dot');
            progress.appendChild(div);
        });

    }
    _showScore(game) {
        const count = this._container.querySelector('#words-count');
        const numWords = game.found.length;
        count.innerText = `You have found ${numWords} ${numWords === 1 ? 'word' : 'words'}`;
        if (numWords) {
            count.classList.add('found-some');
        } else {
            count.classList.remove('found-some');
        }

        const list = this._container.querySelector('#words-list');
        list.innerHTML = '';
        game.found.forEach((result) => {
            const div = document.createElement('div');
            div.classList.add('found-word');
            if (game.isPangram(result)) {
                div.classList.add('pangram');
            }
            div.innerText = result;
            list.appendChild(div);
        });

        const progressCurrent = this._container.querySelector('#progress-current');
        progressCurrent.innerText = game.score;
        const currentTier = game.currentTier;
        const perTier = 100 / (game.tiers.length - 1);
        progressCurrent.style.left = `${currentTier.idx * perTier}%`;
        this._container.querySelector('#tier').innerText = currentTier.label;

        if (game.score === game.maxScore) {
            this._container.querySelector('#tier').innerText = 'Holy Mother!!';
        }
    }
    async delete() {
        const input = this._container.querySelector('#text-input');
        const current = input.value;

        input.value = current.slice(0, current.length - 1);
    }
    async submitWord() {
        const input = this._container.querySelector('#text-input');
        const word = input.value;

        if (this._game.validate(word)) {
            const points = this._game.scoreNew(word);
            this._game.add(word);
            console.log(`gained ${points} points. Now at ${this._game.score}.`);
            this._showScore(this._game);
            input.value = '';
        } else {
            input.classList.add('invalid');
            await timeout(700);
            input.classList.remove('invalid');
            input.value = '';
        }
    }    
    async shuffle() {
        const hive = this._container.querySelector('.hive');
        hive.classList.add('fade-out');
        await timeout(300);

        this._game.shuffle();
        this._setupTiles(this._game);

        hive.classList.remove('fade-out');
        hive.classList.add('fade-in');
        await timeout(300);
        hive.classList.remove('fade-in');
    }
}
