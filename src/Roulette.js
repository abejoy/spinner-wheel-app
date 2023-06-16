import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { textCenter } from './App';

const myData = [
  { id:1, option: "Manchester KCYL"},
  { id:2, option: "Gloucestershire KCYL"},
  { id:3, option: "Scotland KCYL"},
  { id:4, option: "Liverpool KCYL"},
  { id:5, option: "Skca fc"},
  { id:6, option: "SKCYL FC JN"},
  { id:7, option: "Stevenage"},
  { id:8, option: "North West London Ballers"},
  { id:9, option: "London Royals"},
  { id:10, option: "Birmingham Blasters"},
  { id:11, option: "SW's Finest"},
  { id:12, option: "Coventry & Warwickshire KCYL FC"},
  { id:13, option: "Knanaya Challengers FC"},
  { id:14, option: "Worcester-KCYL"},
  { id:15, option: "LCB"},
  { id:16, option: "AFC PoolMouth"},
  { id:17, option: "East Anglia"},
  { id:18, option: "Cambridge United"},
  
];

const mytextColors = [
  "White",
  "Black",
  "White",
  "White",
  "White",
  "White",
  "White",
  "White",
  "White",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black",
  "Black",
  "White",
  "Black",
];

const mycolours = [
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
  "White",
  "Orange",
  "Green",
  "Orange",
  "Green",
  "Yellow",
  "Purple",
  "Yellow",
]
const Roulette = React.forwardRef((props, ref) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState(myData);
  const [drawOrder, setDrawOrder] = useState([4,11,10,18,6, 15,13,7,3,1, 16,8,5,14, 9,17,2,12]);
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
