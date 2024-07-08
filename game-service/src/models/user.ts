import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  username: string;
  password: string;
  scoreboard: { result: string, computerMove: string, userMove: string }[];

  constructor(username: string, password: string) {
    this.id = uuidv4();
    this.username = username;
    this.password = password;
    this.scoreboard = [];
  }

  addGameResult(result: string, computerMove: string, userMove: string) {
    this.scoreboard.unshift({ result, computerMove, userMove });
    if (this.scoreboard.length > 10) {
      this.scoreboard.pop(); // Ensure only the last 10 results are kept
    }
  }
}
