import { useLocalStorage } from "react-use";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
/**
 * Reusable delete hook
 * @param {Function} apiDeleteFn - fungsi API yang melakukan delete (misal contactDelete, addressDelete)
 * @param {Object} options - konfigurasi tambahan
 * @param {string} options.confirmMessage - pesan konfirmasi sebelum delete
 * @param {string} options.successMessage - pesan sukses setelah delete
 * @param {string} options.errorMessage - pesan error umum
 */

export default function useDelete(apiDeleteFn, options = {}) {
  const [token, _] = useLocalStorage("token", "");

  async function handleDelete(payload) {
    const {
      confirmMessage = "Are you sure you want to delete this item?",
      successMessage = "Item deleted successfully",
      errorMessage = "Failed to delete item. Please try again.",
    } = options;

    const confirmed = await alertConfirm(confirmMessage, "delete");
    if (!confirmed) {
      return; // batal delete
    }

    try {
      const response = await apiDeleteFn(token, payload);
      const responseBody = await response.json();

      if (response.status === 200) {
        alertSuccess(successMessage);
      } else {
        await alertError(responseBody.errors);
      }
    } catch (error) {
      console.error(error);
      await alertError(errorMessage);
    }
  }

  return { handleDelete };
}
