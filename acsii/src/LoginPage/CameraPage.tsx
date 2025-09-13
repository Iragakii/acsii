import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AsciiCamera from "./AsciiCamera";
import CameraView from "./CameraView";

const CameraPage = () => {
  const navigate = useNavigate();
  const [useAscii, setUseAscii] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check camera access when component mounts
    async function checkCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        // Stop the stream immediately after checking access
        stream.getTracks().forEach((track) => track.stop());
        setIsLoading(false);
      } catch (err) {
        console.error("Camera access error:", err);
        setCameraError(
          err instanceof Error
            ? err.message
            : "Camera access denied or not available"
        );
        setIsLoading(false);
      }
    }

    checkCamera();
  }, []);

  const handleClose = () => {
    navigate("/");
  };

  const toggleCameraMode = () => {
    setUseAscii(!useAscii);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>Checking camera access...</p>
      </div>
    );
  }

  if (cameraError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white gap-4">
        <p className="text-red-500">{cameraError}</p>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <button
        onClick={toggleCameraMode}
        className="absolute top-[47rem] left-4 z-20 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
      >
        {useAscii ? "Normal Camera" : "ASCII Camera"}
      </button>
      {useAscii ? <AsciiCamera /> : <CameraView onClose={handleClose} />}
    </div>
  );
};

export default CameraPage;
