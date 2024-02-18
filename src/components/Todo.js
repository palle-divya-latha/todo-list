// Todo.js

import React, { useState, useEffect } from 'react';
import './todo.css';
import AddTaskModal from './AddTaskModal';
import DeleteConfirmationModal from './DeleteTaskModal';
import { RiEdit2Line, RiDeleteBin2Line } from 'react-icons/ri';
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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.status === 'completed';
    } else if (filter === 'inprogress') {
      return task.status === 'inprogress';
    } else if (filter === 'todo') {
      return task.status === 'todo';
    }
  });

  // Filter tasks based on search term
  const searchedTasks = filteredTasks.filter(task => {
    return task.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="todo">
      <Header onSearch={handleSearch} /> {/* Pass search handler to Header component */}
      
      <div className="todo-controls">
        <div className="filter-container">
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

      <div className="table-container" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchedTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button className="edit-button" onClick={() => editTask(task.id)}>
                    <RiEdit2Line style={{ color: 'green' }} /> {/* Edit icon */}
                    <span className="button-text">Edit</span> {/* Text */}
                  </button>
                  <button className="delete-button" onClick={() => openDeleteModal(task.id)}>
                    <RiDeleteBin2Line style={{ color: 'red' }} /> {/* Delete icon */}
                    <span className="button-text">Delete</span> {/* Text */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Todo;
