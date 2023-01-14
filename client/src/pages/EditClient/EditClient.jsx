import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENT } from "../../graphql/queries/clientQueries";
import { UPDATE_CLIENT } from "../../graphql/mutations/clientMutations";
import Spinner from "../../components/Spinner/Spinner";

import "./editClient.css";

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
  }, [clientEditLocation, navigate]);

  const client = data.client;

  const [firstName, setFirstName] = useState(client.firstName);
  const [lastName, setLastName] = useState(client.lastName);
  const [companyName, setCompanyName] = useState(client.companyName);
  const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
  const [emailAddress, setEmailAddress] = useState(client.emailAddress);
  const [status, setStatus] = useState(() => {
    switch (data.client.status) {
      case "Prospect":
        return "prospect";
      case "Current":
        return "current";
      case "Former":
        return "former";
      default:
        throw new Error(`Unknown status: ${data.client.status}`);
    }
  });

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: {
      id: client.id,
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status,
    },
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

    updateClient(firstName, lastName, phoneNumber, emailAddress, companyName, status);
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

              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className={`${rootClass}-company-name form-control`}
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className={`${rootClass}-phone-number form-control`}
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="text"
                  className={`${rootClass}-email-address form-control`}
                  id="emailAddress"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>

              <div className="mb-3">
              <label className="form-label">Client Status</label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="prospect">Prospect</option>
                <option value="current">Current</option>
                <option value="former">Former</option>
              </select>
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
