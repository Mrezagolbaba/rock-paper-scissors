import React from 'react';
import { emojis, Options } from 'data';
import './styles.css';

interface ScoreboardProps {
  results: {
    computerMove: string;
    result: string;
    userMove: string;
  }[];
}

const Scoreboard = ({ results }: ScoreboardProps) => {
  return (
    <div className="scoreboard">
      <h3>Last 10 Results</h3>
      <ul>
        {results?.length > 0 &&
          results.map((result, index) => (
            <li key={index} className={result?.result}>
              <p>
                <span>You </span>{Options[result.userMove]} <span>Computer</span>{Options[result.computerMove]} <span>result</span> {emojis[result.result]}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
