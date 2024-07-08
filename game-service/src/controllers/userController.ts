import { Request, Response } from 'express';
import { registerUser, authenticateUser, getUserById } from '../services/userService';

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = registerUser(username, password);
  res.json(user);
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = authenticateUser(username, password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const getProfile = (req: Request, res: Response) => {
  const user = getUserById(req.params.userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const resetScoreboard = (req: Request, res: Response) => {
  const user = getUserById(req.params.userId);
  if (user) {
    user.scoreboard = [];
    res.json({ message: 'Scoreboard reset' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};
