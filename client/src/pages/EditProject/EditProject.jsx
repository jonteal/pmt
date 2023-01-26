import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

// GRAPHQL
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import { UPDATE_PROJECT } from "../../graphql/mutations/projectMutations";

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/Button/Button";

// DATE PICKING
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./editProject.css";

const rootClass = "edit-project";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const handleBackNavigate = () => {
    navigate(-1);
  };

  const [title, setTitle] = useState(projectData.project.title);
  const [description, setDescription] = useState(
    projectData.project.description
  );
  const [clientId, setClientId] = useState(projectData.project.clientId);
  const [status, setStatus] = useState(() => {
    switch (projectData.project.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${projectData.project.status}`);
    }
  });
  const [deadline, setDeadline] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [notes, setNotes] = useState(projectData.project.notes);
  const [clientBudget, setClientBudget] = useState(
    projectData.project.clientBudget
  );
  const [projectEstimate, setProjectEstimate] = useState(
    projectData.project.projectEstimate
  );

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: projectData.project.id,
      title,
      description,
      status,
      startDate,
      deadline,
      clientId,
      notes,
      clientBudget,
      projectEstimate,
    },
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: projectData.project.id } },
    ],
  });

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS);

  const projectLocation = `/projects/${projectData.project.id}`;

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateProject(
      title,
      description,
      status,
      startDate,
      deadline,
      notes,
      projectEstimate,
      clientBudget
    );
    navigate(projectLocation);
  };

  if (projectLoading) return <Spinner />;
  if (projectError) return <p>There was an error...</p>;

  return (
    <div className={`${rootClass}-main-container`}>
      {!projectLoading && !projectError && (
        <div className="mt-2">
          <label className="form-label client-select">Client Name</label>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Select Client</option>
            {clientData.clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.firstName + " " + client.lastName}
              </option>
            ))}
          </select>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deadline</label>
              <DatePicker selected={deadline} onChange={handleDeadlineChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Budget</label>
              <input
                type="clientBudget"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="What is the budget for this project?"
                value={clientBudget}
                onChange={(e) => setClientBudget(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Project Estimate</label>
              <input
                type="projectEstimate"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="What is the estimate for this project?"
                value={projectEstimate}
                onChange={(e) => setProjectEstimate(e.target.value)}
              />
            </div>

            <div>
              <Button
                buttonType="submit"
                onClick={onSubmit}
                type="submit"
                className={`${rootClass}-submit-btn`}
              >
                Submit
              </Button>
              <Button
                buttonType="back"
                onClick={handleBackNavigate}
                type="button"
                className={`${rootClass}-back-btn`}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProject;
