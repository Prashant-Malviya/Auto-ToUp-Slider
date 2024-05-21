import React, { useState } from "react";
import { Slider, Switch, Button, Typography, Modal, Box } from "@mui/material";
import profileUrl from "../url/profileUrl";
import toast from "react-hot-toast";
// import CreditModal from "../Utils/CreditModal";

const AutoTopUpComponent = () => {
  // State management
  const [autoTopUp, setAutoTopUp] = useState(true);
  const [creditValue, setCreditValue] = useState(1200);
  const [creditStatus, setCreditStatus] = useState(false);

  // Function to handle confirm button click
  const handleConfirm = () => {
    toast.success("Purchased Successfully");
    console.log(`Selected credits: ${creditValue}`);
    setCreditStatus(true);
    if(creditStatus){
      setOpen(true);
    }
  };

  // Function to handle slider change
  const handleSliderChange = (event, newValue) => {
    setCreditValue(newValue);
  };

  // Generate array of values for displaying below the slider
  const sliderValues = Array.from(Array(10), (_, i) => (i + 1) * 500);
  const prices = Array.from(Array(10), (_, i) => (i + 1) * 5);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid purple",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="flex justify-center items-center font-bold text-3xl lg:text-5xl md:text-4xl bg-gradient-to-r from-purple-600 to-amber-400 bg-clip-text text-transparent  gap-y-5 py-5 px-auto">
        Smartify Assignment By Prashant-Malviya
      </div>

      <div className="relative top-12 h-auto lg:w-2/3 md:w-2/3 w-full mx-auto my-auto bg-white rounded-3xl p-10 space-y-2">
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
              Once the credit goes below the threshold value, credits can be
              auto purchased. Setup auto top-up to enjoy uninterrupted services.
              You can disable this anytime to stop auto top-up.
            </Typography>
          )}
        </div>

        {autoTopUp && (
          <>
            <Typography variant="body1" className="text-slate-600" gutterBottom>
              Once the credit goes below a minimum threshold{" "}
              <span className="text-violet-700 font-bold">50</span>, we will
              auto-purchase{" "}
              <span className="text-violet-700 font-bold">1200</span> credits
              and add them to your account.{" "}
              <a href={profileUrl} className="font-bold underline">
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
                sx={{
                  color: "#9747FF",
                }}
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
                      <span className="font-bold text-xs">
                        ${prices[index]}
                      </span>
                    </Typography>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor:
                          value === creditValue ? "#9747FF" : "transparent",
                        borderRadius: "50%",
                        margin: "0 auto",
                      }}
                    />
                    <Typography
                      variant="caption"
                      style={{
                        position: "absolute",
                        bottom: "-50px",
                        color: "slategray",
                      }}
                    >
                      {value}
                      <span className="hidden lg:block md:block text-xs">
                        credits
                      </span>
                    </Typography>
                  </div>
                ))}
              </div>

              <Button
                variant="contained"
                className="relative top-5"
                onClick={handleConfirm}
                sx={{
                  backgroundColor: "#9747FF",
                  "&:hover": {
                    backgroundColor: "#7B2CBF",
                  },
                }}
              >
                <span className="font-bold">Confirm auto-purchase</span>
              </Button>
            </div>
          </>
        )}
      </div>

      {creditStatus && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" style={{font:'bold', color:'blue'}} variant="h6" component="h2">
              Purchased Credits Are...
            </Typography>
            <Typography id="modal-modal-description" style={{font:'bold', color:'purple'}} sx={{ mt: 2 }}>
              {creditValue}
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AutoTopUpComponent;
