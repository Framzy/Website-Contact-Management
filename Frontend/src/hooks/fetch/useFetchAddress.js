import { addressDetail } from "../../lib/api/AddressApi";
import useFetchData from "../useFetchData";

export default function useFetchAddress(id, addressId, setAddress) {
  const { fetchData } = useFetchData(addressDetail, setAddress);
  async function fetchAddress() {
    await fetchData(id, addressId);
  }

  return { fetchAddress };
}
