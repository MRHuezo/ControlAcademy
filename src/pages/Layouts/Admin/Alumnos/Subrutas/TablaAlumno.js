import React from "react";
import {
  Button,
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
import { blue, green, red } from "@mui/material/colors";

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

function TablaAlumno({ alumnos, handleAlumnosTallerOpen, handleEditarAlumno }) {
  return (
    <Container maxWidth="lg" sx={{ mt: "20px", mb: "20px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ textAlign: "center" }}>
                Nombre del alumno
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                Correo
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                Fecha de nacimiento
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                Fecha de ingreso
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                Agregar a Taller
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                Editar
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: "center" }}>
                Eliminar
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ userSelect: "none" }}>
            {alumnos.map((alumno, index) => (
              <StyledTableRow
                key={index}
                alumno={alumno}
                // onClick={() => handleAlumnosTallerOpen(alumno)}
              >
                <StyledTableCell
                  style={{ textAlign: "center" }}
                  component="th"
                  scope="row"
                >
                  {alumno.nombre}
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  {alumno.correo}
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  {alumno.fecha_nacimiento}
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  {alumno.fecha_de_ingreso}
                </StyledTableCell>

                <StyledTableCell style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleAlumnosTallerOpen(alumno)}
                    sx={{
                      bgcolor: green[600],
                      color: "white",
                      "&:hover": {
                        bgcolor: green[400],
                        color: "white",
                      },
                    }}
                  >
                    Agregar a taller
                  </Button>
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleEditarAlumno(alumno)}
                    sx={{
                      bgcolor: blue[600],
                      color: "white",
                      "&:hover": {
                        bgcolor: blue[400],
                        color: "white",
                      },
                    }}
                  >
                    Editar
                  </Button>
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: red[600],
                      color: "white",
                      "&:hover": {
                        bgcolor: red[400],
                        color: "white",
                      },
                    }}
                    // onClick={() => handleAlumnosTallerOpen(alumno)}
                  >
                    Eliminar
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TablaAlumno;
