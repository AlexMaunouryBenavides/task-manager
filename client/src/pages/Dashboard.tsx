import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { type ChangeEvent, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Header from "../components/Header";
import Input from "../components/Input";
import Row from "../components/Row";
gsap.registerPlugin(useGSAP);
// fake data
const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Personal portfolio built with React",
  },
  { id: 2, title: "E-commerce App", description: null },
  {
    id: 3,
    title: "Task Manager",
    description: "Simple task management API with Node.js",
  },
];

function Dashboard() {
  // gerer le form
  const [projects, setProjects] = useState(projectsData);
  const [formInput, setFormInput] = useState({ title: "", description: "" });
  console.log(projects);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formInput.title.trim()) {
      alert("Must have a title");
      return;
    }
    const newProject = {
      id: Date.now(),
      title: formInput.title,
      description: formInput.description,
    };
    setProjects([newProject, ...projects]);

    setFormInput({ title: "", description: "" });
  }
  // animation
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const container = useRef(null);
  useGSAP(
    () => {
      const details = gsap.utils.toArray<HTMLElement>(".acc");

      details.forEach((el, i) => {
        gsap.to(el, {
          height: openIndex === i ? "auto" : 0,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
        });
      });
    },
    { scope: container, dependencies: [openIndex] },
  );
  return (
    <div>
      <Header title="Dashboard" />
      {/* FORM */}
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-5">
            <button type="submit">
              <CiSquarePlus
                size={65}
                className="text-cyan-800 cursor-pointer"
              />
            </button>

            <Input
              name="title"
              value={formInput.title}
              onChange={handleChange}
              placeholder="your task"
            />
            <Input
              name="description"
              value={formInput.description}
              onChange={handleChange}
              placeholder="description"
            />
          </div>
        </form>
      </div>

      {/* rows container */}
      <div
        ref={container}
        className=" flex md:flex-col flex-wrap gap-2 align-middle  max-w-3xl m-auto"
      >
        {projects.map((project, i) => (
          <Row
            key={project.id}
            isOpen={openIndex === i}
            handlClick={() => setOpenIndex(openIndex === i ? null : i)}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
