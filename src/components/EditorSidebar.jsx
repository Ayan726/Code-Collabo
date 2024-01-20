import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { IoCopy } from "react-icons/io5";
import useClientStore from "../store/store";
import toast from "react-hot-toast";

const EditorSidebar = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const clients = useClientStore((state) => state.clients);

  return (
    <aside className="bg-white/40 backdrop-blur-md h-screen md:w-1/4 w-[40%] p-6 relative border-r border-blue-400">
      {/* logo */}
      <h2
        id="logo"
        className="lg:text-3xl md:text-2xl text-xl  font-extrabold flex items-center gap-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        Code Collabo
      </h2>
      <hr className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[3px] my-4" />

      <h3 className="text-lg text-blue-600 mb-3 font-bold">Participants</h3>
      <div className="flex flex-col justify-between md:h-[85%] h-[80%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full overflow-y-auto">
          {clients.map((client, ind) => (
            <Avatar name={client.userName} key={`client-${ind}`} />
          ))}
        </div>

        <div>
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(roomId);
                toast.success("Room ID has been copied!");
              } catch (err) {
                toast.error("Something went wrong!");
              }
            }}
            className="bg-blue-400 p-2 rounded-lg text-white hover:bg-blue-300 transition-all flex justify-center items-center gap-2 w-full md:text-base text-sm"
          >
            <IoCopy className="text-lg" />
            Room ID
          </button>

          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-purple-500 p-2 my-3 rounded-lg text-white hover:bg-purple-400 transition-all w-full md:text-base text-sm"
          >
            Leave Room
          </button>
        </div>
      </div>
    </aside>
  );
};

export default EditorSidebar;
