import { Link } from "react-router";
import register from "../assets/images/register.webp";
import FormBtn from "../components/FormBtn";
import Input from "../components/Input";

export default function Register() {
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

          <form className="flex flex-col gap-5">
            <Input placeholder="email" />
            <Input placeholder="password" />
            <FormBtn>Login</FormBtn>
          </form>
        </div>
      </div>
    </section>
  );
}
