import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { ClientData, ProjectData } from "../../services/data";
import BarChart from "../../components/_dashboard_/BarChart/BarChart";
// import LineChart from "../../components/_dashboard_/LineChart/LineChart";
import PieChart from "../../components/_dashboard_/PieChart/PieChart";

import "./dashboard.css";

const Dashboard = () => {
  const { data: projectData } = useQuery(GET_PROJECTS);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (projectData) {
      setProjects(projectData?.projects);
    }
  }, [projectData]);

  const notStarted = "Not Started";
  const notStartedProjects = projects.filter(
    (project) => project.status === notStarted
  );

  const inProgress = "In Progress";
  const inProgressProjects = projects.filter(
    (project) => project.status === inProgress
  );

  const completed = "Completed";
  const completedProjects = projects.filter(
    (project) => project.status === completed
  );

  const sortedProjects = [
    {
      id: 1,
      status: "Not Started",
      projects: notStartedProjects?.length,
    },
    {
      id: 2,
      status: "In Progress",
      projects: inProgressProjects?.length,
    },
    {
      id: 3,
      status: "Completed",
      projects: completedProjects?.length,
    },
  ];
  
  console.log("sortedProjects: ", sortedProjects);

  const [projectByStatus, setProjectByStatus] = useState({
    labels: sortedProjects.map((category) => category.status),
    datasets: [
      {
        label: "Project By Status",
        data: sortedProjects.map((category) => category.projects),
        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

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

  const [projectBreakdown, setProjectBreakdown] = useState({
    labels: ProjectData.map((data) => data.status),
    datasets: [
      {
        label: "Project Data",
        data: ProjectData.map((data) => data.number),
        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="dashboard-main-container">
      <h2 className="dashboard-header-title">My Dashboard</h2>

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
            <BarChart chartData={projectBreakdown} />
          </div>
        </div>

        <div className="dashboard-data-container">
          <h2 className="dashboard-chart-title">Project Data</h2>
          <div style={{ width: 400 }}>
            <PieChart chartData={projectBreakdown} />
          </div>
        </div>
      </div>

      <div className="dashboard-data-container">
        <h2 className="dashboard-chart-title">Project By Status</h2>
        <div style={{ width: 700 }}>
          <BarChart chartData={projectByStatus} />
        </div>
      </div>

      <div className="dashboard-data-container">
        <h2 className="dashboard-chart-title">Project By Status</h2>
        <div style={{ width: 400 }}>
          <PieChart chartData={projectByStatus} />
        </div>
      </div>

      {/*<div style={{ width: 700 }}>
        <LineChart chartData={clientData} />
      </div>*/}
    </div>
  );
};

export default Dashboard;
