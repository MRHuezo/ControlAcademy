import { Button, MenuItem, Paper, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import Maestro from "../../../../img/escritorio-del-maestro.png";
import { Navigate } from "react-router-dom";
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
  rol: "MAESTRO",
};

function RegistroMaestro() {
  const { setOpen, setMessage, setAlerta } = useContext(context);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [alert, setAlert] = useState(false);
  const [formMaestro, setFormMaestro] = useState(state_inicial);
  // eslint-disable-next-line
  const [error, setError] = useState("");

  const datos = (e) => {
    const { name, value } = e.target;
    setFormMaestro({ ...formMaestro, [name]: value });
  };

  // const enviarDatos = (e) => {
  //   try {
  //     if (!formMaestro.nombre || !formMaestro.correo || !formMaestro.password) {
  //       setOpen(true);
  //       setAlert(true);
  //       setError("El nombre, la contraseña y el e-mail son obligatorios");
  //       return;
  //     } else {
  //       console.log(`Nombre: ${formMaestro.nombre}`);
  //       console.log(`Correo: ${formMaestro.correo}`);
  //       console.log(`Contraseña: ${formMaestro.password}`);

  //       setFormMaestro(state_inicial);
  //       console.log("Maestro Registrado");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const registroMaestro = async () => {
    try {
      if (!formMaestro.nombre || !formMaestro.correo || !formMaestro.password) {
        setOpen(true);
        setAlerta("error");
        setMessage("El nombre, la contraseña y el e-mail son obligatorios");
        return;
      } else {
        setLoading(true);
        // eslint-disable-next-line
        const resMaestroRegistro = await axios.post(
          `http://localhost:4000/api-v1/teacher`,
          formMaestro
        );
        // console.log(resMaestroRegistro.data);
        setFormMaestro(state_inicial);
        setLoading(false);
        setOpen(true);
        setMessage("Maestro Registrado");
        setAlerta("success");
        // console.log("Maestro Registrado");
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
                Registro de maestros
              </h1>
            </div>
            <div style={{ width: "300px", height: "300px" }}>
              <img
                src={Maestro}
                alt=""
                style={{ marginTop: "20px", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
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
              value={formMaestro.nombre}
              onChange={datos}
              label="Nombre"
              placeholder="Ingrese su nombre"
              required
              type="text"
              error={alert && !formMaestro.nombre}
              helperText={
                alert && !formMaestro.nombre ? "El nombre es obligatorio" : ""
              }
              sx={{ mt: "25px", ml: "25px", mr: "25px" }}
            />
            <TextField
              name="domicilio"
              value={formMaestro.domicilio}
              onChange={datos}
              label="Domicilio"
              placeholder="Ingrese su domicilio"
              type="text"
              sx={{ mt: "25px", ml: "25px", mr: "25px" }}
            />
            <TextField
              name="telefono"
              value={formMaestro.telefono}
              onChange={datos}
              label="Telefono"
              placeholder="Ingrese su número de teléfono"
              type="number"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="correo"
              value={formMaestro.correo}
              onChange={datos}
              label="E-mail"
              placeholder="Ingrese su correo electrónico"
              required
              type="email"
              error={alert && !formMaestro.correo}
              helperText={
                alert && !formMaestro.correo ? "El correo es obligatorio" : ""
              }
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />

            <TextField
              name="fecha_nacimiento"
              value={formMaestro.fecha_nacimiento}
              onChange={datos}
              label="Fecha de nacimiento"
              type="date"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="fecha_de_ingreso"
              value={formMaestro.fecha_de_ingreso}
              onChange={datos}
              label="Fecha de ingreso"
              type="date"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="password"
              value={formMaestro.password}
              onChange={datos}
              required
              label="Contraseña"
              type="password"
              error={alert && !formMaestro.password}
              helperText={
                alert && !formMaestro.password
                  ? "La contraseña es obligatoria"
                  : ""
              }
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />

            <TextField
              select
              name="grado_estudio"
              value={formMaestro.grado_estudio}
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

            <Button
              onClick={registroMaestro}
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

export default RegistroMaestro;
