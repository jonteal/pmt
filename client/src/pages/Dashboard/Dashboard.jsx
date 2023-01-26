import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { ClientData, ProjectData } from "../../services/data";

// COMPONENTS
import ChartContainer from "../../components/_dashboard_/ChartContainer/ChartContainer";
import BarChart from "../../components/_dashboard_/BarChart/BarChart";
import PieChart from "../../components/_dashboard_/PieChart/PieChart";
// import LineChart from "../../components/_dashboard_/LineChart/LineChart";

import "./dashboard.css";

const rootClass = "dashboard";

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
    <div className={`${rootClass}-main-container`}>
      <h2 className={`${rootClass}-header-title`}>My Dashboard</h2>

      <div className={`${rootClass}-client-parent-container`}>
        <ChartContainer title="Client Data" width="700">
          <BarChart chartData={clientData} />
        </ChartContainer>

        <ChartContainer title="Client Data" width="400">
          <PieChart chartData={clientData} />
        </ChartContainer>
      </div>

      <div className={`${rootClass}-project-parent-container`}>
        <ChartContainer title="Project Data" width="700">
          <BarChart chartData={projectBreakdown} />
        </ChartContainer>

        <ChartContainer title="Project Data" width="400">
          <PieChart chartData={projectBreakdown} />
        </ChartContainer>
      </div>

      <div className={`${rootClass}-project-parent-container`}>
        <ChartContainer title="Project By Status" width="700">
          <BarChart chartData={projectByStatus} />
        </ChartContainer>

        <ChartContainer title="Project By Status" width="400">
          <PieChart chartData={projectByStatus} />
        </ChartContainer>
      </div>

      {/*<div style={{ width: 700 }}>
        <LineChart chartData={clientData} />
      </div>*/}
    </div>
  );
};

export default Dashboard;
