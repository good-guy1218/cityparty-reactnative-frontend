import React, { useCallback, useState } from "react";
import RangeSliderRN from "rn-range-slider";
import { View, Text } from "react-native";

import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";

const RangeSlider = ({ from, to ,token,  onValueChanged}) => {
  // const RangeSlider = () => {
  const [low, setLow] = useState(from);
  const [high, setHigh] = useState(to);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = 
    (newLow, newHigh) => {
      if(newLow != low || newHigh != high)
        onValueChanged(newLow, newHigh, token);
      setLow(newLow);
      setHigh(newHigh);
    }
    
  return (
    <>
      <RangeSliderRN
        // style={styles.slider}
        min={from}
        max={to}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        // renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{ marginTop:9, fontFamily:'Montserrat-Bold', fontSize: 15, lineHeight:18, color: "#000000" }}
          >
            {low}
          </Text>
        </View>
        <View>
          <Text
            style={{ marginTop:9,fontFamily:'Montserrat-Bold', fontSize: 15, lineHeight:18, color: "#000000" }}
          >
            {high}
          </Text>
        </View>
      </View>
    </>
  );
};

export default RangeSlider;
