import "./DashboardTabs.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardTabs() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("meetings");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    if (value === "meetings") {
      navigate("/dashboard/meetings");
    } else if (value === "bookings") {
      navigate("/dashboard/bookings");
    }
  };

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => handleTabChange(value)}
      className="dashboard-tabs"
    >
      <TabsList className="dashboard-tabs-list">
        <TabsTrigger
          className={`dashboard-tabs-trigger ${
            selectedTab === "meetings" ? "dashboard-tabs-trigger-active" : ""
          }`}
          value="meetings"
        >
          Meeting Rooms
        </TabsTrigger>
        <TabsTrigger
          className={`dashboard-tabs-trigger ${
            selectedTab === "bookings" ? "dashboard-tabs-trigger-active" : ""
          }`}
          value="bookings"
        >
          Bookings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
