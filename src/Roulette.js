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
  { id: 1, option: "Scotland KCYL" },
  { id: 2, option: "BB blasters" },
  { id: 3, option: "Cambridge united" },
  { id: 4, option: "London United" },
  { id: 5, option: "BCN Boys" },
  { id: 6, option: "Coventry KnaKnights" },
  { id: 7, option: "Liverpool KCYL" },
  { id: 8, option: "Oxford KCYL" },
  { id: 9, option: "TEAM NORTHERN IRELAND" },
  { id: 10, option: "Thommans FC" },
  { id: 11, option: "Manchester Youth" },
  { id: 12, option: "London FC" },
  { id: 13, option: "LCB" },
];

const mytextColors = [
  "Black", "Black", "Black", "Black", "Black", "Black", "Black",
  "Black", "Black", "Black", "Black", "Black", "Black",
];

const mycolours = [
  "	#ffb3ba",
"	#ffdfba",
"#ffffba",
"#baffc9",
"	#bae1ff",
"#ffb3ba",
"#ffdfba",
"	#ffffba",
"#baffc9",
"	#bae1ff",
"#ffb3ba",
"	#ffdfba",
"	#ffffba",
];

// ------------------------
// STYLES
// ------------------------
const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  // backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "10vh",
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
    5, 3, 1, 2, 10, 12, 6, 4, 7, 8, 11, 9, 13
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
      minHeight: "50vh",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "flex-start",
      flexDirection: "row",
      backgroundColor: "#d1d8b7",
      textAlign: "center",
      gap: "2rem",
      padding: "3rem 5rem",
    }}
  >
    {/* Left Input Box */}
<div
  style={{
    width: "260px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "1rem 1rem 0.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  }}
>
  <h3
    style={{
      margin: "0 0 0.5rem",
      fontWeight: "600",
      fontSize: "1.1rem",
      textAlign: "center",
      color: "#333",
    }}
  >
    Names
  </h3>
  <textarea
    defaultValue={`Scotland KCYL
BB blasters
Cambridge united
London United
BCN Boys
Coventry KnaKnights
Liverpool KCYL
Oxford KCYL
TEAM NORTHERN IRELAND
Thommans FC
Manchester Youth
London FC
LCB`}
    style={{
      width: "100%",
      minHeight: "370px",
      resize: "none",
      border: "1px solid #e0e0e0",
      borderRadius: "6px",
      padding: "0.75rem",
      fontSize: "0.92rem",
      lineHeight: "1.6",
      backgroundColor: "#fafafa",
      color: "#333",
      boxSizing: "border-box",
      outline: "none",
    }}
  />
</div>




    {/* Spinner and Button */}
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "-6rem" }}></h1>

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
    </div>

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
