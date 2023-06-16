import Navbar from "@/components/layout/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default layout;
