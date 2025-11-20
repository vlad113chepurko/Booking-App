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
      className="w-full flex justify-center items-center p-3"
    >
      <TabsList
        className="
      flex items-center justify-center
      gap-3
      bg-neutral-800
      p-10
      rounded-2xl
      shadow-lg
    "
      >
        <TabsTrigger
          value="meetings"
          className="
          
        bg-neutral-900 text-white
        p-5
        rounded-xl
        transition-colors
        hover:bg-neutral-700
        data-[state=active]:bg-neutral-700
      "
        >
          Meeting Rooms
        </TabsTrigger>

        <TabsTrigger
          value="bookings"
          className="
        bg-neutral-900 text-white
        p-5
        rounded-xl
        transition-colors
        hover:bg-neutral-700
        data-[state=active]:bg-neutral-700
      "
        >
          Bookings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
