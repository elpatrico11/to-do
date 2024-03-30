import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useState } from 'react';

function App() {

  const [tasks, setTasks] = useState([]);
  function addTask(name) {
    setTasks(prev=> {
      return [...prev, {name:name, done:false}];
    });
  }
  

  return (
    <main>
      <TaskForm onAdd={addTask}/>
      {tasks.map(task => (<Task {...task} />))}
      </main>
  );
}

export default App;
