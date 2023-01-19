// REACT
import { useState } from "react";

// APOLLO
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { GET_TICKETS } from "../../graphql/queries/ticketQueries";
import { GET_KANBANS } from "../../graphql/queries/kanbanQueries";
import { ADD_TICKET } from "../../graphql/mutations/ticketMutations";

// COMPONENTS
import Spinner from "../../components/Spinner/Spinner";

import "./addTicket.css";

const AddKanban = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kanbanId, setKanbanId] = useState("");
  const [status, setStatus] = useState("pre");

  const [addTicket] = useMutation(ADD_TICKET, {
    variables: {
      title,
      description,
      kanbanId,
      status,
    },

    update(cache, { data: { addTicket } }) {
      const { tickets } = cache.readQuery({ query: GET_TICKETS });
      cache.writeQuery({
        query: GET_TICKETS,
        data: { tickets: [...tickets, addTicket] },
      });
    },
  });

  const { loading: kanbanLoading, error: kanbanError, data: kanbanData } = useQuery(GET_KANBANS);

  const onSubmit = (e) => {
    e.preventDefault();

    addTicket(title, description, kanbanId, status);

    setTitle("");
    setDescription("");
    setKanbanId("");
    setStatus("pre");
  };

  if (kanbanLoading) return <Spinner />;
  if (kanbanError) return <p>There was an error loading the content</p>;

  return (
    <div>
      {!kanbanLoading && !kanbanError && (
        <div className="add-ticket-container">
          <label className="form-label client-select">Kanban Title</label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="kanbanId"
            value={kanbanId}
            onChange={(e) => setKanbanId(e.target.value)}
          >
            <option value="">Select Kanban</option>
            {kanbanData.kanbans.map((kanban) => (
              <option key={kanban.id} value={kanban.id}>
                {kanban.title}
              </option>
            ))}
          </select>
          <form className="add-ticket-form" onSubmit={onSubmit}>
            <div className="mb-3">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="title"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Name of task..."
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
                <label className="form-label mt-3">Status</label>
                <select
                  id="status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pre">Ready</option>
                  <option value="middle">In Progress</option>
                  <option value="old">Done</option>
                </select>
              </div>
            </div>

            <button className="add-ticket-submit-btn mb-5" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddKanban;
