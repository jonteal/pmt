import React from "react";

const AlertModal = ({ action, promptLabel, confirmLabel, modalHeader, modalBody }) => {
  return (
    <div>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {promptLabel}
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {modalHeader}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you sure you want to delete this kanban? Once you delete it you cannot undo that action.</div>
            <div class="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button data-bs-dismiss="modal" onClick={action} type="button">
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
