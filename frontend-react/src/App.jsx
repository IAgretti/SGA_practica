import Alumnos from "./pages/Alumnos";
import Inicio from "./pages/Inicio";
import LayoutPpal from "./layouts/LayoutPpal";
import { Routes, Route } from "react-router-dom";
import FAQ from "./pages/FAQ";
import Docentes from "./pages/Docentes";
import Login from "./pages/Login";
import RutaProtegida from "./components/RutaProtegida";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RutaProtegida />}>
          <Route element={<LayoutPpal />}>
            <Route index element={<Inicio />} />
            <Route path="alumnos" element={<Alumnos />} />
            <Route path="docentes" element={<Docentes />} />
            <Route path="ayuda" element={<FAQ />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
