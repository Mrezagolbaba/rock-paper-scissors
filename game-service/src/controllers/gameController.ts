import { Request, Response } from 'express';
import { playGame } from '../services/gameService';
import { getUserById } from '../services/userService';

export const play = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { move } = req.body;
  try {
    const result = await playGame(user, move);
    console.log(move, result, user, 'REQUEST BODY');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to play game' });
  }
};
