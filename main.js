import { Game } from './game.js';

const words = [
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

const timeout = (n) => new Promise((resolve) => setTimeout(resolve, n));

const initialGame = new Game('u', [ 'd', 'e', 'i', 'n', 't', 'c'], [
    "inducted",
    "inductee",
    "cued",
    "cute",
    "cutie",
    "deduce",
    "deduced",
    "deduct",
    "deducted",
    "denude",
    "denuded",
    "deuce",
    "duct",
    "ducted",
    "dude",
    "duded",
    "duet",
    "duetted",
    "dunce",
    "dune",
    "dunned",
    "educe",
    "educed",
    "endue",
    "endued",
    "ennui",
    "etude",
    "induce",
    "induced",
    "induct",
    "intuit",
    "intuited",
    "nude",
    "nudie",
    "tune",
    "tuned",
    "tunic",
    "tutee",
    "tutted",
    "tutti",
    "tutu",
    "uncut",
    "undecided",
    "undetected",
    "undid",
    "undue",
    "unedited",
    "unintended",
    "unit",
    "unite",
    "united",
    "unneeded",
    "untie",
    "untied",
    "untune",
    "untuned"
]
);

export class SpellingBee {
    constructor(container) {
        this._container = container;
        this._game = null;

        this._setupEvents(container);
        this._setupTiles(initialGame);
        this._showScore(initialGame);
    }
    _setupEvents(container) {
        const cells = [...container.querySelectorAll('.hive-cell')];
        const input = container.querySelector('#text-input');

        cells.forEach((cell) => {
            cell.addEventListener('mousedown', () => {
                cell.classList.add('push-active');
                input.value = input.value += cell.textContent.trim();
            });
        })

        window.addEventListener('mouseup', (evt) => {
            cells.forEach((cell) => {
                cell.classList.remove('push-active');
            });
        });

        const form = container.querySelector('form');
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitWord();
        });

        const shuffle = container.querySelector('#shuffle');
        shuffle.addEventListener('click', () => this.shuffle());

        const _delete = container.querySelector('#delete');
        _delete.addEventListener('click', () => this.delete());

        const enter = container.querySelector('#enter');
        enter.addEventListener('click', () => this.submitWord());
    }
    _setupTiles(game) {
        this._game = game;
        const cells = this._container.querySelectorAll('.hive-cell .cell-letter');
        cells[0].innerHTML = game.center;

        game.outers.forEach((letter, i) => {
            cells[i + 1].innerHTML = letter;
        });
    }
    _showScore(game) {
        // wip
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
