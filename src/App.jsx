import React from "react";
import { Plus } from "lucide-react";
import Textarea from "../src/components/Textarea.jsx";
export default function App() {
  return (
    // parent div
    <div className="min-h-screen space-y-5 bg-linear-to-br from-slate-100 via-blue-100 to-indigo-100 py-5 text-center">
      <h1 className="text-blue-600 font-semibold text-2xl ">TaskDroid</h1>{" "}
      {/* app name */}
      <h1 className="text-slate-600">Stay organized and productive</h1>{" "}
      {/*  tagline */}
      {/* contains text area */}
      <div className="py-5 px-2">
        <Textarea />
      </div>
      {/* contains text area */}
      {/* founder featuring */}

      {/* <div className=" absolute w-screen bottom-2">
        <h1 className="text-black capitalize font-semibold  text-center">
          abhinav productions
        </h1>
      </div> */}

      {/* founder featuring */}
    </div> // parent div
  );
}
