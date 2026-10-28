import { contactDetail } from "../../lib/api/ContactApi";
import useFetchData from "../useFetchData";

export default function useFetchContact(id, setContacts) {
  const { fetchData } = useFetchData(contactDetail, setContacts);

  async function fetchContact() {
    await fetchData(id);
  }

  return { fetchContact };
}
