import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App(props) {
  const { grids } = props; 
  const columns = 4;
  // const [GameStatus,setgameStatus]=useState(false)
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [visible, setVisible] = useState(Array(grids).fill(false));
  const [matchedNumbers, setMatchedNumbers] = useState(new Set());
  const [chances, setChances] = useState(3);
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    const generateRandomNumbers = () => Array.from({ length: grids }, () => Math.floor(Math.random() * 11));
    setRandomNumbers(generateRandomNumbers());
    setVisible(Array(grids).fill(false));
    setMatchedNumbers(new Set());
    setChances(() => {
      if (grids === 8) return 6;
      else if (grids === 12) return 10;
      else if (grids === 16) return 14;
      else if (grids === 20) return 18;
      else if (grids === 24) return 22;
      else if (grids === 28) return 26;
      else if (grids === 32) return 30;
      else return "Choose Grids";
    });
    setGameStatus('');
  }, [grids]);

  const handleClick = (index) => {
    const countVisible = visible.filter(v => v).length;

    if (visible[index]) {
      setVisible((prevVisible) => {
        const newVisible = [...prevVisible];
        newVisible[index] = !newVisible[index];
        return newVisible;
      });
    } else {
      if (countVisible < 2) {
        setVisible((prevVisible) =>
          prevVisible.map((v, i) => (i === index ? !v : v))
        );
      } else {
        setVisible((prevVisible) => {
          const newVisible = prevVisible.map((v) => false);
          newVisible[index] = true;
          return newVisible;
        });
      }

      const clickedNumber = randomNumbers[index];

      if (countVisible === 1) {
        const previouslyVisibleNumbers = randomNumbers.filter((_, i) => visible[i]);
        const countMatches = previouslyVisibleNumbers.filter(num => num === clickedNumber).length;

        if (countMatches === 1) {
          setMatchedNumbers(prevMatches => new Set([...prevMatches, clickedNumber]));
        }
      }

      if (chances > 0) {
        setChances(prevChances => prevChances - 1);
      }

      if (chances === 1) {
        const totalMatches = matchedNumbers.size;
        if (totalMatches < 2) {
          setGameStatus('You lose!');
          setVisible(Array(grids).fill(true));
        }
      }
    }
  };

  const winSocre = () => {
    switch (grids) {
      case 8: return 2;
      case 12: return 3;
      case 16: return 4;
      case 20: return 5;
      case 24: return 6;
      case 28: return 7;
      case 32: return 8;
      default: return 0;
    }
  };

  const totalMatches = matchedNumbers.size + 1;
  if (totalMatches >= winSocre() &&GameStatus) {
    setGameStatus('You Win!');    
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <h2>Matched Numbers: {Array.from(matchedNumbers).map(num => (
          <span key={num} style={{ color: 'green' }}>{num} </span>
        ))}</h2>
        <h2>Chances Left: {chances}</h2>
        <h2>{winSocre() ? `Score: ${totalMatches - 1} / ${winSocre()}` : `Welcome`}</h2>
        {gameStatus?"":<h1 className='text-warning'>{gameStatus}</h1>}
        {/* {gameStatus} */}
        <div className="row">
          {Array(grids).fill().map((_, index) => (
            <div
              key={index}
              className={`col-${12 / columns} border p-3 text-center card-flip`}
              onClick={() => handleClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`card-inner ${visible[index] || matchedNumbers.has(randomNumbers[index]) ? 'is-flipped' : ''}`}>
                <div className="card-front">click</div>
                <div className="card-back" style={{ color: matchedNumbers.has(randomNumbers[index]) ? 'green' : 'black' }}>
                  {randomNumbers[index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 