import { Link, useNavigate } from "react-router";
import register from "../assets/images/register.webp";
import FormBtn from "../components/FormBtn";
import Input from "../components/Input";
import { useState } from "react";

export default function Register() {
   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [lastname, setLastname] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const handleRegister = async () => {
      const res = await fetch("http://localhost:3310/api/v1/register", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         credentials: "include",
         body: JSON.stringify({ name, lastname, email, password }),
      });

      if (!res.ok) {
         console.log("register failed");
         return;
      }
      navigate("/login");
   };
   return (
      <section className="flex flex-col lg:flex-row items-center justify-between max-h-screen">
         <img
            src={register}
            alt="login warrior img"
            className="max-h-screen w-auto flex-1 object-cover"
         />
         <div className="flex-1 flex flex-col gap-10 items-center justify-between py-5 md:h-75">
            <div className="max-w-150">
               <h1 className="font-tm-title text-5xl md:text-[64px] text-center">
                  Take your tasks and work
               </h1>
            </div>

            <div>
               <Link to={"/"}>
                  <div className="my-2 w-fit bg-cyan-800 text-blue-50 rounded-sm shadow-lg py-1 px-2 text-[12px] cursor-pointer">
                     Login
                  </div>
               </Link>

               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleRegister();
                  }}
                  className="flex flex-col gap-5"
               >
                  <Input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="name"
                  />
                  <Input
                     value={lastname}
                     onChange={(e) => setLastname(e.target.value)}
                     placeholder="lastname"
                  />
                  <Input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="email"
                     type="email"
                  />
                  <Input
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     type="password"
                     placeholder="password"
                  />
                  <FormBtn type="submit">Login</FormBtn>
               </form>
            </div>
         </div>
      </section>
   );
}
