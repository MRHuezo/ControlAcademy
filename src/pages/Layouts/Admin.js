import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { context } from "../../Provider";
import Navbar from "../../components/NavbarAdmin";
import Cargando from "./Cargando";

function Admin() {
  const { loading } = useContext(context);
  const datosUsuario = JSON.parse(localStorage.getItem("decoded"));
  const token = localStorage.getItem("token");
  const divisiones = datosUsuario.nombre.split(" ", 3);

  if (token === null) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <Cargando />
      ) : (
        <div
          style={{
            fontFamily: "Alumni Sans Pinstripe",
            color: "white",
            fontSize: "5em",
          }}
        >
          BIENVENIDO{` ${divisiones[0]}`}
        </div>
      )}
    </>
  );
}

export default Admin;
