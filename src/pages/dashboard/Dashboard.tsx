import DashboardTabs from "@/layouts/DashboardTabs";
import Success from "@/components/Success/Success";
import { Outlet } from "react-router";
export default function Dashboard() {
  return (
    <div
      className="
  flex flex-col items-center justify-center
  min-h-dvh
  bg-[#0a0a0a] text-white
  gap-5
  font-montserrat
"
    >
      <h1>Dashboard</h1>
      <DashboardTabs />
      <Outlet />
      <Success />
    </div>
  );
}
