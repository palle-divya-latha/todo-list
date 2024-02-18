import React from 'react';
import './deletetask.css';

function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-confirmation-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="buttons-container">
          <button onClick={onDelete}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
