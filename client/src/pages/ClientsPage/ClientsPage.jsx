import { Link } from "react-router-dom";

// COMPONENTS
import Clients from "../../components/_clients_/Clients/Clients";
import Button from "../../components/Button/Button";

import "./clientsPage.css";

const ClientsPage = () => {
  const rootClass = "clients-page";
  return (
    <div className={`${rootClass}-main-container`}>
      <Button buttonType="submit" className={`${rootClass}-add-client-btn"`}>
        <Link className={`${rootClass}-add-client-btn-text`} to="/addClient">
          Add Client
        </Link>
      </Button>
      <hr />
      <Clients />
    </div>
  );
};

export default ClientsPage;
