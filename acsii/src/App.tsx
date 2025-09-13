import { BrowserRouter as Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import CameraPage from "./LoginPage/CameraPage";

function App() {
  return (

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/camera" element={<CameraPage />} />
      </Routes>

  );
}

export default App;
