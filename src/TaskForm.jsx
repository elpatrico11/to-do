import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');
  const [isDaily, setIsDaily] = useState(false); // State to track whether the task is daily

  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName, isDaily); // Pass isDaily along with taskName
    setTaskName('');
    setIsDaily(false); // Reset isDaily after adding the task
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={ev => setTaskName(ev.target.value)}
        placeholder="Your next task..."
      />
      {/* Add a checkbox to toggle daily task */}
      <label>
        Daily Task:
        <input
          type="checkbox"
          checked={isDaily}
          onChange={ev => setIsDaily(ev.target.checked)}
        />
      </label>
      <button className="btn btn-primary">+</button>
    </form>
  );
}
