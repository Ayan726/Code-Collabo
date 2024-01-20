import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { IoCopy } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateRoomForm = () => {
  const [userName, setUserName] = useState("");
  const meetId = useRef(uuid());
  const navigate = useNavigate();

  return (
    <div className="w-[28rem] min-h-48 bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg shadow-gray-400">
      {/* logo */}
      <div className="mb-4 flex items-center gap-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h2 id="logo" className="text-2xl font-extrabold">
          Code Collabo
        </h2>
      </div>

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
          value={`${meetId.current}`}
          type="text"
          className="p-2 rounded-lg backdrop-blur-lg bg-gray-300/60 text-black placeholder:text-gray-500 outline-none border-none "
          readOnly
          placeholder="Your room id *"
        />

        <button
          className="bg-blue-400 p-2 rounded-lg text-white hover:bg-blue-300 transition-all flex justify-center items-center gap-2"
          onClick={async (e) => {
            e.preventDefault();
            try {
              await navigator.clipboard.writeText(meetId.current);
              toast.success("Room ID has been copied!");
            } catch (err) {
              toast.error("Something went wrong!");
            }
          }}
        >
          <IoCopy className="text-lg" />
          Copy Room ID
        </button>

        <button
          type="submit"
          className="bg-purple-500 p-2 rounded-lg text-white hover:bg-purple-400 transition-all"
          onClick={(e) => {
            e.preventDefault();
            if (!userName || userName.length === 0) {
              toast.error("Add your username!");
              return;
            }
            navigate(`/room/${meetId.current}`, {
              state: {
                userName,
              },
            });
            toast.success("Created a room!");
          }}
        >
          Create Room
        </button>
      </form>

      <div className="flex justify-between items-center mt-5 text-sm">
        <p>Already have a Room ID?</p>
        <Link className="text-blue-600" to={"/join"}>
          Join room
        </Link>
      </div>
    </div>
  );
};

export default CreateRoomForm;
