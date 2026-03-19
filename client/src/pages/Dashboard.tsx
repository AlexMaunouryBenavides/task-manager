import { CiSquarePlus } from "react-icons/ci";
import Header from "../components/Header";
import Input from "../components/Input";
import Row from "../components/Row";

function Dashboard() {
  return (
    <div>
      <Header title="Dashboard" />

      {/* FORM */}
      <div className="flex justify-center">
        <form>
          <div className="flex items-center gap-5">
            <CiSquarePlus size={65} className="text-cyan-800 cursor-pointer " />
            <Input placeholder="your task" />
            <Input placeholder="project deadline" />
          </div>
        </form>
      </div>

      {/* rows container */}
      <div className="flex md:flex-col flex-wrap gap-2 align-middle  max-w-2xl m-auto">
        <Row title="Nike" />
        <Row title="Amazon" />
        <Row title="Facebook" />
      </div>
    </div>
  );
}

export default Dashboard;
