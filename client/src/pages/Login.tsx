import { Link, useNavigate } from "react-router";
import login from "../assets/images/login.webp";
import FormBtn from "../components/FormBtn";
import Input from "../components/Input";
import { useAuth } from "../utils/AuthProvider";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3310/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      console.log("login failed");
      return;
    }
    const mesRes = await fetch("http://localhost:3310/api/v1/me", {
      method: "GET",
      credentials: "include",
    });
    const user = await mesRes.json();

    setUser(user);
    navigate("/dashboard");
  };
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between max-h-screen">
      <img src={login} alt="login warrior img" className="max-h-screen w-auto flex-1 object-cover" />
      <div className="flex-1 flex flex-col gap-10 items-center justify-between py-5 md:h-75">
        <div className="max-w-150">
          <h1 className="font-tm-title text-5xl md:text-[64px] text-center">Take your tasks and work</h1>
        </div>

        <div>
          <Link to={"/register"}>
            <div className="my-2 w-fit bg-cyan-800 text-blue-50 rounded-sm shadow-lg py-1 px-2 text-[12px] cursor-pointer">Register</div>
          </Link>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-5"
          >
            <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormBtn type="submit">Login</FormBtn>
          </form>
        </div>
      </div>
    </section>
  );
};
