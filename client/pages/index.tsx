import Welcome from "@/components/home/welcome";
import { useEffect } from "react";
import { useCurrentUser } from "@/context/UserContext";
import User from "../types/User";

export default function Home() {
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: User | null = JSON.parse(storedUser);
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <Welcome />
    </>
  );
}
