import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import React from "react";
import RegistroMaestro from "../../Registros/RegistroMaestro";
import { blue } from "@mui/material/colors";

function ModalMaestro({ registroMaestro, handleRegistroMaestroClose }) {
  return (
    <Dialog
      open={registroMaestro}
      keepMounted
      onClose={handleRegistroMaestroClose}
      maxWidth="lg"
    >
      <DialogContent>
        <Grid>
          <RegistroMaestro />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleRegistroMaestroClose()}
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

export default ModalMaestro;
