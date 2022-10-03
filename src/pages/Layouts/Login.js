import React, { useContext, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Typography, Link, Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { context } from "../../Provider";
import jwt_decode from "jwt-decode";

// const usuarios = [
//   { nombre: "Luis", password: "1234" },
//   { nombre: "Aldo", password: "5678" },
// ];

const login_inicial = {
  correo: "",
  password: "",
};

const useStyles = makeStyles({
  signIn: {
    marginTop: "60px",
    padding: "20px",
    height: "80vh",
    width: "50vw",
    backgroundColor: "white",
    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
    backdropFilter: "blur(8.5px)",
    borderRadius: "15px",
    color: "#000",

    "& .MuiFormControl-root": {
      marginBottom: "20px",
    },
  },
  btnstyle: {
    margin: "8px 0",
    fontFamily: "Asap Condensed!important",
    color: "white!important",
    fontSize: "1.5em!important",
    backgroundColor: "#bf3c12!important",
  },
  txt: {
    marginBottom: "8px",
  },
  centrar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function Login() {
  const token = localStorage.getItem("token");
  const decoded = JSON.parse(localStorage.getItem("decoded"));
  const { login, setLogin, setMessage, setOpen, setAlerta } =
    useContext(context);
  const classes = useStyles();

  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  // eslint-disable-next-line
  const [alert, setAlert] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     navigate("/inicio", { replace: true });
  //     return null;
  //   }
  // }, [token]);

  const obtenerDatos = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // const marcar = (e) => {
  //   const { name, checked } = e.target;
  //   setLogin({ ...login, [name]: checked });
  // };

  // const enviarDatos = () => {
  //   if (!login.nombre || !login.password || !login.terminos) {
  //     setOpen(true);
  //     setAlert(true);
  //     setError("Todos los campos son obligatorios");
  //     return;
  //   }
  //   const resultado = usuarios.filter(
  //     (res) => res.nombre === login.nombre && res.password === login.password
  //   );
  //   if (resultado.length === 0) {
  //     setOpen(true);
  //     setAlert(true);
  //     setError(
  //       "El usuario que has ingresado no coincide con los existentes en la base de datos."
  //     );
  //   } else {
  //     navigate("/inicio", { replace: true });
  //   }
  // };

  const postLogin = async () => {
    try {
      setLoading(true);
      const resLogin = await axios.post(
        `http://localhost:4000/api-v1/signin`,
        login
      );
      setLogin(resLogin.data);
      // console.log(login);
      setLoading(false);
      setError(false);
      setOpen(true);
      setAlerta("success");
      setMessage("Inicio de sesión exitoso");
      const token = resLogin.data.token;
      const decoded = jwt_decode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("decoded", JSON.stringify(decoded));
      setLogin(login_inicial);
    } catch (error) {
      setOpen(true);
      setMessage(error.response.data.message);
      setLoading(false);
      setError(true);
      setAlerta("error");
    }
  };

  if (token) {
    if (decoded.admin === true) {
      return <Navigate to="/admin/inicio" replace={true} />;
    } else {
      return <Navigate to="/user/inicio" replace={true} />;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontFamily: "Alumni Sans Pinstripe",
      }}
    >
      <div className={classes.signIn}>
        <div align="center">
          <h1
            style={{
              textTransform: "uppercase",
              textShadow:
                "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
              fontSize: "60px",
            }}
          >
            Login
          </h1>
        </div>
        <TextField
          name="correo"
          value={login.correo}
          onChange={obtenerDatos}
          label="Correo Electrónico"
          placeholder="Ingrese su correo"
          fullWidth
          required
          error={alert && !login.correo}
          helperText={alert && !login.correo ? "El correo es obligatorio" : ""}
          sx={{
            [`& fieldset`]: {
              borderRadius: "15px",
              backgroundColor: "rgba(255,255,255,0.25)",
            },
          }}
          className={classes.txt}
        ></TextField>
        <TextField
          name="password"
          value={login.password}
          onChange={obtenerDatos}
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          fullWidth
          required
          type="password"
          error={alert && !login.password}
          helperText={
            alert && !login.password ? "La contraseña es obligatoria" : ""
          }
          sx={{
            [`& fieldset`]: {
              borderRadius: "15px",
              backgroundColor: "rgba(255,255,255,0.25)",
            },
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              postLogin();
            }
          }}
        ></TextField>

        <Button
          sx={{ mt: "10px" }}
          onClick={postLogin}
          type="submit"
          variant="contained"
          fullWidth
          className={classes.btnstyle}
        >
          Iniciar Sesión
        </Button>
        <Typography sx={{ mt: "20px" }} className={classes.centrar}>
          <Link href="#">¿Olvidaste tu contraseña?</Link>
        </Typography>
        <Typography className={classes.centrar}>
          ¿Ya tienes una cuenta?
          <Link href="#">Regístrate</Link>
        </Typography>
      </div>
    </Box>
  );
}

export default Login;
