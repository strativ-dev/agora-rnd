// import {
//   ILocalVideoTrack,
//   IRemoteVideoTrack,
//   ILocalAudioTrack,
//   IRemoteAudioTrack,
// } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";
import "./MiniPlayer.css";

// export interface VideoPlayerProps {
//   videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
//   audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
// }
const height = 154,
  width = 274;
const DEFAULT_POSITION = "auto";
const TRANSITION = "200ms ease-in-out";
const MediaPlayer = (props) => {
  const container = useRef(null);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);
  useEffect(() => {
    if (props.audioTrack) {
      props.audioTrack?.play();
    }
    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack]);
  return (
    <>
      <div className="MiniPlayer-videoBox">
        <div
          className={`MinPlayer-video small`}
          style={{
            top: DEFAULT_POSITION,
            right: DEFAULT_POSITION,
            bottom: DEFAULT_POSITION,
            left: DEFAULT_POSITION,
            width: `${width}px`,
            height: `${height}px`,
            transition: `height ${TRANSITION}, width ${TRANSITION}`,
          }}
        >
          <div
            ref={container}
            style={{
              width: "320px",
              height: "240px",
              position: "fixed",
              right: "25px",
              bottom: "50px",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default MediaPlayer;
