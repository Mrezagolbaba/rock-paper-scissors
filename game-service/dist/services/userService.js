"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.authenticateUser = exports.registerUser = void 0;
const user_1 = require("../models/user");
const users = [];
const registerUser = (username, password) => {
    const user = new user_1.User(username, password);
    users.push(user);
    return user;
};
exports.registerUser = registerUser;
const authenticateUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password) || null;
};
exports.authenticateUser = authenticateUser;
const getUserById = (id) => {
    return users.find(user => user.id === id) || null;
};
exports.getUserById = getUserById;
