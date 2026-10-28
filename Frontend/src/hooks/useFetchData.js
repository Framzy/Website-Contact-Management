import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router";
import useHandleError from "./useHandleError";

/**
 * Generic reusable hook for fetching data (GET)
 * Automatically handles token, error navigation, and dynamic API params.
 *
 * @param {Function} apiFn - The API function to call
 * @param {Function} setData - Setter for storing the response data
 * @param {Function} transformFn - Optional transformation function (e.g., pagination)
 */
export default function useFetchData(apiDataFn, setData, transformFn) {
  const [token] = useLocalStorage("token", "");
  const { handleError } = useHandleError();
  const navigate = useNavigate();

  async function fetchData(id, addressId, payload = null) {
    try {
      let response;
      if (apiDataFn.length === 3)
        response = await apiDataFn(token, id, addressId);
      else if (apiDataFn.length === 2)
        response = payload
          ? await apiDataFn(token, payload)
          : await apiDataFn(token, id);
      else response = await apiDataFn(token);

      const responseBody = await response.json();

      if (response.ok) {
        const transformedData = transformFn
          ? transformFn(responseBody)
          : responseBody.data;

        setData(transformedData);
      } else {
        handleError(response);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      navigate({ pathname: "/server-error" });
    }
  }

  return { fetchData };
}
