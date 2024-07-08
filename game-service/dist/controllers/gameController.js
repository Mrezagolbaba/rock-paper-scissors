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
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = void 0;
const gameService_1 = require("../services/gameService");
const userService_1 = require("../services/userService");
const play = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('REQUEST BODY');
    const userId = req.params.userId;
    const user = (0, userService_1.getUserById)(userId);
    console.log('REQUEST BODY', user, userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { move } = req.body;
    try {
        const result = yield (0, gameService_1.playGame)(user, move);
        console.log(move, result, user, 'REQUEST BODY');
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to play game' });
    }
});
exports.play = play;
