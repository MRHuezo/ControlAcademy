import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import ReactExport from "react-export-excel-xlsx-fix";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExcelDownload({ dAR }) {
  return (
    <ExcelFile
      filename="Lista de Asistencia"
      element={
        <Button
          variant="contained"
          sx={{
            mr: "10px",
            bgcolor: grey[100],
            color: "green",
            "&:hover": {
              bgcolor: grey[50],
              color: "green",
            },
          }}
        >
          Exportar a Excel
        </Button>
      }
    >
      <ExcelSheet data={dAR} name="Lista de Asistencia">
        <ExcelColumn label="Nombre del Alumno" value="nombre" />
      </ExcelSheet>
    </ExcelFile>
  );
}

export default ExcelDownload;
