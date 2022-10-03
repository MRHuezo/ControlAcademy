import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../../../../components/NavbarAdmin";
import {
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { context } from "../../../../Provider";
import { Navigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function Talleres() {
  const { setLoading } = useContext(context);
  const [datosTalleres, setDatosTalleres] = useState([]);
  const [filter, setFilter] = useState({
    campo: "taller",
    orden: true,
  });
  const token = localStorage.getItem("token");
  if (token === null) {
    return <Navigate to="/" replace={true} />;
  }
  const obtenerTalleres = async () => {
    try {
      setLoading(true);
      const mostrarTalleres = await axios.get(
        `http://localhost:4000/api-v1/workshop/`
      );
      setLoading(false);
      // console.log(mostrarTalleres);
      // console.log(datosTalleres);
      //setError(false);
      //setDatosTalleres(mostrarTalleres.data.workshopsTeacher);
      // console.log(mostrarTalleres.data.workshopsTeacher);
      setDatosTalleres(mostrarTalleres.data.workshopsTeacher);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const ordenado = (name) => {
    // console.log(name);
    setFilter({
      campo: name,
      orden: filter.campo === name ? !filter.orden : true,
    });
  }; //Orden será booleano. True es ascendente y False descendente

  const arrayOrdenado = (arrayOrigen) => {
    let arrayReturn = [];
    switch (filter.campo) {
      case "taller":
        filter.orden
          ? (arrayReturn = arrayOrigen.sort((a, b) =>
              a.nombre > b.nombre ? 1 : -1
            ))
          : (arrayReturn = arrayOrigen.sort((a, b) =>
              a.nombre > b.nombre ? -1 : 1
            ));
        return arrayReturn;
      case "maestro":
        filter.orden
          ? (arrayReturn = arrayOrigen.sort((a, b) =>
              a.id_user.nombre > b.id_user.nombre ? 1 : -1
            ))
          : (arrayReturn = arrayOrigen.sort((a, b) =>
              a.id_user.nombre > b.id_user.nombre ? -1 : 1
            ));
        return arrayReturn;

      case "fecha_inicio":
        filter.orden
          ? (arrayReturn = arrayOrigen.sort((a, b) =>
              a.fecha_inicio > b.fecha_inicio ? 1 : -1
            ))
          : (arrayReturn = arrayOrigen.sort((a, b) =>
              a.fecha_inicio > b.fecha_inicio ? -1 : 1
            ));
        return arrayReturn;

      case "fecha_final":
        filter.orden
          ? (arrayReturn = arrayOrigen.sort((a, b) =>
              a.fecha_final > b.fecha_final ? 1 : -1
            ))
          : (arrayReturn = arrayOrigen.sort((a, b) =>
              a.fecha_final > b.fecha_final ? -1 : 1
            ));
        return arrayReturn;

      default:
        break;
    }
  };

  // arrayOrdenado(datosTalleres).map((taller, index) => {
  //   return console.log(taller);
  // });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    obtenerTalleres();
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // console.log(filter);
    arrayOrdenado(datosTalleres);
    // eslint-disable-next-line
  }, [filter]);

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

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow style={{ cursor: "pointer", userSelect: "none" }}>
                <StyledTableCell onClick={() => ordenado("taller", true)}>
                  Nombre del taller{" "}
                  {filter.campo === "taller" && filter.orden === false ? (
                    <ArrowDropUpIcon style={{ color: "#fff" }} />
                  ) : (
                    <></>
                  )}
                  {filter.campo === "taller" && filter.orden === true ? (
                    <ArrowDropDownIcon style={{ color: "#fff" }} />
                  ) : (
                    <></>
                  )}
                </StyledTableCell>
                <StyledTableCell onClick={() => ordenado("maestro", true)}>
                  Nombre del maestro
                  {filter.campo === "maestro" && filter.orden === false ? (
                    <ArrowDropUpIcon style={{ color: "#fff" }} />
                  ) : (
                    <></>
                  )}
                  {filter.campo === "maestro" && filter.orden === true ? (
                    <ArrowDropDownIcon style={{ color: "#fff" }} />
                  ) : (
                    <></>
                  )}
                </StyledTableCell>
                <StyledTableCell onClick={() => ordenado("fecha_inicio", true)}>
                  Fecha inicial
                  {filter.campo === "fecha_inicio" && filter.orden === false ? (
                    <ArrowDropUpIcon style={{ color: "#fff" }} />
                  ) : (
                    <></>
                  )}
                  {filter.campo === "fecha_inicio" && filter.orden === true ? (
                    <ArrowDropDownIcon style={{ color: "#fff" }} />
                  ) : (
                    <></>
                  )}
                </StyledTableCell>
                <StyledTableCell onClick={() => ordenado("fecha_final", true)}>
                  Fecha final
                  {filter.campo === "fecha_final" && filter.orden === false ? (
                    <ArrowDropUpIcon style={{ color: "#fff" }} />
                  ) : (
                    <></>
                  )}
                  {filter.campo === "fecha_final" && filter.orden === true ? (
                    <ArrowDropDownIcon style={{ color: "#fff" }} />
                  ) : (
                    <></>
                  )}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrayOrdenado(datosTalleres).map((taller, index) => (
                <StyledTableRow key={index} taller={taller}>
                  <StyledTableCell component="th" scope="row">
                    {taller.nombre}
                  </StyledTableCell>
                  <StyledTableCell>{taller.id_user.nombre}</StyledTableCell>
                  <StyledTableCell>{taller.fecha_inicio}</StyledTableCell>
                  <StyledTableCell>{taller.fecha_final}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Talleres;
