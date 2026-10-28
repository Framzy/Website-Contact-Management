import { contactList } from "../../lib/api/ContactApi";
import useFetchData from "../useFetchData";

function handlePaginatedResponse(res, setContacts, setTotalPage) {
  setContacts(res.data || []);
  setTotalPage(res.paging.total_page || 1);
}

export default function useFetchContactList(
  payload,
  setContacts,
  setTotalPage
) {
  const { fetchData } = useFetchData(
    contactList,
    () => {},
    (res) => {
      handlePaginatedResponse(res, setContacts, setTotalPage);
    }
  );

  async function fetchContacts() {
    await fetchData(null, null, payload);
  }

  return { fetchContacts };
}
