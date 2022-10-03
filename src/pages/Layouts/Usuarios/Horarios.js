import React from "react";
import NavbarUser from "../../../components/NavbarUser";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
// import { Navigate } from "react-router-dom";

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

function Horarios() {
  //   const token = localStorage.getItem("token");
  //   if (token === null) {
  //     return <Navigate to="/" replace={true} />;
  //   }
  const classes = useStyles();
  return (
    <>
      <NavbarUser />
      <div className={classes.contenedorBotonGrande}>
        <Button variant="contained" className={classes.botonGrande}>
          Horarios
        </Button>
      </div>
    </>
  );
}

export default Horarios;
