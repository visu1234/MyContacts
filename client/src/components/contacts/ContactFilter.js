import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

// useRef - value will persist even after re-render and also changing the value will not render the page

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef("");
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts"
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
