import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { green, yellow } from "@mui/material/colors";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { context } from "../../../../../Provider";
import CloseIcon from "@mui/icons-material/Close";
const moment = require("moment");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ModalAlumnosTaller({
  handleModalAlumnosTallerClose,
  detallesAlumnosTaller,
}) {
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [consulta, setConsulta] = useState(false);
  const [fecha, setFecha] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [arrayAsistencia, setArrayAsistencia] = useState([]);
  const [idAssistence, setIdAssistence] = useState([]);
  const fechaHoy = moment(new Date()).format("YYYY-MM-DD");
  const isToday = moment(fechaHoy).isSame(fecha);

  const {
    datosMaestro,
    datosAlumnoTaller,
    datosTallerModal,
    setLoading,
    checked,
    setChecked,
    setAlerta,
    setMessage,
    setOpen,
    setDatosAlumnoTaller,
    datosAlumnosRegistrados,
  } = useContext(context);

  const checkedAsistenciaOpen = () => {
    verificarAsistencia(fecha);
    setChecked(true);
    setConsulta(!consulta);
  };

  const checkedAsistenciaClose = () => {
    setChecked(false);
  };

  const marcar = (index) => {
    let array = [...datosAlumnoTaller];
    array[index].assistence = !array[index].assistence;
    setArrayAsistencia(array);
  };

  const datos = (e) => {
    setFecha(e.target.value);
    verificarAsistencia(e.target.value);
  };

  const tomarAsistencia = async () => {
    try {
      setLoading(true);
      // console.log(idAssistence);
      // eslint-disable-next-line
      const obtenerAsistencia = await axios.post(
        `http://localhost:4000/api-v1/workshop/${datosTallerModal._id}/asistencia`,
        {
          asistencia: datosAlumnoTaller,
          fecha: fecha,
          idAssistence: idAssistence,
        }
      );
      // console.log(obtenerAsistencia);
      verificarAsistencia(fecha);
      setLoading(false);
      setOpen(true);
      handleModalAlumnosTallerClose();
      setIdAssistence("");
      setAlerta("success");
      setMessage("Asistencias añadidas con éxito");
      setChecked(false);
    } catch (error) {
      setOpen(true);
      setAlerta("error");
      setMessage("Error");
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const verificarAsistencia = async (fechaAEnviar) => {
    try {
      setIdAssistence("");
      setLoading(true);
      const verifAsistencia = await axios.post(
        `http://localhost:4000/api-v1/workshop/${datosTallerModal._id}/verificarAsistenciaFecha`,
        {
          listaAsistencia: arrayAsistencia,
          fecha: fechaAEnviar,
        }
      );
      // console.log(verifAsistencia);

      let nuevoArray = [];

      if (verifAsistencia.data.listaAsistencia.length) {
        verifAsistencia.data.listaAsistencia[0].Asistentes.forEach((res) => {
          nuevoArray.push({
            _id: res.alumno._id,
            nombre: res.alumno.nombre,
            assistence: res.assistence,
            id_assistence_alumno: res._id,
          });
        });

        setIdAssistence(verifAsistencia.data.listaAsistencia[0]._id);
      }
      setDatosAlumnoTaller(
        nuevoArray.length ? nuevoArray : datosAlumnosRegistrados
      );

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  let mensajeBotonAsistencia = "";

  if (isToday) {
    mensajeBotonAsistencia = "Tomar Asistencia";
  } else {
    mensajeBotonAsistencia = "Mostrar Asistencias";
  }

  let mostrarRegistrar;

  if (isToday) {
    mostrarRegistrar = (
      <Button
        onClick={() => tomarAsistencia()}
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
        Registrar
      </Button>
    );
  }

  let renderAlumnos = null;
  if (checked) {
    renderAlumnos = datosAlumnoTaller.map((datosArray, index) => (
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          {datosArray.nombre}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <FormControlLabel
            control={
              <Checkbox
                disabled={!isToday}
                checked={datosArray.assistence ? datosArray.assistence : false}
                onChange={() => marcar(index)}
                size="small"
                sx={{ p: 0 }}
              />
            }
            key={index}
          />
        </StyledTableCell>
      </StyledTableRow>
    ));
  } else {
    // console.log("Alumnos en el taller", datosAlumnosRegistrados);
    renderAlumnos = datosAlumnosRegistrados.map((datosArray, index) => (
      <StyledTableRow key={index}>
        <StyledTableCell component="th" scope="row">
          {datosArray.nombre}
        </StyledTableCell>
      </StyledTableRow>
    ));
  }

  // eslint-disable-next-line
  useEffect(() => {
    if (consulta) {
      verificarAsistencia(fecha);
    }
    // eslint-disable-next-line
  }, [consulta]);

  return (
    <Dialog
      open={detallesAlumnosTaller}
      keepMounted
      onClose={handleModalAlumnosTallerClose}
      fullScreen
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleModalAlumnosTallerClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Información del Taller
          </Typography>

          {!checked ? (
            <Button
              variant="contained"
              sx={{
                bgcolor: green[600],
                color: "white",
                "&:hover": {
                  bgcolor: green[400],
                  color: "white",
                },
              }}
              onClick={checkedAsistenciaOpen}
            >
              {mensajeBotonAsistencia}
            </Button>
          ) : (
            <>
              <Button
                onClick={checkedAsistenciaClose}
                variant="contained"
                sx={{
                  bgcolor: yellow[600],
                  color: "black",
                  mr: "10px",
                  "&:hover": {
                    bgcolor: yellow[400],
                    color: "white",
                  },
                }}
              >
                Volver
              </Button>

              {mostrarRegistrar}
            </>
          )}
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid>
          <Grid container>
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                xs={6}
                component={"span"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "Column",
                  alignItems: "flex-end",
                  marginRight: "130px",
                }}
              >
                <div>
                  <b style={{ display: "block" }}>
                    PROFESOR: {datosMaestro.nombre}
                  </b>
                  <b style={{ display: "block" }}>
                    TALLER: {datosTallerModal.nombre}
                  </b>
                </div>
              </Grid>

              <Grid item xs={6} component={"span"}>
                <TextField
                  disabled={checked}
                  inputProps={{
                    max: moment(new Date()).format("YYYY-MM-DD"),
                  }}
                  id="date"
                  label="Fecha"
                  onChange={datos}
                  value={fecha}
                  type="date"
                  sx={{ width: 220, ml: "130px" }}
                />
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} component={"span"}>
            <Container maxWidth="md" sx={{ mt: "20px" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow style={{ userSelect: "none" }}>
                      <StyledTableCell>Nombre del estudiante</StyledTableCell>
                      {checked ? (
                        <StyledTableCell>Asistencia</StyledTableCell>
                      ) : (
                        <></>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ userSelect: "none" }}>
                    {renderAlumnos}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ModalAlumnosTaller;
