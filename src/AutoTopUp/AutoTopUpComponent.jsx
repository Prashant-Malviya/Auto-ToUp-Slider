import React, { useState } from "react";
import { Slider, Switch, Button, Typography } from "@mui/material";

const AutoTopUpComponent = () => {
  // State management
  const [autoTopUp, setAutoTopUp] = useState(true);
  const [creditValue, setCreditValue] = useState(1200);

  // Function to handle confirm button click
  const handleConfirm = () => {
    console.log(`Selected credits: ${creditValue}`);
  };

  // Function to handle slider change
  const handleSliderChange = (event, newValue) => {
    setCreditValue(newValue);
  };

  // Generate array of values for displaying below the slider
  const sliderValues = Array.from(Array(10), (_, i) => (i + 1) * 500);
  const prices = Array.from(Array(10), (_, i) => (i + 1) * 5);

  return (
    <div className="relative top-48 h-auto lg:w-2/3 md:w-2/3 w-full mx-auto my-auto bg-white rounded-3xl px-6 py-6 space-y-2">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Typography variant="h6" className="font-bold" gutterBottom>
            Set Auto Top-up
          </Typography>
          <Switch
            checked={autoTopUp}
            onChange={() => setAutoTopUp(!autoTopUp)}
            color="primary"
          />
        </div>
        {!autoTopUp && (
          <Typography variant="body1" className="text-slate-600" gutterBottom>
            Once the credit goes below the threshold value, credits can be auto
            purchased. Setup auto top-up to enjoy uninterrupted services. You
            can disable this anytime to stop auto top-up.
          </Typography>
        )}
      </div>

      {autoTopUp && (
        <>
          <Typography variant="body1" className="text-slate-600" gutterBottom>
            Once the credit goes below a minimum threshold{" "}
            <span className="text-violet-700 font-bold">50</span>, we will
            auto-purchase{" "}
            <span className="text-violet-700 font-bold">1200</span> credits and
            add them to your account.{" "}
            <a href="#" className="font-bold underline">
              Learn more
            </a>
          </Typography>

          <div className="space-y-10">
            <Slider
              value={creditValue}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              marks
              min={500}
              max={5000}
              step={500}
            />

            {/* Display values and prices below the slider */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "16px",
              }}
            >
              {sliderValues.map((value, index) => (
                <div
                  key={value}
                  style={{
                    textAlign: "center",
                    width: "50px",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="caption"
                    style={{ position: "absolute", bottom: "0px" }}
                  >
                     ${prices[index]}
                  </Typography>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor:
                        value === creditValue ? "blue" : "transparent",
                      borderRadius: "50%",
                      margin: "0 auto",
                    }}
                  />
                  <Typography
                    variant="caption"
                    style={{ position: "absolute", bottom: "-20px" }}
                  >
                   {value}
                  </Typography>
                </div>
              ))}
            </div>

            <Button variant="contained" onClick={handleConfirm} gutterBottom>
              Confirm auto-purchase
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AutoTopUpComponent;
