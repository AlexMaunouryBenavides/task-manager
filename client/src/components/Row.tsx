interface IRow {
  title: string;
}

function Row({ title }: IRow) {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:items-center md:align-baseline justify-start bg-cyan-700 p-2 rounded-sm shadow-sm  text-blue-50">
      <p>01.</p>
      <p className="md:w-32">{title}</p>

      <div>
        <img src="" alt="" />
        <p>27%</p>
      </div>

      <div>
        <img src="" alt="" />
        <p>6 days</p>
      </div>

      <div className="bg-blue-50 rounded-sm text-sm  text-cyan-800 cursor-pointer shadow-lg p-2">Update</div>
      <div className="bg-blue-50 rounded-sm text-sm  text-cyan-800 cursor-pointer shadow-lg p-2">Delete</div>
    </div>
  );
}

export default Row;
