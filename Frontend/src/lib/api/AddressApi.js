export const addressCreate = async (
  token,
  id,
  { street, city, province, country, postal_code }
) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        street,
        city,
        province,
        country,
        postal_code,
      }),
    }
  );
};

export const addressList = async (token, contactId) => {
  return await fetch(
    `${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    }
  );
};

export const addressDetail = async (token, contactId, addressId) => {
  return await fetch(
    `${
      import.meta.env.VITE_API_PATH
    }/contacts/${contactId}/addresses/${addressId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    }
  );
};

export const addressEdit = async (
  token,
  contactId,
  addressId,
  { street, city, province, country, postal_code }
) => {
  return await fetch(
    `${
      import.meta.env.VITE_API_PATH
    }/contacts/${contactId}/addresses/${addressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        street,
        city,
        province,
        country,
        postal_code,
      }),
    }
  );
};

export const addressDelete = async (token, { contactId, addressId }) => {
  return await fetch(
    `${
      import.meta.env.VITE_API_PATH
    }/contacts/${contactId}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    }
  );
};
