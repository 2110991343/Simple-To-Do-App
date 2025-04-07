import React, { useState, useEffect } from 'react';
import './styles/todo.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      <form className="todo-form" onSubmit={handleAddTask}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      
      {tasks.length > 0 && (
        <>
          <div className="filter-controls">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'active' ? 'active' : ''} 
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={filter === 'completed' ? 'active' : ''} 
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          
          <ul className="todo-list">
            {filteredTasks.map(task => (
              <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{task.text}</span>
                </div>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="delete-button"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          
          <div className="todo-footer">
            <span>{activeTasks} items left</span>
            <button 
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoApp;