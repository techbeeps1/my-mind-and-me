
import { ReactNode } from "react";
import SidebarDashBoard from "./SidebarDashBoard";

import { useState } from "react";
import HeaderDashboard from "./header/HeaderDashboard";
type WrapperProps = {
  children: ReactNode;
};
export default function WrapperBanner({ children }: WrapperProps) {
  const [sideBarHide, setSideBarHide] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <main>
      <div className={`${collapsed ? "lg:ps-15" : "lg:ps-70"} transition-all duration-500 bg-cover bg-center bg-no-repeat min-h-screen `} style={{ backgroundImage: "url('/banner-bg.jpg')" }}>
        
        <SidebarDashBoard ishide={sideBarHide} menutrigger={setSideBarHide} collapsed={collapsed} setCollapsed={setCollapsed} />
        <HeaderDashboard menutrigger={setSideBarHide}/>        
        {children}
      </div>
    </main>
  );
}
