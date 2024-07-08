"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const gameController_1 = require("./controllers/gameController");
const userController_1 = require("./controllers/userController");
const userService_1 = require("./services/userService");
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/register', userController_1.register);
app.post('/login', userController_1.login);
app.get('/profile/:userId', userController_1.getProfile);
app.post('/play/:userId', gameController_1.play);
app.post('/reset/:userId', userController_1.resetScoreboard);
app.get('/scoreboard/:userId', (req, res) => {
    const user = (0, userService_1.getUserById)(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ scoreboard: user.scoreboard });
});
app.listen(port, () => {
    console.log(`Game service running on http://localhost:${port}`);
});
