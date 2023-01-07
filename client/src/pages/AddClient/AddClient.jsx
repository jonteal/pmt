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

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { firstName, lastName },
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

    addClient(firstName, lastName);

    setFirstName("");
    setLastName("");
  };

  return (
    <div className="add-client-container">
      <h3 className="add-client-title">Add Client</h3>

      <form className="add-client-form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control firstName"
              placeholder="First name"
              aria-label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control lastName"
              placeholder="Last name"
              aria-label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <button className="client-submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddClient;
