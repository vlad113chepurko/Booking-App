import "./Dashboard.css";
import DashboardTabs from "@/layouts/DashboardTabs";
import { Outlet } from "react-router";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <DashboardTabs />
      <Outlet />
    </div>
  );
}
