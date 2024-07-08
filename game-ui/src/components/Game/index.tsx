import React, { useEffect, useState } from 'react';
import { GamePlay } from 'services/playGame';
import Confetti from './Confetti';
import { emojis, Items } from 'data';
import { GameResponse } from 'types';
import './Game.css'; 


interface GameProps {
  userId: string;
  onNewResult: () => void;
}

const Game = ({ userId, onNewResult }: GameProps) => {
  const [result, setResult] = useState('');
  const [data, setData] = useState({} as GameResponse);
  const [resultClass, setResultClass] = useState('');

  const playGame = async (move: string) => {
    await GamePlay({ move, userId }).then((res: GameResponse) => { 
      console.log(res);
      setData(res);
      const gameResult = `You chose ${move}. Computer chose ${res.computerMove}. You ${res.result}!`;
      setResult(gameResult);
      onNewResult();
    });
  };
  useEffect(() => {
    if (['win', 'lose', 'draw'].includes(data.result)) {
      setResultClass(data.result);
      const timer = setTimeout(() => setResultClass(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [data.result]);
  const renderEmojiRain = () => {
    const emojiArray = Array.from({ length: 5 }, (_,index) => (
      <div
        className={`emoji`}
        key={index}
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      >
        {emojis[resultClass]}
      </div>
    ));
    return <div className="emoji-rain">{emojiArray}</div>;
  };

  return (
    <div className="game-container">
      <h2>Make Your Move</h2>
      <div className="choices">
        {Items.map((choice: { key: string, value: string },index) => (
          <button key={index} className="choice-button" onClick={() => playGame(choice.key)}>
            {choice.value}
          </button>
        ))}
      </div>
      {result && (
        <div className={`result ${resultClass}`}>
          {result}
        </div>
      )}
      {resultClass === 'win' &&
        <Confetti />}

      {resultClass && renderEmojiRain()}

    </div>
  );
};

export default Game;
