import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import React from "react";
import { blue } from "@mui/material/colors";
import RegistroAlumno from "../../Registros/RegistroAlumno";

function ModalAlumno({
  registroAlumno,
  handleRegistroAlumnoClose,
  stateEditarUsuario,
}) {
  return (
    <Dialog
      open={registroAlumno}
      keepMounted
      onClose={handleRegistroAlumnoClose}
      maxWidth="lg"
    >
      <DialogContent>
        <Grid>
          <RegistroAlumno
            handleRegistroAlumnoClose={handleRegistroAlumnoClose}
            stateEditarUsuario={stateEditarUsuario}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleRegistroAlumnoClose()}
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

export default ModalAlumno;
