import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const JoinRoomForm = () => {
  const [userName, setUserName] = useState("");
  const [meetId, setMeetId] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-[28rem] min-h-48 bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg shadow-gray-400">
      {/* logo */}

      <h2
        id="logo"
        className="text-2xl font-extrabold mb-4 flex items-center gap-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        Code Collabo
      </h2>

      <form className="flex flex-col gap-2 text-sm">
        <input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="text"
          className="p-2 rounded-lg backdrop-blur-lg bg-gray-300/60 placeholder:text-gray-500 outline-none border-none text-black"
          placeholder="Enter your name *"
        />

        <input
          value={meetId}
          onChange={(e) => {
            setMeetId(e.target.value);
          }}
          type="text"
          className="p-2 rounded-lg backdrop-blur-lg bg-gray-300/60 text-black placeholder:text-gray-500 outline-none border-none"
          placeholder="Your room id *"
        />

        <button
          type="submit"
          className="bg-purple-500 p-2 rounded-lg text-white hover:bg-purple-400 transition-all"
          onClick={(e) => {
            e.preventDefault();
            if (userName.length === 0 || meetId.length === 0) {
              toast.error("Add your username & room ID!");
              return;
            }
            navigate(`/room/${meetId}`, {
              state: {
                userName,
              },
            });

            toast.success("Joined a room!");
          }}
        >
          Join Room
        </button>
      </form>

      <div className="flex justify-between items-center mt-5 text-sm">
        <p>Want to create a room?</p>
        <Link className="text-blue-600" to={"/"}>
          Create room
        </Link>
      </div>
    </div>
  );
};

export default JoinRoomForm;
