import React, { useContext, useState } from "react";

// import { VdoTokContext } from "../contexts/VdoTokContextProvider";
// import MiniPlayer from "./mini-player";
// import { CONTROLS, POSITION } from "./mini-player";

import { AgoraContext } from "../contexts/AgoraContextProvider";
import MediaPlayer from "../components/MediaPlayer";

// const STREAM_PLAYBACK_URL = "https://3d26876b73d7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.913157848533.channel.xJ2tVekwmMGd.m3u8";

function WrapperPlayer(props) {
  // const { callInProgress, makeCall } = useContext(VdoTokContext);
  const { localAudioTrack, localVideoTrack, joinState, remoteUsers, client } =
    useContext(AgoraContext);
  console.log({ client });
  console.log({ remoteUsers });
  console.log({ joinState });

  client.enableAudioVolumeIndicator();
  client.on("volume-indicator", (volumes) => {
    volumes.forEach((volume, index) => {
      console.log(`${index} UID ${volume.uid} Level ${volume.level}`, volume);
    });
  });
  return (
    <>
      {/* <MiniPlayer
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
      /> */}

      <div className="player-container">
        <div className="local-player-wrapper">
          <p className="local-player-text">
            {localVideoTrack && `localTrack`}
            {joinState && localVideoTrack ? `(${client.uid})` : ""}
          </p>
          <MediaPlayer
            videoTrack={localVideoTrack}
            audioTrack={undefined}
          ></MediaPlayer>
        </div>
        {remoteUsers.map((user) => (
          <div className="remote-player-wrapper" key={user.uid}>
            <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
            ></MediaPlayer>
          </div>
        ))}
      </div>
    </>
  );
}

export default WrapperPlayer;
