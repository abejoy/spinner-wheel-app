import React, { useRef, useState } from 'react';
import Roulette from './Roulette';
import './App.css'; // Import your custom styles

const toplevel = {
  display: 'flex',
  
}
const fullWidth = {
  width: '100%',
  alignSelf: 'center'
}
export const textCenter = {
  textAlign: 'center',
  fontSize: 50
}

const App = () => {

  const [result, setResult] = useState('Team');
  const [isSpinning, setSpinning] = useState(false);
  const rouletteRef = useRef();

  const onResultGiven = (result) => {
    setResult(result);
  }

  const updateSpinning = (val) => {
    setSpinning(val);
    if (val) {
      setResult('Spinning')
    }
  }

  const callRemoveTeam = () => {
    setSpinning(true);
    if (rouletteRef.current) {
      rouletteRef.current.removeTeam();
    }
  }

  return (
    <div style={toplevel}>
      <div>
        <div style={textCenter}>Spinner Wheel</div>
        <div className="roulette-container">
        <Roulette onResultGiven={onResultGiven} updateSpinning={updateSpinning} ref={rouletteRef}/>
        </div>
      </div>
      <div style={fullWidth}>
        <div style={textCenter}>
          Result:
        </div>
        <div style={textCenter}>
          {result}
        </div>
        <div style={textCenter}>
        {!isSpinning && result !== 'Team' && (
          <button onClick={callRemoveTeam}> Remove {result} </button>
        )}
        </div>
      </div>
    </div>

  );
};

export default App;
