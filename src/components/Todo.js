import React, { useState, useEffect } from 'react';
import './todo.css';
import AddTaskModal from './AddTaskModal';
import DeleteConfirmationModal from './DeleteTaskModal';
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from '../Header';

function Todo() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'inprogress' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'completed' },
    { id: 4, title: 'Task 4', description: 'Description for Task 4', status: 'todo' },
    { id: 5, title: 'Task 5', description: 'Description for Task 5', status: 'inprogress' },
    { id: 6, title: 'Task 6', description: 'Description for Task 6', status: 'completed' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('todo');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskTitle.trim() !== '' && newTaskDescription.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        description: newTaskDescription,
        status: newTaskStatus,
      };
      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskStatus('todo');
      setIsAddingTask(false);
    }
  };

  const deleteTask = () => {
    const updatedTasks = tasks.filter(task => task.id !== taskIdToDelete);
    setTasks(updatedTasks);
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (taskId) => {
    setTaskIdToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleStatusChange = (id, status) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setNewTaskTitle(taskToEdit.title);
    setNewTaskDescription(taskToEdit.description);
    setNewTaskStatus(taskToEdit.status);
    setEditTaskIndex(id);
    setIsAddingTask(true);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredTasks);
    }
  };

  const filteredTasks = searchTerm.trim() === '' 
    ? tasks.filter(task => filter === 'all' || task.status === filter)
    : searchResults;

  return (
    <div className="todo">
      <Header onSearch={handleSearch} />

      <div className="todo-controls">
        <div className="filter-container" style={{ color: 'rgba(126, 58, 35, 0.694)', fontWeight: '900', margin: '5px', padding: '5px',}}>
          <label className='filter' htmlFor="filter">Filter Tasks: </label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option className='all-tasks' value="all">All Tasks</option>
            <option className='completed-tasks' value="completed">Completed</option>
            <option className='in-progress' value="inprogress">In Progress</option>
            <option className='to-do-tasks' value="todo">To Do</option>
          </select>
          <button className="add-task-button" onClick={() => setIsAddingTask(true)}>Add Task</button>
        </div>
      </div>

      <AddTaskModal
        isOpen={isAddingTask}
        onClose={() => setIsAddingTask(false)}
        onSubmit={addTask}
        onChange={(e) => {
          const { name, value } = e.target;
          if (name === 'title') setNewTaskTitle(value);
          if (name === 'description') setNewTaskDescription(value);
          if (name === 'status') setNewTaskStatus(value);
        }}
        title={newTaskTitle}
        description={newTaskDescription}
        status={newTaskStatus}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={deleteTask}
      />

      <div className="table-container" style={{ overflowX: 'auto', fontWeight: '900' }}>
        <table>
          <thead style={{color: 'rgba(126, 58, 35, 0.694)', backgroundColor: 'bisque', }}>
            <tr>
              <th style={{border: '2px solid rgba(126, 58, 35, 0.694)'}}>S.No</th>
              <th style={{border: '2px solid rgba(126, 58, 35, 0.694)'}}>Title</th>
              <th style={{border: '2px solid rgba(126, 58, 35, 0.694)'}}>Description</th>
              <th style={{border: '2px solid rgba(126, 58, 35, 0.694)'}}>Status</th>
              <th style={{border: '2px solid rgba(126, 58, 35, 0.694)'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="5">No results found</td>
              </tr>
            ) : (
              filteredTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      style={{width: 'fit-content', color: 'rgba(126, 58, 35, 0.694)', backgroundColor: 'bisque', fontWeight: '900', outline: 'none', cursor: 'pointer'}}
                    >
                      <option value="todo">To Do</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="edit-button" onClick={() => editTask(task.id)}>
                      < FaEdit  style={{ color: 'green' }} /> 
                      <span className="button-text">Edit</span> 
                    </button>
                    <button className="delete-button" onClick={() => openDeleteModal(task.id)}>
                      <FaTrash style={{ color: 'red' }} /> 
                      <span className="button-text">Delete</span> 
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Todo;
