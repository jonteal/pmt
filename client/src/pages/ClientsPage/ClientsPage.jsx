import Clients from "../../components/_clients_/Clients/Clients";
import { Link } from "react-router-dom";

import './clientsPage.css';

const ClientsPage = () => {
  return (
    <div className="clients-page-main-container">
      <button className="clients-page-add-client-btn">
        <Link to="/addClient">Add Client</Link>
      </button>
      <Clients />
    </div>
  );
};

export default ClientsPage;
