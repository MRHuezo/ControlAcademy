import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import { context } from "../Provider";

const Boton = styled(Button)({
  fontFamily: "Alumni Sans Pinstripe!important",
  fontSize: "1.3em!important",
  fontWeight: "600!important",
  backgroundColor: "#063970!important",
  color: "white!important",
  padding: "10px!important",
  borderRadius: "0px!important",
  "&:hover": {
    backgroundColor: "white!important",
    color: "#063970!important",
  },
});

const BotonCerrarSesion = styled(Button)({
  fontFamily: "Alumni Sans Pinstripe!important",
  fontSize: "1.3em!important",
  fontWeight: "600!important",
  backgroundColor: "#dc0000!important",
  color: "#fff!important",
  padding: "10px!important",
  borderRadius: "10px!important",
  "&:hover": {
    backgroundColor: "white!important",
    color: "#063970!important",
  },
});

const Navbar = () => {
  const { setMessage, setOpen, setAlerta } = useContext(context);

  let navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("decoded");
    navigate("/", { replace: true });
    setOpen(true);
    setMessage("Cierre de sesión exitoso");
    setAlerta("success");
  };

  return (
    <Box>
      <AppBar>
        <Toolbar
          sx={{
            width: "100%",
            height: "100px",
            margin: "0 auto",
            bgcolor: "#063970",
          }}
        >
          <SchoolIcon sx={{ mr: "15px", fontSize: "5em" }} />
          <Typography
            variant="h2"
            fontFamily="Alumni Sans Pinstripe"
            sx={{ flexGrow: 1, color: "white", userSelect: "none" }}
          >
            Control Academy
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "flex-end" }}
          >
            <NavLink style={{ textDecoration: "none" }} to="/admin/inicio">
              <Boton>Inicio</Boton>
            </NavLink>
            {/* <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/inicio"
            >
              <Boton>Inicio</Boton>
            </NavLink> */}
            <NavLink style={{ textDecoration: "none" }} to="/admin/alumnos">
              <Boton>Alumnos</Boton>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }} to="/admin/talleres">
              <Boton>Talleres</Boton>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }} to="/admin/maestros">
              <Boton>Maestros</Boton>
            </NavLink>
            <BotonCerrarSesion onClick={logOut}>
              Cerrar sesión
            </BotonCerrarSesion>
          </Stack>
        </Toolbar>
      </AppBar>
      <div style={{ height: "100px" }}></div>
    </Box>
  );
};

export default Navbar;
