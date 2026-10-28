import { useLocalStorage } from "react-use";
import { userLogout } from "../lib/api/UserApi";
import { alertConfirm, alertError, alertSuccess } from "../lib/alert";
import { useNavigate } from "react-router";

export default function useUserLogout() {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleLogout() {
    if (
      !(await alertConfirm(
        "You will be logged out from your account!",
        "logout"
      ))
    ) {
      return; // batal logout
    } else {
      try {
        const response = await userLogout(token);
        const responseBody = await response.json();

        if (response.status === 200) {
          setToken("");
          alertSuccess("Logout successfully");
          navigate("/login");
        } else {
          await alertError(responseBody.errors);
        }
      } catch (error) {
        console.log(error);
        await alertError("Failed to logout. Please try again.");
      }
    }
  }

  return { handleLogout };
}
