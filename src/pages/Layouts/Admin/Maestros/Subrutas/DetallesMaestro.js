import React, { useContext } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
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
import { blue, green } from "@mui/material/colors";
import { context } from "../../../../../Provider";

//ESTILOS DE TABLA
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

function DetallesMaestro({
  detalles,
  handleDetallesClose,
  handleModalAlumnosTallerOpen,
}) {
  const { handleTalleresOpen, datosTalleres, datosMaestro } =
    useContext(context);

  return (
    <Dialog
      open={detalles}
      keepMounted
      onClose={handleDetallesClose}
      maxWidth="md"
    >
      <DialogContent>
        <Grid>
          <Grid container>
            <Grid item xs={12}>
              <b
                style={{
                  color: "#000",
                  display: "block",
                  textAlign: "center",
                }}
              >
                INFORMACIÓN DEL PROFESOR
              </b>
            </Grid>
            <Grid item xs={6} component={"span"}>
              <b style={{ display: "block" }}>Nombre: {datosMaestro.nombre}</b>
              <b style={{ display: "block" }}>
                Fecha de Nacimiento: {datosMaestro.fecha_nacimiento}
              </b>
            </Grid>
            <Grid item xs={6} component={"span"}>
              <b style={{ display: "block" }}>Correo: {datosMaestro.correo}</b>
              <b style={{ display: "block" }}>
                Fecha de Ingreso: {datosMaestro.fecha_de_ingreso}
              </b>
            </Grid>
          </Grid>
          <Grid item xs={12} component={"span"}>
            <Button
              onClick={() => handleTalleresOpen()}
              variant="contained"
              sx={{
                bgcolor: green[600],
                color: "white",
                "&:hover": {
                  bgcolor: green[400],
                  color: "white",
                },
              }}
            >
              Agregar nuevo taller
            </Button>
            {!datosTalleres.length ? (
              <div style={{ textAlign: "center" }}>
                No hay nada para mostrar
              </div>
            ) : (
              <Container maxWidth="md" sx={{ mt: "20px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Nombre del taller</StyledTableCell>
                        <StyledTableCell>Horario</StyledTableCell>
                        <StyledTableCell>Fecha inicial</StyledTableCell>
                        <StyledTableCell>Fecha final</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{ cursor: "pointer", userSelect: "none" }}
                    >
                      {datosTalleres.map((datosTaller, index) => (
                        <StyledTableRow
                          key={index}
                          taller={datosTaller}
                          onClick={() =>
                            handleModalAlumnosTallerOpen(datosTaller)
                          }
                        >
                          <StyledTableCell component="th" scope="row">
                            {datosTaller.nombre}
                          </StyledTableCell>
                          <StyledTableCell>
                            {datosTaller.horario}
                          </StyledTableCell>
                          <StyledTableCell>
                            {datosTaller.fecha_inicio}
                          </StyledTableCell>
                          <StyledTableCell>
                            {datosTaller.fecha_final}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDetallesClose}
          variant="contained"
          sx={{
            bgcolor: blue[600],
            color: "white",
            "&:hover": {
              bgcolor: blue[400],
              color: "white",
            },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetallesMaestro;
