import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { context } from "../../../../Provider";
import CursoOnline from "../..//../../img/curso-online.png";
import { green } from "@mui/material/colors";

const workshop_inicial = {
  nombre: "",
  fecha_inicio: "2022-06-16",
  fecha_final: "2022-07-18",
  horario: "12:00",
  id_user: "",
};

const semana = [
  { dia: "Lunes", checked: false },
  { dia: "Martes", checked: false },
  { dia: "Miercoles", checked: false },
  { dia: "Jueves", checked: false },
  { dia: "Viernes", checked: false },
];

function RegistroTaller() {
  const {
    setOpen,
    setMessage,
    setAlerta,
    datosMaestro,
    setControl,
    control,
    handleTalleresClose,
  } = useContext(context);
  const [formCurso, setFormCurso] = useState(workshop_inicial);
  // eslint-disable-next-line
  const [error, setError] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [alert] = useState(false);
  const [dias, setDias] = useState(semana);

  const token = localStorage.getItem("token");
  if (token === null) {
    return <Navigate to="/" replace={true} />;
  }
  // const decoded = JSON.parse(localStorage.getItem("decoded"));

  const datos = (e) => {
    const { name, value } = e.target;
    setFormCurso({ ...formCurso, [name]: value });
  };

  const marcar = (index) => {
    let diasHere = [...dias];
    diasHere[index].checked = !diasHere[index].checked;
    setDias(diasHere);
  };

  let cadenaDias = "";
  dias.forEach((dia) => {
    if (dia.checked === true) {
      cadenaDias = cadenaDias.concat(dia.dia, " ");
    }
  });

  // console.log(cadenaDias);

  const registrarTaller = async () => {
    try {
      if (!formCurso.nombre) {
        setOpen(true);
        setAlerta("error");
        setMessage("El nombre del taller es un campo obligatorio");
        return;
      } else {
        setLoading(true);
        // eslint-disable-next-line
        const resRegistrarTaller = await axios.post(
          `http://localhost:4000/api-v1/workshop/${datosMaestro._id}`,
          formCurso
        );
        // console.log(resRegistrarTaller.data);
        setFormCurso(workshop_inicial);
        setLoading(false);
        setError(false);
        setOpen(true);
        setControl(!control);
        handleTalleresClose();
        setAlerta("success");
        setMessage("Taller Registrado");
        // console.log("Taller Registrado");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

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
                Registro de talleres
              </h1>
            </div>
            <div style={{ width: "300px", height: "300px" }}>
              <img
                src={CursoOnline}
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
              value={formCurso.nombre}
              onChange={datos}
              label="Nombre del taller"
              placeholder="Ingrese el nombre del taller"
              required
              type="text"
              error={alert && !formCurso.nombre}
              helperText={
                alert && !formCurso.nombre ? "El nombre es obligatorio" : ""
              }
              sx={{
                mt: "25px",
                ml: "25px",
                mr: "25px",
                gridColumn: "1 / 3",
              }}
            />

            <TextField
              name="fecha_inicio"
              value={formCurso.fecha_inicio}
              onChange={datos}
              label="Fecha inicial del taller"
              type="date"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="fecha_final"
              value={formCurso.fecha_final}
              onChange={datos}
              label="Fecha final del taller"
              type="date"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
            />
            <TextField
              name="horario"
              value={formCurso.horario}
              onChange={datos}
              label="Horario"
              type="time"
              sx={{ ml: "25px", mr: "25px", mt: "15px" }}
              style={{ gridColumn: "1/3" }}
            />
            <FormLabel
              component="legend"
              sx={{ ml: "40px", mt: "30px", gridColumn: "1 / 3" }}
            >
              Días que se impartirá el taller
            </FormLabel>
            <FormGroup
              sx={{
                ml: "40px",
                gridColumn: "1 / 3",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              }}
            >
              {dias.map((dia, index) => {
                //   console.log(dia);
                return (
                  <FormControlLabel
                    style={{ gridColumn: `${index + 1} / span 1` }}
                    control={
                      <Checkbox
                        checked={dia.checked}
                        onChange={() => marcar(index)}
                        name={dia.dia}
                      />
                    }
                    label={dia.dia}
                    key={index}
                  />
                );
              })}
            </FormGroup>

            <Button
              onClick={registrarTaller}
              type="submit"
              variant="contained"
              sx={{
                m: "20px",
                gridColumn: "1 / 3",
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
          </Paper>
        </div>
      </div>
    </>
  );
}

export default RegistroTaller;
