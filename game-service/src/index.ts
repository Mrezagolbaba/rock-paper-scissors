import express from 'express';
import cors from 'cors';
import { play } from './controllers/gameController';
import { register, login, getProfile, resetScoreboard } from './controllers/userController';
import { getUserById } from './services/userService';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/register', register);
app.post('/login', login);
app.get('/profile/:userId', getProfile);
app.post('/play/:userId', play);
app.post('/reset/:userId', resetScoreboard);
app.get('/scoreboard/:userId', (req, res) => {
  const user = getUserById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found', scoreboard: []});
  }
  res.json({ scoreboard: user.scoreboard });
});

app.listen(port, () => {
  console.log(`Game service running on http://localhost:${port}`);
});
