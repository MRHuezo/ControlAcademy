import React, { useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { blue } from "@mui/material/colors";
import { context } from "../../../../../Provider";
import RegistroTaller from "../../Registros/RegistroTaller";

function DetallesTalleres() {
  const { talleres, handleTalleresClose } = useContext(context);
  // console.log(datosTalleres);
  return (
    <Dialog
      open={talleres}
      keepMounted
      onClose={handleTalleresClose}
      maxWidth="lg"
    >
      <DialogContent>
        <RegistroTaller />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleTalleresClose}
          variant="contained"
          sx={{
            bgcolor: blue[600],
            color: "white",
            "&:hover": {
              bgcolor: blue[400],
              color: "white",
            },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetallesTalleres;
