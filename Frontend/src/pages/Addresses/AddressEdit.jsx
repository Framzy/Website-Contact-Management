import { useState } from "react";
import { useParams } from "react-router";
import { useEffectOnce } from "react-use";
import { addressEdit } from "../../lib/api/AddressApi";
import useFetchContact from "../../hooks/fetch/useFetchContact";
import AddressForm from "../../components/Forms/AddressForm";
import useEdit from "../../hooks/crud/useEdit";
import useFetchAddress from "../../hooks/fetch/useFetchAddress";

export default function AddressEdit() {
  const { id, addressId } = useParams();

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
  const { fetchAddress } = useFetchAddress(id, addressId, setFormData);
  const { handleEdit } = useEdit(addressEdit, `/dashboard/contacts/${id}`);

  useEffectOnce(() => {
    async function init() {
      try {
        await Promise.all([fetchContact(), fetchAddress()]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    init();
  });

  async function handleSubmit(e) {
    setLoading(true);
    await handleEdit(e, formData, id, addressId);
  }

  return (
    <AddressForm
      title="Edit Address"
      buttonText="Edit Address"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      pathBack={`/dashboard/contacts/${id}`}
      loading={loading}
      contacts={contacts}
    />
  );
}
