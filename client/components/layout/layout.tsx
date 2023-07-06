// @ts-ignore
import Navbar from "./navbar";
import { useSelector } from "react-redux";
// @ts-ignore
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
