import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import TaskForm from "./TaskForm";
import Task from "./Task";
import Footer from './Footer';
import CountTasks from './CountTasks';
import axios from 'axios';
import store, { setTasks, addTask, updateTaskDone, removeTask } from './store';

function Home() {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        dispatch(setTasks(response.data.data));
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, [dispatch]);

  function handleAddTask(name, isDaily) {
    axios.post('http://localhost:5000/todos', { task: name, isDaily })
      .then(response => {
        dispatch(addTask(response.data.data));
      })
      .catch(error => {
        console.error('There was an error adding the task!', error);
      });
  }

  function handleUpdateTaskDone(taskIndex, newDone) {
    const task = tasks[taskIndex];
    axios.put(`http://localhost:5000/todos/${task.id}`, { done: newDone })
      .then(() => {
        dispatch(updateTaskDone({ index: taskIndex, done: newDone }));
      })
      .catch(error => {
        console.error('There was an error updating the task!', error);
      });
  }

  function handleRemoveTask(indexToRemove) {
    const task = tasks[indexToRemove];
    axios.delete(`http://localhost:5000/todos/${task.id}`)
      .then(() => {
        dispatch(removeTask(indexToRemove));
      })
      .catch(error => {
        console.error('There was an error deleting the task!', error);
      });
  }

  return (
    <main>
      <CountTasks tasks={tasks} />
      <TaskForm onAdd={handleAddTask} />
      {tasks.map((task, index) => (
        <Task 
          key={task.id}
          name={task.task}
          done={task.done}
          onToggle={done => handleUpdateTaskDone(index, done)} 
          onDelete={() => handleRemoveTask(index)}
        />
      ))}
      <Footer />
    </main>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This is a task management application.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" className="navbar">
          <Navbar.Brand href="/">Task Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
