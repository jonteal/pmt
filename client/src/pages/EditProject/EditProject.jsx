import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import { UPDATE_PROJECT } from "../../graphql/mutations/projectMutations";
import Spinner from "../../components/Spinner/Spinner";

// DATE PICKING
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./editProject.css";

const EditProject = () => {
  const rootClass = "edit-project";
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const handleBackNavigate = () => {
    navigate(-1);
  };

  const [title, setTitle] = useState(data.project.title);
  const [description, setDescription] = useState(data.project.description);
  const [clientId, setClientId] = useState(data.project.clientId);
  const [status, setStatus] = useState(() => {
    switch (data.project.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${data.project.status}`);
    }
  });
  const [deadline, setDeadline] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [notes, setNotes] = useState(data.project.notes);
  const [clientBudget, setClientBudget] = useState(data.project.clientBudget);
  const [projectEstimate, setProjectEstimate] = useState(data.project.projectEstimate);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: data.project.id,
      title,
      description,
      status,
      startDate,
      deadline,
      clientId,
      notes,
      clientBudget,
      projectEstimate
    },
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: data.project.id } },
    ],
  });

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENTS);

  const projectLocation = `/projects/${data.project.id}`;

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

    updateProject(title, description, status, startDate, deadline, notes, projectEstimate, clientBudget);
    navigate(projectLocation);
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error...</p>;

  return (
    <div className={`${rootClass}-main-container`}>
      {!loading && !error && (
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
              <button
                onClick={onSubmit}
                type="submit"
                className={`${rootClass}-submit-btn`}
              >
                Submit
              </button>
              <button
                onClick={handleBackNavigate}
                type="button"
                className={`${rootClass}-back-btn`}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProject;
