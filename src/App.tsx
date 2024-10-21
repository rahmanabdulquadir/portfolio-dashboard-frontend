import { Calendar, Home, Inbox, Magnet, Search, Settings, Text } from "lucide-react";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import { Outlet } from "react-router-dom";

function App() {
  const items = [
    {
      title: "Projects",
      url: "#",
      icon: Home,
    },
    {
      title: "Blog",
      url: "#",
      icon: Text,
    },
    {
      title: "Skill",
      url: "#",
      icon: Magnet,
    },
  ];

  return (
    <>
    <Dashboard/>
    <Outlet/>
      {/* <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <h3 className="text-lg">{item.title}</h3>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar> */}
    </>
  );
}

export default App;
