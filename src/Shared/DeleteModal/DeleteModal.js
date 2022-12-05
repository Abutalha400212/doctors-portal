import React from "react";

const DeleteModal = ({deleteAction,handleCancelModal,handleSuccessDeleteAction}) => {
  return (
    <div>
      <input type="checkbox" id="doctors-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label onClick={handleCancelModal} className="btn btn-md btn-warning">
            Cancel
            </label>
            <label onClick={()=> handleSuccessDeleteAction(deleteAction)}  className="btn btn-primary btn-md">
             Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
