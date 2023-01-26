import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { useNavigate } from "react-router-dom";

// GRAPHQL
import { UPDATE_TICKET } from "../../graphql/mutations/ticketMutations";
import { GET_TICKET } from "../../graphql/queries/ticketQueries";
import { GET_TICKETS } from "../../graphql/queries/ticketQueries";
import { GET_KANBANS } from "../../graphql/queries/kanbanQueries";
import { DELETE_TICKET } from "../../graphql/mutations/ticketMutations";

// COMPONENT
import AlertModal from "../../components/AlertModal/AlertModal";
import Button from "../../components/Button/Button";

import "./editTicket.css";

const rootClass = "edit-ticket";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      status,
    },
    refetchQueries: [
      { query: GET_TICKET, variables: { id: ticketData.ticket.id } },
    ],
  });

  const [deleteTicket] = useMutation(DELETE_TICKET, {
    variables: { id: ticketData.ticket.id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_TICKETS }],
  });

  const { data: kanbanData } = useQuery(GET_KANBANS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateTicket(title, description, status);
  };

  const deleteMessage =
    "Are you sure you want to delete this ticket? Once you delete it you cannot undo that action.";

  return (
    <div>
      {!ticketLoading && !ticketError && (
        <div className={`${rootClass}-container`}>
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
          <form className={`${rootClass}-form`} onSubmit={onSubmit}>
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

            <div>
              <AlertModal
                modalHeader="Heads up!"
                modalBody={deleteMessage}
                promptLabel="Delete"
                confirmLabel="Delete"
                action={deleteTicket}
                buttonType="delete"
              />
            </div>

            <Button buttonType="submit" className="mb-5">
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditTicket;
