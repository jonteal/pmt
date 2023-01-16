import { useState } from "react";
import { ClientData, ProjectData } from "../../services/data";
import BarChart from "../../components/BarChart/BarChart";
import LineChart from "../../components/LineChart/LineChart";
import PieChart from "../../components/PieChart/PieChart";

import "./dashboard.css";

const Dashboard = () => {
  const [clientData, setClientData] = useState({
    labels: ClientData.map((data) => data.status),
    datasets: [
      {
        label: "Client Data",
        data: ClientData.map((data) => data.number),
        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [projectData, setProjectData] = useState({
    labels: ProjectData.map((data) => data.status),
    datasets: [
      {
        label: "Project Data",
        data: ClientData.map((data) => data.number),
        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div>
      <h2>My Dashboard</h2>

      <div className="dashboard-client-parent-container">
        <div className="dashboard-data-container">
          <h2 className="dashboard-chart-title">Client Data</h2>
          <div style={{ width: 700 }}>
            <BarChart chartData={clientData} />
          </div>
        </div>

        <div className="dashboard-data-container">
          <h2 className="dashboard-chart-title">Client Data</h2>
          <div style={{ width: 400 }}>
            <PieChart chartData={clientData} />
          </div>
        </div>
      </div>

      <div className="dashboard-project-parent-container">
        <div className="dashboard-data-container">
          <h2 className="dashboard-chart-title">Project Data</h2>
          <div style={{ width: 700 }}>
            <BarChart chartData={clientData} />
          </div>
        </div>

        <div className="dashboard-data-container">
          <h2 className="dashboard-chart-title">Project Data</h2>
          <div style={{ width: 400 }}>
            <PieChart chartData={projectData} />
          </div>
        </div>
      </div>

      {/*<div style={{ width: 700 }}>
        <LineChart chartData={clientData} />
      </div>*/}
    </div>
  );
};

export default Dashboard;
