import { Game } from "./game.js";

function createGame({ word, center, answers }) {
    const outers = new Set(word.replaceAll(center, '').split(''));
    answers.push(word);
    return new Game(center, [...outers], answers);
}

const data = [
    {
        word: 'triptych',
        center: 'i',
        answers: ["city", "trip", "rich", "chip", "thirty", "pitch" ],
    },
    {
        word: 'gouache',
        center: 'h',
        answers: ["each", "huge", "coach", "echo", "cache"],
    },
    {
        word: 'fritopie',
        center: 'f',
        answers: ["free", "offer", "fire", "feet", "effort", "foot", "profit", "fort", "refer", "proof", "prefer", "roof", "reef"],
    },
    {
        word: 'licorace',
        center: 'o',
        answers: ["local", "color", "error", "role", "cool", "core", "oral", "roll", "oracle", "coal", "coral", "roller", "collar", "locale", "cooler"],
    },
    {
        word: 'flippers',
        center: 'p',
        answers: ["press", "replies", "sleep", "peer", "pipe", "prefer", "pills", "slip", "pill", "pepper", "lips", "ripe", "spell", "prep", "flip", "pipes", "prefers", "spies", "sleeps", "peers"],
    },
    {
        word: 'schlomp',
        center: 'l',
        answers: ["school", "schools", "loss", "cool", "pool", "poll", "loop", "polls", "solo", "polo", "pools", "loops"],
    },
    {
        word: 'crosstrek',
        center: 'r',
        answers: ["stock", "rock", "took", "creek", "cook", "seek", "stocks", "socket", "seeker", "rocks", "stroke", "trek", "seeks", "socks", "rocket", "seekers", "cork"],
    },
    {
        word: 'mineral',
        center: 'r',
        answers: ["real", "area", "learn", "near", "marine", "earlier", "remain", "rare", "manner", "miller", "rain", "linear", "rear", "earn", "airline", "inner", "rail", "alarm", "arena", "mineral", "marina", "earl", "reel", "aerial", "realm"],
    },
    {
        word: 'saltine',
        center: 'i',
        answers: [     "site", "list", "line", "sites", "title", "still", "little", "lines", "lists", "titles", "listen", "satellite", "initial", "install", "saint", "essential", "assistant", "assist", "instant", "nine", "Tennis", "Stainless", "till", "lies", "silent", "elite", "illness", "titans", "intent", "entities", "ties", "tail", "alien", "Essentials", "isle", "nail", "inns", "tile", "inline", "intense", "alias", "saints", "satin", "nails", "assists", "tiles", "sail" ],
    },
]

export const games = data.map(createGame);