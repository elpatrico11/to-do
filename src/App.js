import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from 'react';
import Footer from './Footer';
import CountTasks from './CountTasks';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        console.log("Fetched tasks:", response.data.data); // Dodaj ten wiersz
        setTasks(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  function addTask(name, isDaily) {
    axios.post('http://localhost:5000/todos', { task: name, isDaily })
      .then(response => {
        console.log("Added task:", response.data.data); // Dodaj ten wiersz
        setTasks(prev => [...prev, response.data.data]);
      })
      .catch(error => {
        console.error('There was an error adding the task!', error);
      });
  }

  function updateTaskDone(taskIndex, newDone) {
    const task = tasks[taskIndex];
    axios.put(`http://localhost:5000/todos/${task.id}`, { done: newDone })
      .then(response => {
        setTasks(prev => {
          const newTasks = [...prev];
          newTasks[taskIndex] = { ...newTasks[taskIndex], done: newDone };
          return newTasks;
        });
      })
      .catch(error => {
        console.error('There was an error updating the task!', error);
      });
  }

  function removeTask(indexToRemove) {
    const task = tasks[indexToRemove];
    axios.delete(`http://localhost:5000/todos/${task.id}`)
      .then(() => {
        setTasks(prev => prev.filter((_, index) => index !== indexToRemove));
      })
      .catch(error => {
        console.error('There was an error deleting the task!', error);
      });
  }

  return (
    <main>
      <CountTasks tasks={tasks} />
      <TaskForm onAdd={addTask} />
          {tasks.map((task, index) => (
      <Task 
        key={task.id}
        name={task.task} // Ensure that task name is passed as 'name' prop
        done={task.done}
        onToggle={done => updateTaskDone(index, done)} 
        onDelete={() => removeTask(index)}
      />
    ))}
      <Footer />
    </main>
  );
}

export default App;
