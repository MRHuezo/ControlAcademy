import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../../components/NavbarAdmin";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { context } from "../../../../Provider";
import TablaAlumno from "../Alumnos/Subrutas/TablaAlumno";
import DetallesAlumno from "../Alumnos/Subrutas/DetallesAlumno";
import ModalAlumno from "./Subrutas/ModalAlumno";

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

function Alumnos() {
  const {
    controller,
    setLoading,
    setAlumnos,
    alumnos,
    setDatosAlumno,
    setDatosTaller,
    alumnoTaller,
    setAlumnoTaller,
    datosAlumno,
    alumno,
    editarAlumno,
    formAlumno,
    setFormAlumno,
    state_inicial,
  } = useContext(context);

  const classes = useStyles();
  const [registroAlumno, setRegistroAlumno] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [stateEditarUsuario, setStateEditarUsuario] = useState(false);

  const handleRegistroAlumnoOpen = () => {
    setRegistroAlumno(true);
    setStateEditarUsuario(false);
  };

  const handleRegistroAlumnoClose = () => {
    setRegistroAlumno(false);
    // setEditarAlumno([]);
    setFormAlumno(state_inicial);
    // setEditarAlumno(state_inicial);
  };

  const handleAlumnosTallerOpen = (value) => {
    setDatosAlumno(value);
    setAlumnoTaller(true);
  };

  const handleAlumnosTallerClose = () => {
    setAlumnoTaller(false);
    setDatosAlumno({});
    setDatosTaller({});
  };

  const handleEditarAlumno = (value) => {
    setRegistroAlumno(true);
    setFormAlumno(value);
    setStateEditarUsuario(true);
    // setDatosAlumno(value);
    // setAlumnoTaller(true);
  };

  const token = localStorage.getItem("token");
  if (token === null) {
    return <Navigate to="/" replace={true} />;
  }

  const obtenerAlumnos = async () => {
    try {
      setLoading(true);
      const mostrarAlumnos = await axios.get(
        `http://localhost:4000/api-v1/student`
      );
      setLoading(false);
      setError(false);
      setAlumnos(mostrarAlumnos.data.students);
      // setAlumnoTaller(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (datosAlumno._id || !formAlumno._id) {
      obtenerAlumnos();
      console.log("Actualizado");
    }

    // eslint-disable-next-line
  }, [alumno, controller]);

  // eslint-disable-next-line
  useEffect(() => {
    console.log("Editar Alumno", editarAlumno);

    // eslint-disable-next-line
  }, [editarAlumno]);

  // eslint-disable-next-line
  useEffect(() => {
    obtenerAlumnos();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className={classes.contenedorBotonGrande}>
        <Button
          variant="contained"
          className={classes.botonGrande}
          onClick={() => handleRegistroAlumnoOpen()}
        >
          Registrar Alumno
        </Button>
      </div>
      <TablaAlumno
        alumnos={alumnos}
        handleAlumnosTallerOpen={handleAlumnosTallerOpen}
        handleEditarAlumno={handleEditarAlumno}
      />

      <DetallesAlumno
        alumnoTaller={alumnoTaller}
        handleAlumnosTallerClose={handleAlumnosTallerClose}
      />

      <ModalAlumno
        registroAlumno={registroAlumno}
        handleRegistroAlumnoClose={handleRegistroAlumnoClose}
        stateEditarUsuario={stateEditarUsuario}
      />
    </>
  );
}

export default Alumnos;
