import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import { VdoTokContext } from "../contexts/VdoTokContextProvider";
import MiniPlayer from "./mini-player";
import { CONTROLS, POSITION } from "./mini-player";

const STREAM_PLAYBACK_URL =
  "https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.xJ2tVekwmMGd.m3u8";

function WrapperPlayer(props) {
  //   const location = useLocation();
  const { callInProgress, makeCall } = useContext(VdoTokContext);

  const [hasPlayer, setHasPlayer] = useState(false);

  //   useEffect(() => {
  //     if (callInProgress && location.pathname !== "/") {
  //       makeCall();
  //       setHasPlayer(true);
  //     } else {
  //       setHasPlayer(false);
  //     }
  //   }, [location, callInProgress]);
  //   console.log({ hasPlayer }, { callInProgress });
  //   if (!hasPlayer) return null;

  return (
    <>
      <MiniPlayer
        streamUrl={STREAM_PLAYBACK_URL}
        controls={[CONTROLS.resize, CONTROLS.close, CONTROLS.mute]}
        position={POSITION.bottomRight}
        transition
        idName="localVideo"
      />
      <MiniPlayer
        streamUrl={STREAM_PLAYBACK_URL}
        controls={[CONTROLS.resize, CONTROLS.close, CONTROLS.mute]}
        position={POSITION.bottomRight}
        transition
        idName="remoteVideo"
      />
    </>
  );
}

export default WrapperPlayer;
