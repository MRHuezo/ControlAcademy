import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { context } from "../Provider";

function Snackbars() {
  const { message, open, handleClose, alerta } = useContext(context);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      // message={message}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={alerta}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Snackbars;
