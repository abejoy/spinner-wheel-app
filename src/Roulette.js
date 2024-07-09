import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { textCenter } from "./App";

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
  "White",
  "Black",
  "Black",
  "White",
  "White",
  "White",
  "White",
  "White",
  "Black",
  "White",
  "Black",
  "Black",
  "Black",
  "White",
];

const mycolours = [
  "Black",
  "Brown",
  "Yellow",
  "Green",
  "Blue",
  "Black",
  "Green",
  "Red",
  "White",
  "Blue",
  "Pink",
  "Red",
  "White",
  "Blue",
];
const Roulette = React.forwardRef((props, ref) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState(myData);
  const [drawOrder, setDrawOrder] = useState([
    9, 7, 6, 5, 12, 1, 11, 8, 2, 14, 4, 13, 3, 10,
  ]);
  const [colours, setColours] = useState(mycolours);
  const [textColors, setTextColors] = useState(mytextColors);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const idToGet = drawOrder[0];
      const newPrizeIndex = data.findIndex((team) => team.id === idToGet);

      setPrizeNumber(newPrizeIndex);
      setMustSpin(true);
      props.updateSpinning(true);
    }
  };

  const stopSpinnig = () => {
    setMustSpin(false);
    props.updateSpinning(false);
    const teamName = data.at(prizeNumber).option;
    props.onResultGiven(teamName);
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

    const copydrawOrder = [...drawOrder];
    copydrawOrder.splice(0, 1);
    setDrawOrder(copydrawOrder);
  };

  // Assign the ref to the component
  React.useImperativeHandle(ref, () => ({
    removeTeam: removeTeam,
  }));

  return (
    <div style={textCenter}>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={colours}
        textColors={textColors}
        fontSize={10}
        radius={250}
        onStopSpinning={stopSpinnig}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  );
});

export default Roulette;
