import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { type ChangeEvent, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import Header from "../components/Header";
import Input from "../components/Input";
import Row from "../components/Row";
import useFetch from "../utils/useFetch";
gsap.registerPlugin(useGSAP);

interface Project {
  id: number;
  title: string;
  description: string;
}

function Dashboard() {
  // gerer le form
  const [formInput, setFormInput] = useState({ title: "", description: "" });

  // fetch les donné de l api et remplacer projectsData
  const { data } = useFetch<Project>("http://localhost:3310/api/v1/projects");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (!formInput.title.trim()) {
      alert("Must have a title");
      return;
    }
    const newProject = {
      title: formInput.title,
      description: formInput.description,
    };
    try {
      const res = await fetch("http://localhost:3310/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newProject),
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la création du projet");
      }
    } catch (error) {
      console.error("Erreur POST:", error);
      alert("Impossible de créer le projet");
    }

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
        {data.map((project, i) => (
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
