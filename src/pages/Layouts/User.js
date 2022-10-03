import { Navigate } from "react-router-dom";
import NavbarUser from "../../components/NavbarUser";

function Inicio() {
  const datosUsuario = JSON.parse(localStorage.getItem("decoded"));
  const token = localStorage.getItem("token");
  const divisiones = datosUsuario.nombre.split(" ", 3);
  if (token === null) {
    return <Navigate to="/" replace={true} />;
  }

  //   if (token) {
  //     return <Navigate to="/admin/inicio" replace={true} />;
  //   }

  return (
    <>
      <NavbarUser />
      <div
        style={{
          fontFamily: "Alumni Sans Pinstripe",
          color: "white",
          fontSize: "5em",
        }}
      >
        BIENVENIDO{` ${divisiones[0]}`}
      </div>
    </>
  );
}

export default Inicio;
