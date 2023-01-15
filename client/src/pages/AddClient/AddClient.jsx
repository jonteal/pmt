import { useState } from "react";

// LIBRARIES
import { useMutation } from "@apollo/client";

// GRAPHQL
import { ADD_CLIENT } from "../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";

import "./addClient.css";

const AddClient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState("prospect");

  const rootClass = "add-client";

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "") {
      alert("Please fill in the client name");
    }

    addClient(
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status
    );

    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmailAddress("");
    setCompanyName("");
    setStatus("prospect");
  };

  return (
    <div className="add-client-container">
      <h3 className="add-client-title">Add Client</h3>

      <form className="add-client-form" onSubmit={onSubmit}>
        <div className={`${rootClass}-form-item col`}>
          <input
            type="text"
            className="form-control firstName"
            placeholder="First name"
            aria-label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className={`${rootClass}-form-item col`}>
          <input
            type="text"
            className="form-control lastName"
            placeholder="Last name"
            aria-label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={`${rootClass}-form-item col`}>
          <input
            type="text"
            className="form-control companyName"
            placeholder="Company Name"
            aria-label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className={`${rootClass}-form-item col`}>
          <input
            type="text"
            className="form-control phoneNumber"
            placeholder="Phone Number"
            aria-label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className={`${rootClass}-form-item col`}>
          <input
            type="text"
            className="form-control emailAddress"
            placeholder="Email Address"
            aria-label="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>

        <select
          className={`${rootClass}-form-item form-select`}
          aria-label="Default select example"
        >
          <option value="">Client Status</option>
          <option value="prospect">Prospect</option>
          <option value="current">Current</option>
          <option value="former">Former</option>
        </select>

        <button className="client-add-submit-btn mb-3" type="submit">
          Submit
        </button>

      </form>
    </div>
  );
};

export default AddClient;
