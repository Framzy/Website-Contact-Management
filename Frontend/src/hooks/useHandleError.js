import { useNavigate } from "react-router";

export default function useHandleError() {
  const navigate = useNavigate();

  const handleError = (response) => {
    switch (response.status) {
      case 401:
        navigate({ pathname: "/unauthorized" });
        break;
      case 404:
        navigate({ pathname: "*" });
        break;
      case 500:
        navigate({ pathname: "/server-error" });
        break;
      default:
        // Kalau error lain (misalnya 400 Bad Request), bisa log atau alert
        console.error("Unexpected error:", response);
        break;
    }
  };

  return { handleError };
}
