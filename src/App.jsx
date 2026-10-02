import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Portfolio from "./pages/Portfolio";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED BUILDER */}
        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          }
        />

        {/* DEFAULT PORTFOLIO */}
        <Route
          path="/portfolio"
          element={<Portfolio />}
        />

        {/* SHOWCASE PROFILES */}
        <Route
          path="/user/:username"
          element={<Portfolio />}
        />

        {/* VANITY URL */}
        <Route
          path="/:username"
          element={<Portfolio />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;