import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from 'react';
import Footer from './Footer';
import CountTasks from './CountTasks';


function App() {

  

  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks ?? [] ;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    setTasks(prev=> {
      return [...prev, {name:name, done:false}];
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev =>{
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }
  
  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => {
        return index !== indexToRemove;
      });
    })
  }

  return (
    <main>
      <CountTasks tasks={tasks}/>
      <TaskForm onAdd={addTask}/>
      
      {/* Map over tasks and render Task component for each task */}
      {tasks.map((task, index) => (
        <Task {...task} 
        onDelete={() => removeTask(index)}
        onToggle = {done => updateTaskDone(index, done)} />
        
        
      ))}
      
      <Footer/>
    </main>
  );
}

export default App;
