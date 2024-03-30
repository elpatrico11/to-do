import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from 'react';

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(tasks.length === 0) {
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, 
  [tasks])


  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  }, [])

  function addTask(name) {
    setTasks(prev=> {
      return [...prev, {name:name, done:false}];
    });
  }
  

  return (
    <main>
      <TaskForm onAdd={addTask}/>
      {/* Map over tasks and render Task component for each task */}
      {tasks.map((task, index) => (
        <Task key={index} name={task.name} done={task.done} />
      ))}
    </main>
  );
}

export default App;
