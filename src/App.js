/* eslint-disable */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Call from "./screens/Call";
// import VdoTokContextProvider from "./contexts/VdoTokContextProvider";
import AgoraContextProvider from "./contexts/AgoraContextProvider";
import WrapperPlayer from "./components/WrapperPlayer";

import "./App.css";

function App() {
  return (
    <AgoraContextProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Call />} />
          <Route path="about" element={<About />} />
        </Routes>
        <WrapperPlayer />
      </BrowserRouter>
    </AgoraContextProvider>
  );
}

export default App;
