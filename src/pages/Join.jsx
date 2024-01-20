import React from "react";
import JoinRoomForm from "../components/JoinRoomForm";

const Join = () => {
  return (
    <div className="relative h-screen grid place-content-center">
      <JoinRoomForm />

      {/* gradient background */}
      <div className="w-[800px] h-screen rounded-[999px] absolute top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" />

      <div className="w-[800px] h-screen rounded-[999px] absolute top-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-red-200 via-gray-200 to-blue-200" />
    </div>
  );
};

export default Join;
