import "./Form.css";
import { Outlet } from "react-router";
import Error from "@/components/Error/Error";
export default function Form() {
  return (
    <div className="form">
      <div className="form__container">
        <Outlet />
        <Error />
      </div>
    </div>
  );
}
