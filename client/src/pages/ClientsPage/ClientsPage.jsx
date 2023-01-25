import { Link } from "react-router-dom";

// COMPONENTS
import Clients from "../../components/_clients_/Clients/Clients";
import Button from "../../components/Button/Button";

import "./clientsPage.css";

const rootClass = "clients-page";

const ClientsPage = () => {
  return (
    <div className={`${rootClass}-main-container`}>
      <Link className={`${rootClass}-add-client-btn-text`} to="/addClient">
        <Button buttonType="submit" className={`${rootClass}-add-client-btn"`}>
          Add Client
        </Button>
      </Link>
      <hr />
      <Clients />
    </div>
  );
};

export default ClientsPage;
