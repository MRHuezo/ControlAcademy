import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { context } from "../../../../Provider";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import DetallesMaestro from "./Subrutas/DetallesMaestro";
import Navbar from "../../../../components/NavbarAdmin";
import React from "react";
import TablaMaestro from "./Subrutas/TablaMaestro";
import ModalTalleresRegistro from "../Talleres/Subrutas/ModalTalleresRegistro";
import ModalMaestroRegistro from "./Subrutas/ModalMaestroRegistro";
import ModalAlumnosTaller from "../Talleres/Subrutas/ModalAlumnosTaller";

const useStyles = makeStyles({
  botonGrande: {
    backgroundColor: "#4f9bf5!important",
    color: "white!important",
    fontFamily: "Alumni Sans Pinstripe!important",
    fontSize: "0.35em!important",
    marginTop: "10px!important",
    padding: "20px!important",
    "&:hover": {
      backgroundColor: "#d03a43!important",
      color: "white!important",
    },
  },
  contenedorBotonGrande: {
    fontFamily: "Alumni Sans Pinstripe",
    color: "white",
    fontSize: "5em",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
});

function GetMaestros() {
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [detalles, setDetalles] = useState(false);
  const [registroMaestro, setRegistroMaestro] = useState(false);

  const {
    maestros,
    setMaestros,
    setLoading,
    setDatosTalleres,
    datosMaestro,
    setDatosMaestro,
    control,
    setDetallesAlumnosTaller,
    detallesAlumnosTaller,
    datosTallerModal,
    setDatosTallerModal,
    setDatosAlumnoTaller,
    setChecked,
    setDatosAlumnosRegistrados,
  } = useContext(context);

  const handleRegistroMaestroOpen = () => {
    setRegistroMaestro(true);
  };

  const handleRegistroMaestroClose = () => {
    setRegistroMaestro(false);
  };

  const handleDetallesOpen = (value) => {
    setDatosMaestro(value);
  };

  const handleDetallesClose = () => {
    setDetalles(false);
    setDatosMaestro({});
  };

  const handleModalAlumnosTallerOpen = async (value) => {
    setDatosTallerModal(value);
    try {
      // eslint-disable-next-line
      const asistencias = await axios.get(
        `http://localhost:4000/api-v1/workshop/${value._id}/asistencias`
      );
      // console.log(asistencias);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalAlumnosTallerClose = () => {
    setDatosTallerModal({});
    setDetallesAlumnosTaller(false);
    setChecked(false);
  };

  const obtenerMaestros = async () => {
    try {
      setLoading(true);
      const mostrarMaestros = await axios.get(
        `http://localhost:4000/api-v1/teacher`
      );
      setLoading(false);
      setError(false);
      setMaestros(mostrarMaestros.data.maestros);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const obtenerTalleres = async () => {
    try {
      setLoading(true);
      const mostrarTalleres = await axios.get(
        `http://localhost:4000/api-v1/workshop/${datosMaestro._id}`
      );
      setLoading(false);
      setError(false);
      setDatosTalleres(mostrarTalleres.data.workshopsTeacher);
      setDetalles(true);

      // console.log(mostrarTalleres.data.workshopsTeacher);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const obtenerAlumnosDeTaller = async () => {
    try {
      setLoading(true);
      const mostrarAlumnos = await axios.get(
        `http://localhost:4000/api-v1/workshop/${datosTallerModal._id}/alumnos`
      );
      setLoading(false);
      setError(false);
      setDetallesAlumnosTaller(true);
      // console.log(mostrarAlumnos);

      let nuevoArray = [];
      mostrarAlumnos.data.estudiantes.forEach((res) => {
        console.log(res);
        if (res.id_user !== null) {
          nuevoArray.push({
            _id: res.id_user._id,
            nombre: res.id_user.nombre,
            edad: res.id_user.edad,
            assistence: false,
          });
        }

        // console.log(nuevoArray._id);
      });
      setDatosAlumnoTaller(nuevoArray);
      setDatosAlumnosRegistrados(nuevoArray);
      // setDatosTalleres();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    obtenerMaestros();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (datosMaestro._id) {
      obtenerTalleres();
    }

    // eslint-disable-next-line
  }, [datosMaestro, control]);

  useEffect(() => {
    if (datosTallerModal._id) {
      obtenerAlumnosDeTaller();
    }

    // eslint-disable-next-line
  }, [datosTallerModal]);

  const classes = useStyles();
  return (
    <Box>
      <Navbar />
      <div className={classes.contenedorBotonGrande}>
        <Button
          variant="contained"
          className={classes.botonGrande}
          onClick={() => handleRegistroMaestroOpen()}
        >
          Registrar Maestro
        </Button>
      </div>
      <TablaMaestro
        maestros={maestros}
        handleDetallesOpen={handleDetallesOpen}
      />
      <DetallesMaestro
        detalles={detalles}
        handleDetallesClose={handleDetallesClose}
        handleModalAlumnosTallerOpen={handleModalAlumnosTallerOpen}
      />
      <ModalMaestroRegistro
        registroMaestro={registroMaestro}
        handleRegistroMaestroClose={handleRegistroMaestroClose}
      />
      <ModalTalleresRegistro />
      <ModalAlumnosTaller
        detallesAlumnosTaller={detallesAlumnosTaller}
        handleModalAlumnosTallerClose={handleModalAlumnosTallerClose}
      />
    </Box>
  );
}

export default GetMaestros;
