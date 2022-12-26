import "./clientCard.css";

const ClientCard = ({ clientData }) => {
  const clientName =
    clientData.client.firstName + " " + clientData.client.lastName;

  return (
    <div className="client-info-container">
      <div className="client-inner-container">
        <h2 className="client-header">Client Information</h2>
        <h3 className="client-name">{clientName}</h3>
      </div>
    </div>
  );
};

export default ClientCard;
