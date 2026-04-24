import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { Zoom } from "@mui/material";
import "./style.css";
import CustomButton from "../CustomButton";

const ErrorModal = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div onClick={props.clicked}>
      <Modal
        className="flex justify-center items-center ErrorBoxModel"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className="flex flex-col items-center justify-center bg-white z-10 rounded-lg">
            <h2 className="p-4 font-bold text-[15px] md:text-[24px]">{props.errorText}</h2>
            <div className="p-2">
              <CustomButton onClick={handleClose}>
                <p className="text-black font-bold">Close</p>
              </CustomButton>
            </div>
          </div>
        </Zoom>
      </Modal>
    </div>
  );
};

export default ErrorModal;
