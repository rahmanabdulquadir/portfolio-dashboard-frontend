import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="flex">
            <Dashboard />
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}

export default App;