import React, { createContext, useState } from "react";

const login_inicial = {
  correo: "",
  password: "",
};

export const context = createContext();

export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(login_inicial);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [alerta, setAlerta] = useState("success");
  const [maestros, setMaestros] = useState([]);
  const [talleres, setTalleres] = useState(false);
  const [datosTalleres, setDatosTalleres] = useState([]);
  const [datosTaller, setDatosTaller] = useState({});
  const [datosAlumno, setDatosAlumno] = useState({});
  const [datosAlumnoTaller, setDatosAlumnoTaller] = useState([]);
  const [datosMaestro, setDatosMaestro] = useState({});
  const [datosTallerModal, setDatosTallerModal] = useState({});
  const [control, setControl] = useState(false);
  const [controller, setController] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoTaller, setAlumnoTaller] = useState(false);
  const [detallesAlumnosTaller, setDetallesAlumnosTaller] = useState(false);
  const [asistencia, setAsistencia] = useState(false);
  const [asistenciasAlumno, setAsistenciasAlumno] = useState(false);
  const [checked, setChecked] = useState(false);
  const [datosAlumnosRegistrados, setDatosAlumnosRegistrados] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTalleresOpen = () => {
    setTalleres(true);
  };

  const handleTalleresClose = () => {
    setTalleres(false);
  };

  return (
    <context.Provider
      value={{
        alumnos,
        setAlumnos,
        loading,
        setLoading,
        login,
        setLogin,
        message,
        setMessage,
        open,
        setOpen,
        handleClose,
        alerta,
        setAlerta,
        maestros,
        setMaestros,
        talleres,
        setTalleres,
        handleTalleresOpen,
        handleTalleresClose,
        datosTalleres,
        setDatosTalleres,
        datosMaestro,
        setDatosMaestro,
        datosAlumno,
        setDatosAlumno,
        control,
        setControl,
        datosTaller,
        setDatosTaller,
        alumnoTaller,
        setAlumnoTaller,
        detallesAlumnosTaller,
        setDetallesAlumnosTaller,
        datosTallerModal,
        setDatosTallerModal,
        datosAlumnoTaller,
        setDatosAlumnoTaller,
        controller,
        setController,
        asistencia,
        setAsistencia,
        checked,
        setChecked,
        asistenciasAlumno,
        setAsistenciasAlumno,
        datosAlumnosRegistrados,
        setDatosAlumnosRegistrados,
      }}
    >
      {children}
    </context.Provider>
  );
};
