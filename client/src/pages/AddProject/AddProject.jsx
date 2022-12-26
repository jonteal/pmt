import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../../graphql/mutations/projectMutations";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import Spinner from "../../components/Spinner/Spinner";

import "./addProject.css";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { title, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    addProject(title, description, clientId, status);

    setTitle("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <>
      {!loading && !error && (
        <div className="add-project-container">
          <label className="form-label client-select">Client Name</label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="subjectId"
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
          <form onSubmit={onSubmit}>
            <div>
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
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Status</option>
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button className="add-project-submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProject;
