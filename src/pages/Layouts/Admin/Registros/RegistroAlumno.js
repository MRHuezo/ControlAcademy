import { Button, MenuItem, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Registro from "../../../../img/register.png";
import { context } from "../../../../Provider";

const state_inicial = {
  nombre: "",
  domicilio: "",
  telefono: "",
  correo: "",
  fecha_nacimiento: "2000-08-16",
  fecha_de_ingreso: "2022-07-18",
  grado_estudio: "",
  password: "",
  admin: false,
  rol: "ALUMNO",
  edad: "",
  escuela_donde_estudia: "",
  grado: "",
  nombre_tutor: "",
};

function RegistroAlumno({ handleRegistroAlumnoClose }) {
  const [formAlumno, setFormAlumno] = useState(state_inicial);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const [alert] = useState(false);
  const { setOpen, setMessage, setAlerta, controller, setController } =
    useContext(context);

  const datos = (e) => {
    const { name, value } = e.target;
    setFormAlumno({ ...formAlumno, [name]: value });
  };

  const registroAlumno = async () => {
    try {
      if (!formAlumno.nombre || !formAlumno.correo || !formAlumno.password) {
        setOpen(true);
        setMessage("El nombre, la contraseña y el e-mail son obligatorios");
        setAlerta("error");
        return;
      } else {
        setLoading(true);
        const resAlumnoRegistro = await axios.post(
          `http://localhost:4000/api-v1/teacher`,
          formAlumno
        );
        // console.log(resAlumnoRegistro);
        setFormAlumno(state_inicial);
        setLoading(false);
        setError(false);
        setController(!controller);
        handleRegistroAlumnoClose();
        // console.log("Alumno Registrado");
        setOpen(true);
        setMessage("Alumno Registrado");
        setAlerta("success");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const token = localStorage.getItem("token");
  if (token === null) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        {/* Primer columna */}
        <div style={{ gridColumn: "1 / 2" }}>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "140px 1fr",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                width: "300px",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <h1
                style={{
                  fontFamily: "Alumni Sans Pinstripe",
                  color: "black",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  fontSize: "40px",
                }}
              >
                Registro de alumnos
              </h1>
            </div>
            <div style={{ width: "300px", height: "300px" }}>
              <img
                src={Registro}
                alt=""
                style={{ marginTop: "20px", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Segunda columna - Formulario */}
        <div
          style={{
            fontFamily: "Alumni Sans Pinstripe",
            color: "white",
            fontSize: "5em",
            display: "grid",
            alignItems: "center",
            margin: "20px",
            gridColumn: "2 / 3",
            gridTemplateColumns: { sm: "1fr 1fr" },
          }}
        >
          <Paper
            sx={{
              bgcolor: "white",
              height: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderRadius: "20px",
              m: "20px",
            }}
          >
            <TextField
              name="nombre"
              value={formAlumno.nombre}
              onChange={datos}
              label="Nombre"
              placeholder="Ingrese su nombre"
              required
              type="text"
              error={alert && !formAlumno.nombre}
              helperText={
                alert && !formAlumno.nombre ? "El nombre es obligatorio" : ""
              }
              sx={{ mt: "25px", ml: "25px", mr: "25px" }}
            />
            <TextField
              name="domicilio"
              value={formAlumno.domicilio}
              onChange={datos}
              label="Domicilio"
              placeholder="Ingrese su domicilio"
              type="text"
              sx={{ mt: "25px", ml: "25px", mr: "25px" }}
            />
            <TextField
              name="telefono"
              value={formAlumno.telefono}
              onChange={datos}
              label="Telefono"
              placeholder="Ingrese su número de teléfono"
              type="number"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="correo"
              value={formAlumno.correo}
              onChange={datos}
              label="E-mail"
              placeholder="Ingrese su correo electrónico"
              required
              type="email"
              error={alert && !formAlumno.correo}
              helperText={
                alert && !formAlumno.correo ? "El correo es obligatorio" : ""
              }
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="fecha_nacimiento"
              value={formAlumno.fecha_nacimiento}
              onChange={datos}
              label="Fecha de nacimiento"
              type="date"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="fecha_de_ingreso"
              value={formAlumno.fecha_de_ingreso}
              onChange={datos}
              label="Fecha de ingreso"
              type="date"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />

            <TextField
              name="password"
              value={formAlumno.password}
              onChange={datos}
              required
              label="Contraseña"
              type="password"
              error={alert && !formAlumno.password}
              helperText={
                alert && !formAlumno.password
                  ? "La contraseña es obligatoria"
                  : ""
              }
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />

            <TextField
              select
              name="grado_estudio"
              value={formAlumno.grado_estudio}
              label="Grado de estudio"
              onChange={datos}
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            >
              <MenuItem value={"Primaria"}>Primaria</MenuItem>
              <MenuItem value={"Secundaria"}>Secundaria</MenuItem>
              <MenuItem value={"Bachillerato"}>Bachillerato</MenuItem>
              <MenuItem value={"Licenciatura"}>Licenciatura</MenuItem>
              <MenuItem value={"Maestría"}>Maestría</MenuItem>
              <MenuItem value={"Doctorado"}>Doctorado</MenuItem>
            </TextField>

            <TextField
              name="edad"
              value={formAlumno.edad}
              onChange={datos}
              label="Edad"
              type="number"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="escuela_donde_estudia"
              value={formAlumno.escuela_donde_estudia}
              onChange={datos}
              label="Escuela donde estudia"
              type="text"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="grado"
              value={formAlumno.grado}
              onChange={datos}
              label="Grado"
              type="number"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="nombre_tutor"
              value={formAlumno.nombre_tutor}
              onChange={datos}
              label="Nombre del tutor"
              type="text"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <Button
              onClick={registroAlumno}
              type="submit"
              variant="contained"
              sx={{ m: "20px", gridColumn: "1 / 3" }}
            >
              Registrar
            </Button>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default RegistroAlumno;
