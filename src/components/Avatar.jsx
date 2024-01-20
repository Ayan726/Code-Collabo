import React from "react";

const Avatar = ({ name }) => {
  return (
    <div className="rounded-full w-12 h-12 bg-gradient-to-br from-blue-400 to-pink-400 grid place-content-center cursor-default p-7">
      <span className="uppercase text-2xl text-white">
        {name.split(" ")[0][0] + (name.split(" ").length > 1
          ? name.split(" ")[1][0]
          : "")}
      </span>
    </div>
  );
};

export default Avatar;
