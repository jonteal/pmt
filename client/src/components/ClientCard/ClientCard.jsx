import "./clientCard.css";

const ClientCard = ({ clientData }) => {
  const rootClass = "client-card";

  let formatPhoneNumber = (str) => {
    let cleaned = ("" + str).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
  };

  return (
    <div className="client-info-container">
      <div className={`${rootClass}-inner-name`}>
        <div className={`${rootClass}-item-container`}>
          <h2 className={`${rootClass}-client-header`}>Client Information</h2>
        </div>

        <div className={`${rootClass}-item-container`}>
          <p className={`${rootClass}-header`}>First Name</p>
          <h3 className={`${rootClass}-first-name`}>
            {clientData.client.firstName}
          </h3>
        </div>

        <div className={`${rootClass}-item-container`}>
          <p className={`${rootClass}-header`}>Last Name</p>
          <h3 className={`${rootClass}-last-name`}>
            {clientData.client.lastName}
          </h3>
        </div>

        <div className={`${rootClass}-item-container`}>
          <p className={`${rootClass}-header`}>Company Name</p>
          <h3 className={`${rootClass}-company-name`}>
            {clientData.client.companyName}
          </h3>
        </div>

        <div className={`${rootClass}-item-container`}>
          <p className={`${rootClass}-header`}>Email Address</p>
          <p className={`${rootClass}-email-address`}>
            {clientData.client.emailAddress}
          </p>
        </div>

        <div className={`${rootClass}-item-container`}>
          <p className={`${rootClass}-header`}>Phone Number</p>
          <p className={`${rootClass}-phone-number`}>
            {formatPhoneNumber(clientData.client.phoneNumber)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
