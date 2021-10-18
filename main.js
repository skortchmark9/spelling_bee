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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const initialGame = {
    center: 'z',
    outers:  [ 'd', 'e', 'i', 'n', 't', 'c'],
    found: [],
};

function validateWord(word, game) {
    return false;
}

export class SpellingBee {
    constructor(container) {
        this._container = container;
        this._game = null;

        this._setupEvents(container);

        this._setupGame(initialGame);
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
    }
    _setupGame(game) {
        this._game = game;
        const cells = this._container.querySelectorAll('.hive-cell .cell-letter');
        cells[0].innerHTML = game.center;

        game.outers.forEach((letter, i) => {
            cells[i + 1].innerHTML = letter;
        });
    }
    async submitWord() {
        const input = this._container.querySelector('#text-input');
        const word = input.value;

        if (validateWord(word, this._game)) {
            // somethign
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

        shuffleArray(this._game.outers);
        this._setupGame(this._game);

        hive.classList.remove('fade-out');
        hive.classList.add('fade-in');
        await timeout(300);
        hive.classList.remove('fade-in');
    }
}
