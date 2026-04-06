import {
  Plus,
  Trash2Icon,
  PenIcon,
  Copy,
  ChevronsLeftIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
export default function Inputarea() {
  // ----- states -----
  const [istask, setIs_task] = useState(false);
  const [hasedited, setHasEdited] = useState(false);
  const [task_list, setTask_list] = useState([]);
  const [empty_val, set_emptyVal] = useState(false);
  const [task, setTask] = useState("");
  const [taskcount, setTaskCount] = useState(1);
  const [editindex, setEditedIndex] = useState();
  // ----- states -----

  //  updates the input's value on every change in the input
  const Handlechange = (event) => {
    let typed_Task = event.target.value;
    setTask(typed_Task);
  };
  //  updates the input's value on every change in the input

  // stops the list from being shown on ui when there are no tasks
  useEffect(() => {
    if (task_list.length === 0) {
      setIs_task(false);
    }
  }, [task_list]);
  // stops the list from being shown on ui when there are no tasks

  // saves data to local storage
  const SaveToLocalStorage = () => {
    const updatedlist = [...task_list, task];
    localStorage.setItem("Task", JSON.stringify(updatedlist));
  };
  // saves data to local storage

  // manages the ui state through refreshes
  useEffect(() => {
    if (localStorage.getItem("Task")) {
      const FetchData = localStorage.getItem("Task");
      const convert = JSON.parse(FetchData);
      setIs_task(true);
      setTask_list(convert);
    }
  }, []);
  // manages the ui state through refreshes

  //  adds the task to the ui
  const AddTaskToUI = () => {
    try {
      // stops empty value
      if (task !== "" && hasedited !== true) {
        setTaskCount(taskcount + 1);
        setIs_task(true);
        setTask_list([...task_list, task]);
        SaveToLocalStorage();
        set_emptyVal(false);
        console.log("new task added");
      }

      if (hasedited === true) {
        const editedList = [...task_list];
        console.log("this was an edit attempt");
        editedList[editindex] = task;
        console.log(editedList);
        setTask_list(editedList);
        const ConvertToJson = JSON.stringify(editedList);
        localStorage.setItem("Task", ConvertToJson);
        setHasEdited(false);
      }

      if (task === "") {
        set_emptyVal(true);
      }

      setTask("");
    } catch (error) {
      console.log(`Error occured:- ${error}`);
    }
  };

  const Deletetask = (index, value) => {
    const local = localStorage.getItem(`Task`);
    const ConvertObj = JSON.parse(local);

    const FilteredList = ConvertObj.filter((_, delete_index) => {
      return index !== delete_index;
    });

    const StoreFilteredList = JSON.stringify(FilteredList);
    localStorage.setItem("Task", StoreFilteredList);
    setTask_list(FilteredList);
  };

  const CopyTask = async (index, value) => {
    const TextToCopy = task_list[index];
    await navigator.clipboard.writeText(TextToCopy);
    console.log("Copied")
  };

  //  edits the tasks
  const EditTask = (index, value) => {
    try {
      setTask(value);
      setHasEdited(true);
      setEditedIndex(index);
    } catch (error) {
      console.log(`Error occured:- ${error}`);
    }
  };

  return (
    // contains the input, btn, and import mark option
    <div className="flex justify-center flex-col items-center space-y-5 ">
      {/* contains the text area */}
      <div className=" bg-white shadow-lg p-2 md:p-5 space-y-5 lg:w-1/2 w-full rounded-2xl ">
        {/* input + btn  */}
        <div className=" flex gap-2 ">
          <input
            onChange={Handlechange}
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
            onClick={AddTaskToUI}
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
          <button
            onClick={() => {
              fn();
            }}
          >
            Show
          </button>

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
                <div
                  onClick={() => EditTask(i, data)}
                  className="hover:bg-blue-50 rounded-lg transition ease-in duration-200 p-2"
                >
                  <PenIcon className="text-blue-600 h-5 w-5 " />
                </div>
                <div
                  onClick={() => CopyTask(i, data)}
                  className="hover:bg-blue-50 rounded-lg transition ease-in duration-200 p-2"
                >
                  <Copy className="text-blue-600 h-5 w-5 " />
                </div>
                <div
                  className="hover:bg-red-50 rounded-lg transition ease-in duration-200 p-2"
                  onClick={() => Deletetask(i, data)}
                >
                  <Trash2Icon className="text-red-600 h-5 w-5 " />
                </div>
              </div>
              {/* contains the tasks btn */}
              {/* // contains the task and options */}
            </div>
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
