import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${(value * 100).toLocaleString()}`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {
  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (
    event: Event,
    newValue: number[],
    activeThumb: number
  ) => {
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        step={10}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        color="primary"
      />
    </Box>
  );
}
