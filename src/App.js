import React, { useRef, useState } from 'react';
import Roulette from './Roulette';
import './App.css'; // Optional CSS, only if you're using external styling

const App = () => {
  const [result, setResult] = useState('');
  const [isSpinning, setSpinning] = useState(false);
  const rouletteRef = useRef();

  const onResultGiven = (result) => {
    setResult(result);
  };

  const updateSpinning = (val) => {
    setSpinning(val);
    if (val) {
      setResult('Spinning...');
    }
  };

  const callRemoveTeam = () => {
    setSpinning(true);
    if (rouletteRef.current) {
      rouletteRef.current.removeTeam();
    }
  };

  return (
    <>
    {/* HEADER: Wheel of Names Style */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3367d6',
        color: '#fff',
        padding: '0 20px',
        height: '50px',
      }}>
        {/* Left: Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="/favicon.png" // Replace with your actual logo path if needed
            alt="logo"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
          <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>wheelofnames.com</span>
        </div>

        {/* Right: Menu Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.9rem' }}>
          <span role="img" aria-label="🎨">🎨 Customize</span>
          <span role="img" aria-label="📄">📄 New</span>
          <span role="img" aria-label="📁">📁 Open</span>
          <span role="img" aria-label="💾">💾 Save</span>
          <span role="img" aria-label="🔗">🔗 Share</span>
          <span role="img" aria-label="🔍">🔍 Gallery</span>
          <span role="img" aria-label="⛶">⛶</span>
          <span role="img" aria-label="🌐">🌐 English</span>
        </div>
      </div>
    <div style={{ backgroundColor: '#d1d8b7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      

{/* MAIN CONTENT */}
<div style={{
  display: 'flex',
  flex: 1,
  padding: '2rem',
  backgroundColor: '#d1d8b7',
}}>
  {/* Left: Spinner */}
  <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '2rem', scale : '2', marginTop: '25rem' }}>
    <Roulette onResultGiven={onResultGiven} updateSpinning={updateSpinning} ref={rouletteRef} />
  </div>

  {/* Right: Result Display */}
  <div style={{
    flex: '0 0 40%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000'
  }}>
    {result}
  </div>
</div>

    </div>
    </>
  );
};

export default App;
