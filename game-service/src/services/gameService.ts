import axios from 'axios';
import { User } from '../models/user';

export const getComputerMove = async (): Promise<string> => {
  try {
    const response = await axios.get('https://codechallenge.boohma.com/random');
    const randomNumber = response.data.random_number;
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    const computerMoveIndex = randomNumber % 5; // Assuming the API returns 1-100, use modulo 5 to map to 0-4
    return choices[computerMoveIndex];
  } catch (error) {
    console.error('Failed to fetch computer move:', error);
    throw new Error('Failed to fetch computer move');
  }
};

export const playGame = async (user: User, userMove: string): Promise<{ result: string, computerMove: string }> => {
  const computerMove = await getComputerMove();
  const result = determineWinner(userMove, computerMove);

  user.addGameResult(result, computerMove, userMove);
  if (user.scoreboard.length > 10) {
    user.scoreboard.pop();
  }

  return { result, computerMove };
};


export const determineWinner = (userMove: string, computerMove: string): string => {
  if (userMove === computerMove) return 'draw';
  if (
    (userMove === 'rock' && computerMove === 'scissors') ||
    (userMove === 'paper' && computerMove === 'rock') ||
    (userMove === 'scissors' && computerMove === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
};
