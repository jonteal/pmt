// REACT
import { useState } from "react";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

import { useParams, useNavigate } from "react-router-dom";

// GRAPHQL
import { UPDATE_KANBAN } from "../../graphql/mutations/kanbanMutations";
import { GET_KANBANS, GET_KANBAN } from "../../graphql/queries/kanbanQueries";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import { DELETE_KANBAN } from "../../graphql/mutations/kanbanMutations";

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";
import AlertModal from "../../components/AlertModal/AlertModal";
import Button from "../../components/Button/Button";

import "./editKanban.css";

const rootClass = "edit-kanban";

const EditKanban = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading: kanbanLoading,
    error: kanbanError,
    data: kanbanData,
  } = useQuery(GET_KANBAN, {
    variables: { id },
  });

  const handleBackNavigate = () => {
    navigate(-1);
  };

  const [title, setTitle] = useState(kanbanData.kanban.title);
  const [description, setDescription] = useState(kanbanData.kanban.description);
  const [projectId, setProjectId] = useState("");

  const [updateKanban] = useMutation(UPDATE_KANBAN, {
    variables: {
      id: kanbanData.kanban.id,
      title,
      description,
    },
    refetchQueries: [
      { query: GET_KANBAN, variables: { id: kanbanData.kanban.id } },
    ],
  });

  const [deleteKanban] = useMutation(DELETE_KANBAN, {
    variables: { id: kanbanData.kanban.id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_KANBANS }, { query: GET_PROJECTS }],
  });

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

  const onSubmit = (e) => {
    e.preventDefault();

    updateKanban(title, description);
  };

  const deleteMessage =
    "Are you sure you want to delete this kanban? Once you delete it you cannot undo that action.";

  if (projectsLoading || kanbanLoading) return <Spinner />;
  if (projectsError || kanbanError)
    return <p>There was an error loading the content</p>;

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
          <form className={`${rootClass}-form`} onSubmit={onSubmit}>
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
            <div>
              <AlertModal
                modalHeader="Heads up!"
                modalBody={deleteMessage}
                promptLabel="Delete"
                confirmLabel="Delete"
                action={deleteKanban}
                buttonType="delete"
              />
            </div>

            <Button
              buttonType="submit"
              className={`${rootClass}-submit-btn mb-5`}
              type="submit"
            >
              Update
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditKanban;
