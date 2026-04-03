import { CopyIcon, Plus, Trash2Icon, Edit, PenIcon, Copy } from "lucide-react";
import React, { useEffect, useRef, useState, useTransition } from "react";
export default function Inputarea() {
  Trash2Icon;
  const [count, setCount] = useState(0);
  const [istask, setIs_task] = useState(false);
  const [task_list, setTask_list] = useState([]);
  const [isdatasaved, setisDatasaved] = useState(false);
  const [empty_val, set_emptyVal] = useState(false);
  const [task, setTask] = useState("");
  const [taskcount, setTaskCount] = useState(1);
  const Textarea = useRef("");
  const Handlechange = (event) => {
    let typed_Task = event.target.value;
    setTask(typed_Task);
    Textarea.current.focus;
  };

  useEffect(() => {
    let fetched_list = [];
    console.log("reloaded");
    for (let index = 0; index < localStorage.length; index++) {
      const data = localStorage.getItem(`${index}:- Task`);
      fetched_list.push(data);
    }
    console.log("task_list:-", task_list);
  });

  const Set_task = () => {
    if (task === "") {
      console.log("Please enter a valid input !");
      set_emptyVal(true);
    } else {
      setTaskCount(taskcount + 1);
      setIs_task(true);
      localStorage.setItem(`${taskcount}:- Task`, task);
      setTask_list([...task_list, task]);
      console.log("task_list:-", task_list);
      setTask("");
      set_emptyVal(false);
    }
  };

  const Deletetask = (event) => {
    console.log(event.target);

    console.log("working...");
  };

  const EditTask=()=>{
    
  }

  return (
    // contains the input, btn, and import mark option
    <div className="flex justify-center flex-col items-center space-y-5 ">
      {/* contains the text area */}
      <div className=" bg-white shadow-lg p-2 md:p-5 space-y-5 lg:w-1/2 w-full rounded-2xl ">
        {/* input + btn  */}
        <div className=" flex gap-2 ">
          <input
            onChange={Handlechange}
            ref={Textarea}
            value={task}
            type="text"
            placeholder="Add new task..."
            className={
              empty_val
                ? "border-red-500 w-full border p-3 rounded-2xl  outline-0"
                : "bg-slate-50 w-full border border-gray-200 p-3 rounded-2xl"
            }
          />
          {/* btn + icon */}
          <div
            onClick={Set_task}
            className="bg-blue-600 p-3 text-white font-semibold flex items-center justify-center w-28 rounded-2xl gap-2"
          >
            <Plus />
            <button>Add</button>
          </div>
          {/* btn +  icon */}
        </div>
        {/* input + btn  */}
        {/* mark as imp option */}
        <div className="flex gap-2">
          <input type="checkbox" className="" />
          <h1>Mark as important</h1>

          {/* <button onClick={FetchData}>Show</button> */}
        </div>
        {/* mark as imp option */}
      </div>
      {/* contains the text area */}
      {/* tasks div */}
      <div className="  overflow-y-auto h-100 w-full lg:w-1/2 space-y-2 ">
        <h1 className="capitalize text-2xl ">tasks</h1>
        {istask ? (
          task_list.map((data, i) => (
            // contains the task and options
            <div
              className=" bg-white gap-2 rounded-2xl p-5 shadow-lg flex justify-between items-center"
              key={i}
            >
              {/* chekbox and task text */}
              <div className="flex gap-2">
                <input type="checkbox" />
                <h1 className="">{data}</h1>
              </div>
              {/* chekbox and task text */}
              {/* contains the tasks btn */}
              <div className=" cursor-pointer flex gap-2">
                <div className="hover:bg-blue-50 rounded-lg transition ease-in duration-200 p-2">
                  <PenIcon onClick={EditTask} className="text-blue-600 h-5 w-5 " />
                </div>
                <div className="hover:bg-blue-50 rounded-lg transition ease-in duration-200 p-2">
                  <Copy className="text-blue-600 h-5 w-5 " />
                </div>
                <div
                  className="hover:bg-red-50 rounded-lg transition ease-in duration-200 p-2"
                  onClick={Deletetask}
                >
                  <Trash2Icon className="text-red-600 h-5 w-5 " />
                </div>
              </div>
              {/* contains the tasks btn */}
            </div>
            // contains the task and options
          ))
        ) : (
          <div className=" space-y-2">
            {" "}
            <h1 className="text-7xl ">📝</h1>
            <h1 className="text-slate-400 text-[16px] font-semibold ">
              No tasks yet
            </h1>
            <h1 className="text-slate-400 text-[14px]">
              Add your first task to get started
            </h1>
          </div>
        )}
      </div>
      {/* tasks div */}
    </div>
    // contains the input, btn, and import mark option
  );
}
