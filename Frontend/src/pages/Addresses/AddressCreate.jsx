import { useState } from "react";
import { useParams } from "react-router";
import { useEffectOnce } from "react-use";
import { addressCreate } from "../../lib/api/AddressApi";
import useFetchContact from "../../hooks/fetch/useFetchContact";
import useAdd from "../../hooks/crud/useAdd";
import AddressForm from "../../components/Forms/AddressForm";

export default function AddressCreate() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
  });

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  const { fetchContact } = useFetchContact(id, setContacts);
  const { handleAdd } = useAdd(addressCreate, `/dashboard/contacts/${id}`);

  useEffectOnce(() => {
    fetchContact().finally(() => setLoading(false));
  });

  async function handleSubmit(e) {
    setLoading(true);
    await handleAdd(e, formData, id);
  }

  return (
    <AddressForm
      title="Add New Address"
      buttonText="Add Address"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      pathBack={`/dashboard/contacts/${id}`}
      loading={loading}
      contacts={contacts}
    />
  );
}
