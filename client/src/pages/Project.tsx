import { CiSquarePlus } from "react-icons/ci";
import Header from "../components/Header";
import Input from "../components/Input";
import TaskContainer from "../components/TaskContainer";

function Project() {
  return (
    <div>
      <Header title="Nike" />

      {/* FORM */}
      <div className="flex justify-center">
        <form>
          <div className="flex items-center">
            <CiSquarePlus size={65} className="text-cyan-800 cursor-pointer " />
            <Input placeholder="your task" />
          </div>
        </form>
      </div>

      {/* CONTAINER */}
      <div className="flex flex-col md:flex-row items-center gap-2.5 justify-center m-auto max-w-[90%]">
        <TaskContainer />
        <TaskContainer />
        <TaskContainer />
      </div>
    </div>
  );
}

export default Project;
