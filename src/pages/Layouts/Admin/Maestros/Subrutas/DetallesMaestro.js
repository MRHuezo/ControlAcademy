import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { context } from "../../../../../Provider";
import CloseIcon from "@mui/icons-material/Close";

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
      fullScreen
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={handleDetallesClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Información del Profesor
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: green[600],
              color: "white",
              "&:hover": {
                bgcolor: green[400],
                color: "white",
              },
            }}
            onClick={() => handleTalleresOpen()}
          >
            Agregar nuevo taller
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid>
          <Grid container>
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                xs={6}
                component={"span"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "Column",
                  alignItems: "flex-end",
                  marginRight: "130px",
                }}
              >
                <div>
                  <b style={{ display: "block" }}>
                    NOMBRE: {datosMaestro.nombre}
                  </b>
                  <b style={{ display: "block" }}>
                    FECHA DE NACIMIENTO: {datosMaestro.fecha_nacimiento}
                  </b>
                </div>
              </Grid>

              <Grid item xs={6} component={"span"}>
                <div sx={{ width: 220, ml: "130px" }}>
                  <b style={{ display: "block" }}>
                    CORREO: {datosMaestro.correo}
                  </b>
                  <b style={{ display: "block" }}>
                    FECHA DE INGRESO: {datosMaestro.fecha_de_ingreso}
                  </b>
                </div>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} component={"span"}>
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
    </Dialog>
  );
}

export default DetallesMaestro;
