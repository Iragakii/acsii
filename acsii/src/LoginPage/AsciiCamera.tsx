import { useEffect, useRef, useState } from "react";

const DEFAULT_CHAR_SET = "@%#*+=-:. "; // From dark to light

const AsciiCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ascii, setAscii] = useState<string>("");
  const [scale, setScale] = useState(8); // character size in pixels
  const [contrast, setContrast] = useState(1);
  const [invert, setInvert] = useState(false);
  const [charSet] = useState(DEFAULT_CHAR_SET);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsRunning(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setIsRunning(false);
      }
    };
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      setIsRunning(false);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const renderAscii = () => {
      if (!videoRef.current || !canvasRef.current) {
        animationFrameId = requestAnimationFrame(renderAscii);
        return;
      }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameId = requestAnimationFrame(renderAscii);
        return;
      }

      // Use window innerWidth and innerHeight to fill full screen
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(renderAscii);
        return;
      }

      // Set canvas size to scaled down window size with increased width
      canvas.width = Math.floor(width / (scale * 0.8));
      canvas.height = Math.floor(height / scale);

      // Draw video frame to canvas scaled down to canvas size
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      let asciiStr = "";
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const offset = (y * canvas.width + x) * 4;
          const r = pixels[offset];
          const g = pixels[offset + 1];
          const b = pixels[offset + 2];

          // Calculate luminance
          let lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

          // Apply contrast
          lum = ((lum - 128) * contrast) + 128;

          // Clamp
          lum = Math.min(255, Math.max(0, lum));

          // Invert if needed
          if (invert) {
            lum = 255 - lum;
          }

          // Map luminance to character
          const charIndex = Math.floor((lum / 255) * (charSet.length - 1));
          asciiStr += charSet.charAt(charIndex);
        }
        asciiStr += "\n";
      }

      setAscii(asciiStr);

      animationFrameId = requestAnimationFrame(renderAscii);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(renderAscii);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning, scale, contrast, invert, charSet]);

  // Add window resize listener to re-render on resize
  useEffect(() => {
    const handleResize = () => {
      // Trigger re-render by updating ascii state to empty string temporarily
      setAscii("");
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="ascii-camera-container" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", color: "lime", backgroundColor: "black", fontFamily: "monospace", whiteSpace: "pre", fontSize: `${scale}px`, lineHeight: `${scale}px`, userSelect: "none", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <pre style={{ margin: 0, padding: 0 }}>{ascii}</pre>

      <div style={{ position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(0,0,0,0.7)", padding: "0.5rem", borderRadius: "0.5rem" }}>
        <label>
          Scale:
          <input type="range" min="4" max="16" value={scale} onChange={(e) => setScale(Number(e.target.value))} />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          Contrast:
          <input type="range" min="0.5" max="3" step="0.1" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} />
        </label>
        <label style={{ marginLeft: "1rem" }}>
          Invert:
          <input type="checkbox" checked={invert} onChange={(e) => setInvert(e.target.checked)} />
        </label>
       
      </div>
    </div>
  );
};

export default AsciiCamera;
