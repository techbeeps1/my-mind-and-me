
import { ReactNode } from "react";
import SidebarDashBoard from "./SidebarDashBoard";

import { useState } from "react";
import HeaderDashboard from "./header/HeaderDashboard";
type WrapperProps = {
  children: ReactNode;
};
export default function WrapperBanner({ children }: WrapperProps) {
  const [sideBarHide, setSideBarHide] = useState<boolean>(true);
  return (
    <main>
      <div className="lg:ps-85 bg-cover bg-center bg-no-repeat min-h-screen " style={{ backgroundImage: "url('/banner-bg.jpg')" }}>
        
        <SidebarDashBoard ishide={sideBarHide} />
        <HeaderDashboard menutrigger={setSideBarHide}/>        
        {children}
      </div>
    </main>
  );
}
