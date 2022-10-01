/* eslint-disable */
import { useEffect, useState, useContext } from "react";
import logo from "../logo.svg";
import MiniPlayer from "../components/mini-player";
import { CONTROLS, POSITION } from "../components/mini-player";
import Player from "../components/Player";
import Layouts from "../components/Layouts";
import { VdoTokContext } from "../contexts/VdoTokContextProvider";

// import "./App.css";
const STREAM_PLAYBACK_URL = "";

function Home() {
  const {
    changeStatus,
    endCall,
    makeCall,
    acceptCall,
    Role,
    callInProgress,
    callReceived,
  } = useContext(VdoTokContext);

  const callReceivedModal = () => {
    return (
      <div>
        <h1 style={{ color: "green" }}>Call Received:</h1>
        <button
          onClick={() => acceptCall()}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Accept
        </button>
      </div>
    );
  };

  const renderVideos = () => {
    return (
      <div className="App">
        <p>Your video:</p>
        {/* <Player streamUrl={STREAM_PLAYBACK_URL}></Player> */}
        {/* <MiniPlayer
          streamUrl={STREAM_PLAYBACK_URL}
          controls={[CONTROLS.resize, CONTROLS.close, CONTROLS.mute]}
          position={POSITION.bottomRight}
          transition
        /> */}
        <video
          autoPlay
          muted
          controls
          id="localVideo"
          style={{ height: 200, width: 200, border: "1px solid red" }}
        ></video>
        <div>
          <p>Remote video:</p>
          <video
            autoPlay
            muted
            controls
            id="remoteVideo"
            style={{ height: 200, width: 200, border: "1px solid green" }}
          ></video>
        </div>
        {/* {[...Array(20)].map((_, i) => (
          <div className="App-contentPlaceholder" key={i} />
        ))} */}
      </div>
    );
  };

  return (
    <Layouts>
      {/* <h1>Welcome to VDOTOK demo in React</h1> */}
      {/* {renderVideos()} */}

      {Role === "caller" ? (
        <>
          {callInProgress ? (
            <>
              {/* <h3>Call in progress </h3> */}

              <button onClick={() => endCall()} className="endCallButton">
                End Call
              </button>
            </>
          ) : (
            <>
              {/* <h3>
                You are Caller ! please click on make call button to call second
                user.
              </h3> */}

              <button onClick={() => makeCall()} className="makeCallButton">
                MAKE CALL
              </button>
            </>
          )}
          {/* {renderVideos()} */}
        </>
      ) : Role === "receiver" ? (
        <>
          {callInProgress ? (
            <>
              {/* <h3>Call in progress </h3> */}

              <button onClick={() => endCall()} className="endCallButton">
                End Call
              </button>
            </>
          ) : (
            <h3>You are Reciever ! please wait for a call from caller.</h3>
          )}
          {callReceived && <>{callReceivedModal()}</>}
          {/* {renderVideos()} */}
        </>
      ) : (
        <>
          {/* <h3>Please select a Role :</h3> */}
          <button
            onClick={() => changeStatus("caller")}
            style={{ marginRight: 20 }}
          >
            Caller
          </button>
          <button onClick={() => changeStatus("receiver")}>Receiver</button>
        </>
      )}
    </Layouts>
  );
}

export default Home;
