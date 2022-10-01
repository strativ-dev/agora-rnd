import React, { useState, createContext } from "react";

export const VdoTokContext = createContext();
const VdoTokContextProvider = ({ children }) => {
  //Important note !
  //we are using static users data,project_id,host etc you will get this dynamically after authenticating from VDOTOK server
  console.log({ window });

  const [userOneData] = useState({
    authorization_token: "5b0d8696776f465c3649d5a5dc9989de",
    bytes_interval: 60,
    media_server_map: {
      complete_address: "wss://signalling.vdotok.com:8443/call",
      end_point: "call",
      host: "signalling.vdotok.com",
      port: "8443",
      protocol: "wss",
    },
    message: "Success",
    messaging_server_map: {
      complete_address: "wss://messaging1.vdotok.com:443",
      host: "messaging1.vdotok.com",
      port: "443",
      protocol: "wss",
    },
    process_time: 41,
    ref_id: "069477ddce23ee176e6e022a4cc73b89",
  });
  const [userTwoData] = useState({
    authorization_token: "8b0b9fe67398dec49fcda3a3c8f2e7d5",
    bytes_interval: 60,
    media_server_map: {
      complete_address: "wss://signalling.vdotok.com:8443/call",
      end_point: "call",
      host: "signalling.vdotok.com",
      port: "8443",
      protocol: "wss",
    },
    message: "Success",
    messaging_server_map: {
      complete_address: "wss://messaging1.vdotok.com:443",
      host: "messaging1.vdotok.com",
      port: "443",
      protocol: "wss",
    },
    ref_id: "6860191b117e96185af600e73b30a902",
  });
  const [Client, setClient] = useState(null);
  const [Role, SetRole] = useState(null);
  const [callReceived, setCallReceived] = useState(false);
  const [callInProgress, setCallInProgress] = useState(false);

  const project_id = "1KMMRG";
  const host = userOneData.media_server_map.complete_address;

  const onCallReceived = () => {
    setCallReceived(true);
  };

  const initiateSdk = (data) => {
    let VClient = new window.CVDOTOK.Client({
      projectID: project_id,
      host: host,
    });
    VClient.on("connected", (res) => {
      console.log("VDOTOK sdk connected");
      VClient.Register(
        data.ref_id.toString(),
        data.authorization_token.toString()
      );
    });
    VClient.on("call", (response) => {
      console.log("Event in call-->", response);
      //     call_type: "video"
      // from: "9da9b2096f944245e77e0d948544d3a1"
      // message: "Received a call"
      // session: "one_to_one"
      // type: "CALL_RECEIVED"
      if (response.type === "CALL_RECEIVED") {
        onCallReceived();
      }
      if (response.type === "CALL_ENDED") {
        setCallReceived(false);
        setCallInProgress(false);
      }
      if (response.type === "MISSED_CALL") {
        setCallReceived(false);
        setCallInProgress(false);
      }
    });
    setClient(VClient);
  };

  const acceptCall = () => {
    setCallReceived(false);
    setCallInProgress(true);
    console.log("->", Client);

    Client.AcceptCall(
      document.getElementById("localVideo"),
      document.getElementById("remoteVideo")
    );
  };

  const makeCall = () => {
    let userToCall = userTwoData.ref_id;
    const params = {
      localVideo: document.getElementById("localVideo"),
      remoteVideo: document.getElementById("remoteVideo"),
      to: [userToCall], //ref_id of a user you want to call(provided by vdotok once user sigup on vdotok server)
    };
    console.log("this is param before startin a call->", params);
    Client.Call(params);
    setCallInProgress(true);
  };

  const endCall = () => {
    Client.EndCall();
    setCallInProgress(false);
  };
  const changeStatus = (status = null) => {
    SetRole(status);
    initiateSdk(status === "caller" ? userOneData : userTwoData);
  };

  return (
    <VdoTokContext.Provider
      value={{
        changeStatus: changeStatus,
        endCall: endCall,
        makeCall: makeCall,
        acceptCall: acceptCall,
        Role: Role,
        callInProgress: callInProgress,
        callReceived: callReceived,
      }}
    >
      {children}
    </VdoTokContext.Provider>
  );
};
export default VdoTokContextProvider;
