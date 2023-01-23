import Clients from "../../components/_clients_/Clients/Clients";
import { Link } from "react-router-dom";

import "./clientsPage.css";
import Button from "../../components/Button/Button";

const ClientsPage = () => {
  return (
    <div className="clients-page-main-container">
      <Button buttonType="submit" className="clients-page-add-client-btn">
        <Link className="clients-page-add-client-btn-text" to="/addClient">
          Add Client
        </Link>
      </Button>
      <Clients />
    </div>
  );
};

export default ClientsPage;
