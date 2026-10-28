import { addressList } from "../../lib/api/AddressApi";
import useFetchData from "../useFetchData";

export default function useFetchAddressList(id, setAddresses) {
  const { fetchData } = useFetchData(addressList, setAddresses);
  async function fetchAddressList() {
    await fetchData(id);
  }

  return { fetchAddressList };
}
