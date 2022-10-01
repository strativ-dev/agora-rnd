import React from "react";

function Player() {
  return (
    <video
      autoPlay
      muted
      controls
      id="localVideo"
      style={{ height: 200, width: 200, border: "1px solid red" }}
    ></video>
  );
}

export default Player;
