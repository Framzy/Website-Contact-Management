import { useState } from "react";
import { contactEdit } from "../../lib/api/ContactApi";
import { useParams } from "react-router";
import ContactForm from "../../components/Forms/ContactForm";
import useEdit from "../../hooks/crud/useEdit";
import useFetchContact from "../../hooks/fetch/useFetchContact";
import { useEffectOnce } from "react-use";

export default function ContactEdit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const { fetchContact } = useFetchContact(id, setFormData);

  useEffectOnce(() => {
    fetchContact();
  });

  const { handleEdit } = useEdit(contactEdit, "/dashboard/contacts");

  async function handleSubmit(e) {
    await handleEdit(e, formData, id);
  }

  return (
    <ContactForm
      title="Edit Contact"
      buttonText="Edit Contact"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      pathBack={`/dashboard/contacts/${id}`}
    />
  );
}
