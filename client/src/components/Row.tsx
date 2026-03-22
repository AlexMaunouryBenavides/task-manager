interface IRow {
  id?: number;
  title: string;
  description: string | null;
  isOpen: boolean;
  handlClick: () => void;
}
import { BsClockHistory } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";

function Row({ title, description, handlClick }: IRow) {
  return (
    <div className="cursor-pointer">
      <div
        onClick={handlClick}
        onKeyUp={handlClick}
        className="flex flex-col md:flex-row gap-10 bg-cyan-700 p-2 rounded-sm shadow-sm  text-blue-50"
      >
        <p>01.</p>
        <p className="w-48">{title}</p>
        <div className="flex items-center gap-2">
          <BsClockHistory />
          <p>27%</p>
        </div>

        <div className="flex items-center gap-2">
          <TbTargetArrow />
          <p>6 days</p>
        </div>

        <div className="bg-blue-50 rounded-sm text-sm  text-cyan-800 cursor-pointer shadow-lg p-2">
          Update
        </div>
        <div className="bg-blue-50 rounded-sm text-sm  text-cyan-800 cursor-pointer shadow-lg p-2">
          Delete
        </div>
      </div>
      {/* description */}
      <div className="acc cursor-pointer overflow-hidden px-4 h-0">
        <p>{description ?? "No description"}</p>
      </div>
    </div>
  );
}

export default Row;
