import React, { useEffect, useRef } from "react";
import { ACTIONS } from "../../Actions";
import EditorSidebar from "../components/EditorSidebar";
import EditorTextarea from "../components/EditorTextarea";
import { initSocket } from "../socket";

import toast from "react-hot-toast";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useClientStore from "../store/store";

const Editor = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const setClients = useClientStore((state) => state.setClients);
  const removeClient = useClientStore((state) => state.removeClient);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later!");
        navigate("/");
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });

      // listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, userName, socketId }) => {
          if (userName !== location.state?.userName) {
            toast.success(`${userName} joined the room`);
          }
          // console.log(clients);
          setClients(clients);
        }
      );

      // listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.success(`${userName} left the room.`);
        removeClient(socketId);
      });
    };
    init();
    return () => {
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.disconnect();
    };
  }, []);

  if (!location.state) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="relative h-screen flex">
      <EditorSidebar />
      <EditorTextarea
        socketRef={socketRef}
        roomId={roomId}
      />

      {/* gradient background */}
      <div className="w-[800px] h-screen rounded-[999px] absolute top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" />

      <div className="w-[800px] h-screen rounded-[999px] absolute top-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-red-200 via-gray-200 to-blue-200" />
    </div>
  );
};

export default Editor;
