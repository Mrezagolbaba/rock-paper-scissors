"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetScoreboard = exports.getProfile = exports.login = exports.register = void 0;
const userService_1 = require("../services/userService");
const register = (req, res) => {
    const { username, password } = req.body;
    const user = (0, userService_1.registerUser)(username, password);
    res.json(user);
};
exports.register = register;
const login = (req, res) => {
    const { username, password } = req.body;
    const user = (0, userService_1.authenticateUser)(username, password);
    if (user) {
        res.json(user);
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};
exports.login = login;
const getProfile = (req, res) => {
    const user = (0, userService_1.getUserById)(req.params.userId);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
};
exports.getProfile = getProfile;
const resetScoreboard = (req, res) => {
    const user = (0, userService_1.getUserById)(req.params.userId);
    if (user) {
        user.scoreboard = [];
        res.json({ message: 'Scoreboard reset' });
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
};
exports.resetScoreboard = resetScoreboard;
