import React, { useState, createContext } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

import useAgora from "../hooks/useAgora";

export const AgoraContext = createContext();

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

const AgoraContextProvider = ({ children }) => {
  const [appid, setAppid] = useState("84f626584f944be28bede1436324d7ae");
  const [token, setToken] = useState(
    "00684f626584f944be28bede1436324d7aeIABOzM2zKKQY9weZJxrvPCQ1z8Ke8YvfjCsedyuOgXgmFYxxVyIAAAAAEACGukDPymzzYgEAAQDJbPNi"
  );
  const [channel, setChannel] = useState("Rupana");
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client);
  //   console.log({ remoteUsers });

  return (
    <AgoraContext.Provider
      value={{
        appid,
        token,
        channel,
        localAudioTrack,
        localVideoTrack,
        leave,
        join,
        joinState,
        remoteUsers,
        client,
      }}
    >
      {children}
    </AgoraContext.Provider>
  );
};
export default AgoraContextProvider;
