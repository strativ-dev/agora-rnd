import React, { useState, useContext } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraContext } from "../contexts/AgoraContextProvider";
import Layouts from "../components/Layouts";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

function Call() {
  const { leave, join, joinState, appid, token, channel } =
    useContext(AgoraContext);

  return (
    <Layouts>
      <form className="call-form">
        {/* <label>
          AppID:
          <input type='text' name='appid' onChange={(event) => { setAppid(event.target.value) }}/>
        </label>
        <label>
          Token(Optional):
          <input type='text' name='token' onChange={(event) => { setToken(event.target.value) }} />
        </label>
        <label>
          Channel:
          <input type='text' name='channel' onChange={(event) => { setChannel(event.target.value) }} />
        </label> */}
        <div className="button-group">
          <button
            id="join"
            type="button"
            className="btn btn-primary btn-sm"
            disabled={joinState}
            onClick={() => {
              join(appid, channel, token);
            }}
          >
            Join
          </button>
          <button
            id="leave"
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!joinState}
            onClick={() => {
              leave();
            }}
          >
            Leave
          </button>
        </div>
      </form>
    </Layouts>
  );
}

export default Call;
