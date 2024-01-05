import { AuthUser, UserContext } from "@/lib/context";
import { useContext } from "react";

const useGetContextSession = (): { user: AuthUser | null; setUser: any } => {
  const user = useContext(UserContext);
  if (user) {
    return { user: user.userData, setUser: user.setUserData };
  }
  return { user: null, setUser: null };
};

export default useGetContextSession;
