import { ui } from "@/components/ui/index";
import { useNavigate } from "react-router";
import { addUserData } from "@/firebase/fireBaseAuth.service";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import type { RegisterFormInput } from "@/types/auth.types";
import { useError } from "@/hooks/useError";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema } from "@/schemas/auth.schema";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import "./Form.css";
import type { TUser } from "@/types/user.types";

export default function SignUp() {
  const { handleError } = useError();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerUserSchema),
  });

  useEffect(() => {
    console.log("errors =", errors);
    handleError(errors);
  }, [errors]);

  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
    
    const userData: TUser = {
      ...data,
      id: nanoid(),
      role: "user",
    };

    navigate("/form/login");
    addUserData(userData);
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

      <ui.Button disabled={isSubmitting} variant="secondary" type="submit">
        {isSubmitting ? <ui.Spinner /> : "Create Account"}
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
