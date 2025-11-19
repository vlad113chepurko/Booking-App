import "./Form.css";
import { Outlet } from "react-router";
export default function Form() {
  return (
    <div className="form">
      <div className="form__container">
        <Outlet />
      </div>
    </div>
  );
}
