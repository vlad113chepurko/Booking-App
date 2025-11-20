import { ui } from "@/components/ui/index";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { loginUser } from "@/firebase/fireBaseAuth.service";
import type { SubmitHandler } from "react-hook-form";
import type { LoginUserInput } from "@/types/auth.types";
import "./Form.css";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginUserInput>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginUserInput> = async (data) => {
    try {
      const user = await loginUser(data.email, data.password);
      if (user) {
        navigate("/dashboard");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error(err);
    }
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

      <ui.Button disabled={isSubmitting} variant="secondary" type="submit">
        {isSubmitting ? <ui.Spinner /> : "Login"}
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
