import React from "react";
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

function TablaAlumno({ alumnos, handleAlumnosTallerOpen }) {
  return (
    <Container maxWidth="md" sx={{ mt: "20px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre del alumno</StyledTableCell>
              <StyledTableCell>Correo</StyledTableCell>
              <StyledTableCell>Fecha de nacimiento</StyledTableCell>
              <StyledTableCell>Fecha de ingreso</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ cursor: "pointer", userSelect: "none" }}>
            {alumnos.map((alumno, index) => (
              <StyledTableRow
                key={index}
                alumno={alumno}
                onClick={() => handleAlumnosTallerOpen(alumno)}
              >
                <StyledTableCell component="th" scope="row">
                  {alumno.nombre}
                </StyledTableCell>
                <StyledTableCell>{alumno.correo}</StyledTableCell>
                <StyledTableCell>{alumno.fecha_nacimiento}</StyledTableCell>
                <StyledTableCell>{alumno.fecha_de_ingreso}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TablaAlumno;
