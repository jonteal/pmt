import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENT } from "../../graphql/queries/clientQueries";
import { UPDATE_CLIENT } from "../../graphql/mutations/clientMutations";
import Spinner from "../../components/Spinner/Spinner";

import "./editClient.css";
import { useEffect } from "react";

const EditClient = () => {
  const rootClass = "edit-client";
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackNavigate = () => {
    navigate(-1);
  };
  
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id },
  });
  
  const clientLocation = `/clients/${data.client.id}`;

  const clientEditLocation = `/clients/${data.client.id}/edit`;

  useEffect(() => {
    navigate(clientEditLocation);
  }, [clientEditLocation, navigate])

  console.log(data);

  const client = data.client;

  const [firstName, setFirstName] = useState(client.firstName);
  const [lastName, setLastName] = useState(client.lastName);

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: client.id, firstName, lastName },
    refetchQueries: [
      {
        query: GET_CLIENT,
        variables: {
          id: client.id,
        },
      },
    ],
  });


  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      return alert("Please fill out all fields");
    }

    updateClient(firstName, lastName);
    navigate(clientLocation);
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error...</p>;

  return (
    <div className={`${rootClass}-main-container`}>
      {!loading && !error && (
        <div className="mt-2">
          <form onSubmit={onSubmit}>
            <div className={`${rootClass}-name-container`}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`${rootClass}-firstName form-control`}
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`${rootClass}-lastName form-control`}
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                onClick={onSubmit}
                type="submit"
                className={`${rootClass}-submit-btn`}
              >
                Submit
              </button>
              <button
                onClick={handleBackNavigate}
                type="button"
                className={`${rootClass}-back-btn`}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditClient;
