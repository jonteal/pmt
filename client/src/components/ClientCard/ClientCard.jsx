
const ClientCard = ({ clientData }) => {

  const clientName = clientData.client.firstName + " " + clientData.client.lastName;

  return (
    <div className="client-info-container">
      <h2 className="client-header">Client Information</h2>
      <h3>{clientName}</h3>
    </div>
  );
};

export default ClientCard;
