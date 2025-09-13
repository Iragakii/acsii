import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AsciiCamera from "./AsciiCamera";
import CameraView from "./CameraView";

const CameraPage = () => {
  const navigate = useNavigate();
  const [useAscii, setUseAscii] = useState(true);

  const handleClose = () => {
    navigate("/");
  };

  const toggleCameraMode = () => {
    setUseAscii(!useAscii);
  };

  return (
    <div className="relative w-full h-full">
   
      <button
        onClick={toggleCameraMode}
        style={{ position: "absolute", top: "47rem", left: "1rem", zIndex: 20, backgroundColor: "#22c55e", color: "green", padding: "0.4rem 1rem", borderRadius: "5rem", cursor: "pointer", fontWeight: "medium" }}
      >
        {useAscii ? "Normal Camera" : "ASCII Camera"}
      </button>
      {useAscii ? <AsciiCamera /> : <CameraView onClose={handleClose} />}
    </div>
  );
};

export default CameraPage;
