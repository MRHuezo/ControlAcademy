import "./App.css";
import background from "./img/background4.jpg";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import theme from "./temaConfig";
import { Provider } from "./Provider";
import React from "react";
import Login from "./pages/Layouts/Login";
import Admin from "./pages/Layouts/Admin";
import User from "./pages/Layouts/User";
import Alumnos from "./pages/Layouts/Admin/Alumnos/Alumnos";
import Talleres from "./pages/Layouts/Admin/Talleres/Talleres";
import Horarios from "./pages/Layouts/Usuarios/Horarios";
import Clases from "./pages/Layouts/Usuarios/Clases";
import Snackbars from "./components/Snackbars";
import Maestros from "./pages/Layouts/Admin/Maestros/Maestros";
// import Cargando from "./pages/Layouts/Cargando";

function App() {
  // const { message } = useContext(context);
  // const { open } = useContext(context);
  // const { handleClose } = useContext(context);
  return (
    <>
      <Provider>
        <ThemeProvider theme={theme}>
          <div>
            <div
              style={{
                backgroundImage: `url(${background})`,
                // "linear-gradient(green, white)"
                fontFamily: "Alumni Sans Pinstripe",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                position: "fixed",
                height: "100vh",
                width: "100vw",
                zIndex: -1,
                backgroundSize: "cover",
                objectFit: "scale-down",
              }}
            ></div>
            <CssBaseline />

            <Snackbars />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/user/inicio" element={<User />} />
                <Route path="/admin/inicio" element={<Admin />} />
                <Route path="/admin/alumnos" element={<Alumnos />} />
                <Route path="/admin/talleres" element={<Talleres />} />
                <Route path="/user/clases" element={<Clases />} />
                <Route path="/user/horarios" element={<Horarios />} />
                <Route path="/admin/maestros" element={<Maestros />} />
              </Routes>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
