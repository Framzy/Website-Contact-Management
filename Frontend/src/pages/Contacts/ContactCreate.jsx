import { useState } from "react";
import useAdd from "../../hooks/crud/useAdd";
import { contactCreate } from "../../lib/api/ContactApi";
import ContactForm from "../../components/Forms/ContactForm";

export default function ContactCreate() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const { handleAdd } = useAdd(contactCreate, "/dashboard/contacts");

  async function handleSubmit(e) {
    await handleAdd(e, formData);
  }

  return (
    <ContactForm
      title="Create New Contact"
      buttonText="Create Contact"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      pathBack="/dashboard/contacts"
    />
  );
}
