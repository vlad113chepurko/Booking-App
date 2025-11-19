import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router";
import { useState } from "react";

import "./Form.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="form__signup"
    >
      <h1>Login</h1>
      <section className="form__section">
        <Label htmlFor="name">Name</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          value={name}
          id="name"
          type="text"
          placeholder="Name"
        />
      </section>
      <section className="form__section">
        <Label htmlFor="email">Email</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
          id="email"
          type="email"
          placeholder="Email"
        />
      </section>
      <section className="form__section">
        <Label htmlFor="password">Password</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={password}
          id="password"
          type="password"
          placeholder="Password"
        />
      </section>
      <Button variant="secondary" type="submit">
        Log in
      </Button>
      <section className="form__bottom">
        <Button
          className="text-amber-50"
          variant="link"
          onClick={() => navigate("/form/register")}
        >
          Create an account
        </Button>
      </section>
    </form>
  );
}
