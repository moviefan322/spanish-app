import Navbar from "@/components/layout/navbar";
import Statsbar from "./statsbar";

interface LayoutProps {
  children: React.ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Statsbar />
      {children}
    </>
  );
}

export default layout;
