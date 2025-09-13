import { useEffect, useRef } from "react";

interface CameraViewProps {
  onClose: () => void;
}

const CameraView = ({ onClose }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const openCamera = async () => {
      try {
        console.log("Requesting camera access...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        console.log("Stream obtained:", stream);
        if (videoRef.current && !videoRef.current.srcObject) {
          console.log("Video element:", videoRef.current);
          videoRef.current.srcObject = stream;
          console.log("srcObject set");
        }
        streamRef.current = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        onClose();
      }
    };
    openCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center border-4 border-red-500 text-white text-2xl font-bold w-screen h-screen">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted // Mute to avoid feedback
        className="w-full h-full object-cover"
      />

    </div>
  );
};

export default CameraView;
