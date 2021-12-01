import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAuthentication } from "../../contexts/Authentication";
import { useChats } from "../../contexts/Chat";
import UserService from "../../services/UserService";


export default function Chats() {
  const { currentUser, setCurrentUser } = useAuthentication();

  useEffect(() => {
    const user = Cookies.get('user');

    const fetchCurrentUser = async (stored) => {
      const current_user = await UserService.currentUser(stored);
      setCurrentUser(current_user);
    }

    fetchCurrentUser(user);
  }, [setCurrentUser]);

  return (
    <div>
      {currentUser?.username}
    </div>
  );
}
