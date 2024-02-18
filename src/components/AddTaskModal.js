import React from 'react';
import './addtask.css'

function AddTaskModal({ isOpen, onClose, onSubmit, onChange, title, description, status }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={onSubmit}>
          <label>
            Title:
            <input
            style={{backgroundColor: 'rgba(126, 58, 35, 0.694)', color: 'bisque', fontWeight: '900' }}
            className='input'
              type="text"
              value={title}
              onChange={onChange}
              name="title"
            />
          </label>
          <label>
            Description:
            <textarea
              type="text"
              value={description}
              onChange={onChange}
              name="description"
            />
          </label>
          <label>
            Status:
            <select
              value={status}
              onChange={onChange}
              name="status"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <button type="submit">Save Task</button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
