import Navbar from "@/components/layout/navbar";
import { useSelector } from "react-redux";
import Statsbar from "./statsbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  return (
    <>
      <Navbar />
      {isLoggedIn && <Statsbar />}
      {children}
    </>
  );
}

export default Layout;
