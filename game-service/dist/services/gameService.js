"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineWinner = exports.playGame = exports.getComputerMove = void 0;
const axios_1 = __importDefault(require("axios"));
const getComputerMove = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://codechallenge.boohma.com/random');
        const randomNumber = response.data.random_number;
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
        const computerMoveIndex = randomNumber % 5; // Assuming the API returns 1-100, use modulo 5 to map to 0-4
        return choices[computerMoveIndex];
    }
    catch (error) {
        console.error('Failed to fetch computer move:', error);
        throw new Error('Failed to fetch computer move');
    }
});
exports.getComputerMove = getComputerMove;
const playGame = (user, userMove) => __awaiter(void 0, void 0, void 0, function* () {
    const computerMove = yield (0, exports.getComputerMove)();
    const result = (0, exports.determineWinner)(userMove, computerMove);
    user.addGameResult(result, computerMove, userMove);
    if (user.scoreboard.length > 10) {
        user.scoreboard.pop();
    }
    return { result, computerMove };
});
exports.playGame = playGame;
const determineWinner = (userMove, computerMove) => {
    if (userMove === computerMove)
        return 'draw';
    if ((userMove === 'rock' && computerMove === 'scissors') ||
        (userMove === 'paper' && computerMove === 'rock') ||
        (userMove === 'scissors' && computerMove === 'paper')) {
        return 'win';
    }
    return 'lose';
};
exports.determineWinner = determineWinner;
