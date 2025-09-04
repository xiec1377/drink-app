import React from "react";

function Box({
  caption,
  onClick,
  children,
}: {
  caption?: string;
  children?: React.ReactNode;
}) {
  return (
    // <div className="rounded-md shadow-lg shadow-blue-500/50 border-2 border-blue-500/50 w-100 h-32 p-4">
    <div
      className="w-[50%] h-1/4 p-4 rounded-lg border-2 border-cyan-500/50 shadow-md transition-shadow duration-500 hover:shadow-[0_0_20px_4px_rgba(59,130,246,0.7)]"
      onClick={onClick}
    >
      <h1 className="text-xl font-cyber">{caption}</h1>
    </div>
  );
}

export default Box;
