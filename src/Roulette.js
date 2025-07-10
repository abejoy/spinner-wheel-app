import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Wheel } from "react-custom-roulette";
import confetti from "canvas-confetti"; // 🎉 Confetti import

// ------------------------
// CONSTANTS
// ------------------------
const myData = [
  { id: 1, option: "MKCYL" },
  { id: 2, option: "Scotland KCYL" },
  { id: 3, option: "Cambridge united" },
  { id: 4, option: "BCN Boys" },
  { id: 5, option: "Kent Krusaders" },
  { id: 6, option: "London Royals" },
  { id: 7, option: "Thekkan Strikers" },
  { id: 8, option: "Liverpool KCYL" },
  { id: 9, option: "Coventry & Warwickshire" },
  { id: 10, option: "Bedford and Stevenage" },
  { id: 11, option: "Holy Kings Knanaya FC" },
  { id: 12, option: "Thommans FC" },
  { id: 13, option: "Birmingham Blasters" },
  { id: 14, option: "London Second Team" },
];

const mytextColors = [
  "White", "Black", "Black", "White", "White", "White", "White",
  "White", "Black", "White", "Black", "Black", "Black", "White",
];

const mycolours = [
  "Black", "Brown", "Yellow", "Green", "Blue", "Black", "Green",
  "Red", "White", "Blue", "Pink", "Red", "White", "Blue",
];

// ------------------------
// STYLES
// ------------------------
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "2rem 3rem",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  minWidth: "300px",
  textAlign: "center",
};

const buttonStyle = {
  margin: "0 10px",
  padding: "0.6rem 1.2rem",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#2563eb",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};


// ------------------------
// COMPONENT
// ------------------------
const Roulette = forwardRef((props, ref) => {
  // Spinner state
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // Data state
  const [data, setData] = useState(myData);
  const [drawOrder, setDrawOrder] = useState([
    9, 7, 6, 5, 12, 1, 11, 8, 2, 14, 4, 13, 3, 10,
  ]);
  const [colours, setColours] = useState(mycolours);
  const [textColors, setTextColors] = useState(mytextColors);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const closeModalAndRemoveTeam = () => {
    setShowPopup(false);
    removeTeam();
  }
  const [winner, setWinner] = useState("");

  // --------------------
  // Handlers
  // --------------------
  const handleSpinClick = () => {
    if (!mustSpin) {
      setShowPopup(false);

      const idToGet = drawOrder[0];
      const newPrizeIndex = data.findIndex((team) => team.id === idToGet);

      setPrizeNumber(newPrizeIndex);
      setMustSpin(true);
      props.updateSpinning?.(true);
    }
  };

  const stopSpinning = () => {
    setMustSpin(false);
    props.updateSpinning?.(false);

    const teamName = data.at(prizeNumber).option;

    setWinner(teamName);
    setShowPopup(true);
    props.onResultGiven?.(teamName);

    // 🎉 Prominent Confetti Animation
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        ...defaults,
        particleCount: 75,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 250);
  };

  const removeTeam = () => {
    const tempData = [...data];
    tempData.splice(prizeNumber, 1);
    setData(tempData);

    const tempColours = [...colours];
    tempColours.splice(prizeNumber, 1);
    setColours(tempColours);

    const tempTextColors = [...textColors];
    tempTextColors.splice(prizeNumber, 1);
    setTextColors(tempTextColors);

    const copyDrawOrder = [...drawOrder];
    copyDrawOrder.splice(0, 1);
    setDrawOrder(copyDrawOrder);
  };

  // Expose imperative methods to parent components
  useImperativeHandle(ref, () => ({
    removeTeam,
  }));

  // --------------------
  // RENDER
  // --------------------
return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#fff",
      textAlign: "center",
    }}
  >
    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Spinner Wheel</h1>

    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={data}
      backgroundColors={colours}
      textColors={textColors}
      fontSize={10}
      radius={320}
      onStopSpinning={stopSpinning}
    />

    <button
      onClick={handleSpinClick}
      style={{
        marginTop: "2rem",
        padding: "0.8rem 1.6rem",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#2563eb",
        color: "#fff",
        fontWeight: "bold",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        cursor: "pointer",
      }}
    >
      SPIN
    </button>

    {/* Modal popup only — not inline result */}
    {showPopup && (
      <div
        style={overlayStyle}
        onClick={() => setShowPopup(false)}
        role="dialog"
        aria-modal="true"
      >
        <div
          style={modalStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <p style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1.5rem" }}>
            {winner}
          </p>
          {/* <button
            onClick={removeTeam}
            style={{
              ...buttonStyle,
              backgroundColor: "#ef4444",
            }}
          >
            Remove Team
          </button> */}
          <button onClick={() => closeModalAndRemoveTeam()} style={buttonStyle}>
            Close
          </button>
        </div>
      </div>
    )}
  </div>
);

});

export default Roulette;
