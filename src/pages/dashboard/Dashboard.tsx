import "./Dashboard.css";
import DashboardTabs from "@/layouts/DashboardTabs";
import Success from "@/components/Success/Success";
import { Outlet } from "react-router";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <DashboardTabs />
      <Outlet />
      <Success />
    </div>
  );
}
