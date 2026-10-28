import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router";
import { alertSuccess, alertError } from "../../lib/alert";

/**
 * Reusable hook for adding (create/register) data
 * Automatically detects if API needs token or id
 *
 * @param {Function} apiAddFn - API function to execute
 * @param {string} path - path to navigate after success
 * @param {string} successMessage - optional custom success message
 * @param {string} errorMessage - optional custom error message
 */
export default function useAdd(apiAddFn, path, successMessage, errorMessage) {
  const [token] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleAdd(e, payload, id = null) {
    try {
      e.preventDefault();

      let response;

      if (apiAddFn.length === 3) {
        response = await apiAddFn(token, id, payload);
      } else if (apiAddFn.length === 2) {
        response = await apiAddFn(token, payload);
      } else {
        response = await apiAddFn(payload);
      }

      const responseBody = await response.json();

      if (response.status === 200) {
        await alertSuccess(successMessage || "Item added successfully");
        navigate(path);
      } else if (response.status === 500) {
        await alertError("Internal server error");
      } else {
        await alertError(responseBody.errors || errorMessage);
      }
    } catch (error) {
      console.error("Add error:", error);
      await alertError(errorMessage || "Failed to add item. Please try again.");
    }
  }

  return { handleAdd };
}
