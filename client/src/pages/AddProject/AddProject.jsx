// REACT
import { useState } from "react";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_PROJECT } from "../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/Button/Button";

// DATE PICKING
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./addProject.css";

const AddProject = () => {
  const rootClass = 'add-project';

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [clientBudget, setClientBudget] = useState("");
  const [projectEstimate, setProjectEstimate] = useState("");
  const [alertOn, setAlertOn] = useState(false);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      title,
      description,
      clientId,
      status,
      startDate,
      deadline,
      notes,
      clientBudget,
      projectEstimate,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "" || status === "") {
      setAlertOn(true);
      return (
        <div class="alert alert-danger" role="alert">
          Please provide a title, description, and status!
        </div>
      );
    }

    addProject(
      title,
      description,
      clientId,
      status,
      startDate,
      deadline,
      notes,
      clientBudget,
      projectEstimate
    );

    setTitle("");
    setDescription("");
    setStatus("new");
    setClientId("");
    setStartDate(new Date());
    setDeadline(new Date());
    setNotes("");
    setClientBudget("");
    setProjectEstimate("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <div>
      {!loading && !error && (
        <div className={`${rootClass}-container`}>
          {alertOn && (
            <div className="alert alert-danger mt-3" role="alert">
              Please provide a title, description, and status!
            </div>
          )}

          <label className="form-label client-select">Client Name</label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Select Client</option>
            {data.clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.firstName + " " + client.lastName}
              </option>
            ))}
          </select>
          <form className={`${rootClass}-form`} onSubmit={onSubmit}>
            <div className="mb-3">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="title"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Name of your project..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

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

            <div className={`mb-3 ${rootClass}-form-item`}>
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
                rows="3"
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

            <Button
              buttonType="submit"
              className="add-project-submit-btn mb-5"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddProject;
