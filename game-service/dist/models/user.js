"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(username, password) {
        this.id = (0, uuid_1.v4)();
        this.username = username;
        this.password = password;
        this.scoreboard = [];
    }
    addGameResult(result, computerMove, userMove) {
        this.scoreboard.unshift({ result, computerMove, userMove });
        if (this.scoreboard.length > 10) {
            this.scoreboard.pop(); // Ensure only the last 10 results are kept
        }
    }
}
exports.User = User;
