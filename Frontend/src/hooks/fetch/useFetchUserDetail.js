import { userDetail } from "../../lib/api/UserApi";
import useFetchData from "../useFetchData";

export default function useFetchUserDetail(setName) {
  const { fetchData } = useFetchData(
    userDetail,
    setName,
    (res) => res.data.name
  );
  async function fetchUserDetail() {
    await fetchData();
  }

  return { fetchUserDetail };
}
