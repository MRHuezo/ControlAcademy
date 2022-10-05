import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { context } from "../../../../../Provider";
import axios from "axios";

function DetallesAlumno({ alumnoTaller, handleAlumnosTallerClose }) {
  // const [tallerElegido, setTallerElegido] = useState("TALLER DE GUITARRA");

  const handleChange = (e, child) => {
    const { _id, nombre } = child.props.datos;
    setDatosTaller({
      _id: _id,
      nombre: nombre,
    });
  };

  const {
    setDatosTaller,
    datosTaller,
    datosTalleres,
    datosAlumno,
    setLoading,
    setDatosTalleres,
    setMessage,
    setOpen,
    setAlerta,
    setAlumnoTaller,
  } = useContext(context);

  // eslint-disable-next-line
  const [error, setError] = useState(false);

  let mapeoTalleres;

  mapeoTalleres = datosTalleres.map((taller, index) => (
    <MenuItem key={index} value={taller.nombre} datos={taller}>
      {taller.nombre}
    </MenuItem>
  ));

  const obtenerTalleres = async () => {
    try {
      setLoading(true);
      const mostrarTalleres = await axios.get(
        `http://localhost:4000/api-v1/workshop/`
      );
      setDatosTalleres(mostrarTalleres.data.workshopsTeacher);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const registrarAlumnoATaller = async () => {
    try {
      if (!datosTaller._id) {
        setOpen(true);
        setAlerta("warning");
        setMessage("Por favor, selecciona un taller");
        return;
      }
      setLoading(true);
      const registrarAlumno = await axios.post(
        `http://localhost:4000/api-v1/workshop/${datosTaller._id}/alumno/${datosAlumno._id}`
      );

      setLoading(false);
      setError(false);
      setOpen(true);
      if (registrarAlumno.data.success === true) {
        setAlerta("success");
        setAlumnoTaller(false);
      } else {
        setAlerta("error");
        setAlumnoTaller(true);
      }

      setMessage(registrarAlumno.data.message);
    } catch (error) {
      console.log(error);
      setAlumnoTaller(false);
      setOpen(true);
      setMessage(error.response.data.message);
      setLoading(false);
      setError(true);
      setAlerta("error");
    }
  };

  useEffect(() => {
    obtenerTalleres();
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog
      open={alumnoTaller}
      keepMounted
      onClose={handleAlumnosTallerClose}
      maxWidth="md"
    >
      <DialogContent>
        <Grid>
          <Grid container>
            <Grid item xs={12}>
              <b
                style={{
                  color: "#000",
                  display: "block",
                  textAlign: "center",
                }}
              >
                INFORMACIÓN DEL ALUMNO
              </b>
            </Grid>
            <Grid item xs={6} component={"span"}>
              <b style={{ display: "block" }}>Nombre: {datosAlumno.nombre}</b>
              <b style={{ display: "block" }}>
                Fecha de Nacimiento: {datosAlumno.fecha_nacimiento}
              </b>
            </Grid>
            <Grid item xs={6} component={"span"}>
              <b style={{ display: "block" }}>Correo: {datosAlumno.correo}</b>
              <b style={{ display: "block" }}>
                Fecha de Ingreso: {datosAlumno.fecha_de_ingreso}
              </b>
            </Grid>
          </Grid>
          <Grid item xs={12} component={"span"}>
            <Container maxWidth="md" sx={{ mt: "20px" }}>
              <FormControl fullWidth>
                <InputLabel>Talleres</InputLabel>
                <Select
                  value={datosTaller.nombre || ""}
                  label="Talleres"
                  onChange={handleChange}
                  defaultValue=""
                  // value={}
                >
                  {mapeoTalleres}
                </Select>
              </FormControl>
            </Container>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => registrarAlumnoATaller()}
          variant="contained"
          sx={{
            bgcolor: green[600],
            color: "white",
            "&:hover": {
              bgcolor: green[400],
              color: "white",
            },
          }}
        >
          Registrar alumno a taller
        </Button>
        <Button
          onClick={handleAlumnosTallerClose}
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

export default DetallesAlumno;
