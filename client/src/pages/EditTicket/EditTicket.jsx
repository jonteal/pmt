import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { UPDATE_TICKET } from "../../graphql/mutations/ticketMutations";
import { GET_TICKET } from "../../graphql/queries/ticketQueries";
import { GET_KANBANS } from "../../graphql/queries/kanbanQueries";

// import "./editTicket.css";

const EditTicket = () => {
  const { id } = useParams();
  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKET, {
    variables: { id },
  });

  const [title, setTitle] = useState(ticketData.ticket.title);
  const [description, setDescription] = useState(ticketData.ticket.description);
  const [kanbanId, setKanbanId] = useState("");
  const [status, setStatus] = useState(() => {
    switch (ticketData.ticket.status) {
      case "Ready":
        return "pre";
      case "In Progress":
        return "middle";
      case "Done":
        return "old";
      default:
        throw new Error(`Unknown status: ${ticketData.ticket.status}`);
    }
  });

  const [updateTicket] = useMutation(UPDATE_TICKET, {
    variables: { 
      id: ticketData.ticket.id, 
      title, 
      description, 
      status 
    },
    refetchQueries: [
      { query: GET_TICKET, variables: { id: ticketData.ticket.id } },
    ],
  });

  const { data: kanbanData } = useQuery(GET_KANBANS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateTicket(title, description, status);
  };

  return (
    <div>
      {!ticketLoading && !ticketError && (
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

            <button className="add-ticket-submit-btn mb-5">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditTicket;
