
import Button from '../Button/Button';

import './alertModal.css';

const AlertModal = ({ buttonType, action, promptLabel, confirmLabel, modalHeader, modalBody }) => {
  return (
    <div>
      <Button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className={`${buttonType}`}
        buttonType={`${buttonType}`}
      >
        {promptLabel}
      </Button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {modalHeader}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{modalBody}</div>
            <div className="modal-footer">
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
