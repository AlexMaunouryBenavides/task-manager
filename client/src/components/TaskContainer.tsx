interface ITaskContainer {
  id: string;
  title: string;
  tasks: { id: string; title: string }[];
}
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskItem } from "./TaskItem";
import { useDroppable } from "@dnd-kit/core";

function TaskContainer({ id, title, tasks }: ITaskContainer) {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    <div ref={setNodeRef} className=" bg-cyan-800 flex flex-col py-5 w-100 max-h-screen min-h-[70vh] ">
      <div>
        <h2 className="text-blue-50 font-tm-title text-4xl text-center">{title}</h2>
      </div>

      <div>
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskItem key={task.id} id={task.id} title={task.title} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default TaskContainer;
