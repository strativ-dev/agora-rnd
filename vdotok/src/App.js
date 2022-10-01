/* eslint-disable */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import VdoTokContextProvider from "./contexts/VdoTokContextProvider";
import WrapperPlayer from "./components/WrapperPlayer";

import "./App.css";

function App() {
  return (
    <VdoTokContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
        <WrapperPlayer />
      </BrowserRouter>
    </VdoTokContextProvider>
  );
}

export default App;
