import { ui } from "@/components/ui/index";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { loginUser } from "@/firebase/fireBaseService";
import type { SubmitHandler } from "react-hook-form";

import "./Form.css";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<{ email: string; password: string }>();

  const onSubmit: SubmitHandler<{
    email: string;
    password: string;
  }> = (data) => {
    console.log(data);
    loginUser(data.email, data.password).then((user) => {
      if (user) {
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form__signup">
      <h1>Login</h1>
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
        {isLoading ? <ui.Spinner /> : "Login"}
      </ui.Button>
      <section className="form__bottom">
        <ui.Button
          className="text-amber-50"
          variant="link"
          onClick={() => navigate("/form/register")}
        >
          Create an account
        </ui.Button>
      </section>
    </form>
  );
}
