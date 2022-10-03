import React from "react";
import Lottie from "react-lottie";
import animationData from "../../components/loading.json";

function Cargando() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <Lottie
      options={defaultOptions}
      width={500}
      onLoopComplete={() => console.log("onLoopComplete")}
    />
  );
}

export default Cargando;
