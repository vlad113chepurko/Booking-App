import { ui } from "@/components/ui/index";
import { useNavigate } from "react-router";
import { addUserData } from "@/firebase/fireBaseService";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import type { SubmitHandler } from "react-hook-form";
import "./Form.css";

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<{
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    id: string;
  }>();

  const onSubmit: SubmitHandler<{
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    id: string;
  }> = (data) => {
    data.id = nanoid();
    data.role = "user";
    console.log(data);
    addUserData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form__signup">
      <h1>Sign Up</h1>
      <section className="form__section">
        <ui.Label htmlFor="name">Name</ui.Label>
        <ui.Input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Name"
        />
      </section>
      <section className="form__section">
        <ui.Label htmlFor="email">Email</ui.Label>
        <ui.Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Email"
        />
      </section>
      <section className="form__section">
        <ui.Label htmlFor="password">Password</ui.Label>
        <ui.Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
        />
      </section>
      <ui.Button disabled={isLoading} variant="secondary" type="submit">
        {isLoading ? <ui.Spinner /> : "Create Account"}
      </ui.Button>
      <section className="form__bottom">
        <ui.Button
          className="text-amber-50"
          variant="link"
          onClick={() => navigate("/form/login")}
        >
          Already have an account?
        </ui.Button>
      </section>
    </form>
  );
}
