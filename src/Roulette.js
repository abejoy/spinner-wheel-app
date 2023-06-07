import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { textCenter } from './App';

const myData = [
  { id:1, option: "Manchester Unit"},
  { id:2, option: "Manchester youth"},
  { id:3, option: "GKCYL"},
  { id:4, option: "Scotland KCYL"},
  { id:5, option: "Liverpool KCYL"},
  { id:6, option: "Skca fc"},
  { id:7, option: "SKCYL FC JN"},
  { id:8, option: "Stevenage"},
  { id:9, option: "North West London Ballers"},
  { id:10, option: "London Royals"},
  { id:11, option: "Birmingham Blasters"},
  { id:12, option: "Cambridge United"},
  { id:13, option: "SW's Finest"},
  { id:14, option: "Azzurri	combined"},
  { id:15, option: "Coventry & Warwickshire"},
  { id:16, option: "Peterborough KCYL "},
  { id:17, option: "Worcester Wolves"},
  { id:18, option: "Ballers FC"},
  { id:19, option: "LCB"},
  { id:20, option: "AFC PoolMouth"}
];

const mytextColors = [
  "White",
  "Black",
  "Black",
  "White",
  "Black",
  "White",
  "Black",
  "White",
  "Black",
  "White",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black"
];

const mycolours = [
  "Black",
  "Purple",
  "Pink",
  "Black",
  "Red",
  "DarkBlue",
  "LightBlue",
  "DarkBlue",
  "Red",
  "Black",
  "White",
  "Yellow",
  "White",
  "LightBlue",
  "Orange",
  "Green",
  "Orange",
  "Pink",
  "Green",
  "Yellow"
]
const Roulette = React.forwardRef((props, ref) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState(myData);
  const [drawOrder, setDrawOrder] = useState([3,2,1,4,5,6,9,8,7,10,11,12,13,14,16,15,18,17,19,20]);
  const [colours, setColours] = useState(mycolours)
  const [textColors, setTextColors] = useState(mytextColors)

  const handleSpinClick = () => {
    if (!mustSpin) {
      const idToGet = drawOrder[0];
      const newPrizeIndex=  data.findIndex(team => team.id === idToGet);
      
      setPrizeNumber(newPrizeIndex);
      setMustSpin(true);
      props.updateSpinning(true);
    }
  }

  const stopSpinnig = () => {
    setMustSpin(false);
    props.updateSpinning(false);
    const teamName = data.at(prizeNumber).option
    props.onResultGiven(teamName);
  }

  const removeTeam = () => {
    const tempData = [...data];
    tempData.splice(prizeNumber, 1)
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
  }

  // Assign the ref to the component
  React.useImperativeHandle(ref, () => ({
    removeTeam: removeTeam
  }));

  return (

    <div style={textCenter} >
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
  )
});

export default Roulette;
