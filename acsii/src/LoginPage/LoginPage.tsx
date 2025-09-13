import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BackGroundLogin from "./BackGroundLogin";
import AsciiCamera from "./AsciiCamera";

const LoginPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    // Auto-open camera if coming from signup page
    if (searchParams.get("openModal") === "true") {
      setIsCameraOpen(true);
      // Clean up the URL parameter
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);



  return (
    <>
      <div className="overflow-y-hidden !h-screen">
        <section className="w-full h-screen relative overflow-hidden">
          <BackGroundLogin />
         

          {/* Camera trigger button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <button
              onClick={() => window.location.href = "/camera"}
              className="pointer-events-auto bg-[#000000] border-2 border-[#61dca3] text-[#61dca3] font-mono py-4 px-8 rounded-lg hover:bg-[#61dca3] !hover:text-black transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-[#61dca3]/50 text-xl cursor-pointer"
            >
              [ ACCESS TERMINAL ]
            </button>
          </div>

          {/* Camera view component */}
          {isCameraOpen && <AsciiCamera />}
        </section>
      </div>
    </>
  );
};

export default LoginPage;
