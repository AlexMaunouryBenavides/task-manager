import { CiSquarePlus } from "react-icons/ci";
import Header from "../components/Header";
import Input from "../components/Input";
import TaskContainer from "../components/TaskContainer";
import { useState } from "react";
import type { DragOverEvent } from "@dnd-kit/core";
import { useSensor, useSensors, PointerSensor, KeyboardSensor, closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
const data = [
  { id: "1", title: "User stories", status: "WAITING" },
  { id: "2", title: "Mockup", status: "IN PROGRESS" },
  { id: "3", title: "Controllers", status: "WAITING" },
  { id: "4", title: "Entities", status: "DONE" },
];

function Project() {
  const [tasks, setTasks] = useState(data);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overTask = tasks.find((t) => t.id === overId);

    const newStatus = overTask ? overTask.status : overId.toString();

    if (activeTask.status !== newStatus) {
      setTasks((prev) => {
        const activeIndex = prev.findIndex((t) => t.id === activeId);
        const updatedTasks = [...prev];

        updatedTasks[activeIndex] = { ...activeTask, status: newStatus };

        if (overTask) {
          const overIndex = prev.findIndex((t) => t.id === overId);
          return arrayMove(updatedTasks, activeIndex, overIndex);
        }

        return updatedTasks;
      });
    }
  };
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
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver}>
          {["WAITING", "IN PROGRESS", "DONE"].map((status) => (
            <TaskContainer key={status} id={status} title={status} tasks={tasks.filter((t) => t.status === status)} />
          ))}
        </DndContext>
      </div>
    </div>
  );
}

export default Project;
