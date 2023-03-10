// REACT
import { useState } from "react";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_KANBAN } from "../../graphql/mutations/kanbanMutations";
import { GET_KANBANS } from "../../graphql/queries/kanbanQueries";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/Button/Button";

import "./addKanban.css";

const rootClass = "add-kanban";

const AddKanban = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");

  const [addKanban] = useMutation(ADD_KANBAN, {
    variables: {
      title,
      description,
      projectId,
    },

    update(cache, { data: { addKanban } }) {
      const { kanbans } = cache.readQuery({ query: GET_KANBANS });
      cache.writeQuery({
        query: GET_KANBANS,
        data: { kanbans: [...kanbans, addKanban] },
      });
    },
  });

  const { loading: projectsLoading, error: projectsError, data: projectsData } = useQuery(GET_PROJECTS);

  const onSubmit = (e) => {
    e.preventDefault();

    addKanban(title, description, projectId);

    setTitle("");
    setDescription("");
    setProjectId("");
  };

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was an error loading the content</p>;

  return (
    <div>
      {!projectsLoading && !projectsError && (
        <div className={`${rootClass}-container`}>
          <label className="form-label client-select">Associated Project</label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projectsData.projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
          <form className={`${rootClass}-form mt-3`} onSubmit={onSubmit}>
            <div className="mb-3">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="title"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Name of your kanban..."
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
            </div>

            <Button
              buttonType="submit"
              className={`${rootClass}-submit-btn mb-5`}
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

export default AddKanban;
