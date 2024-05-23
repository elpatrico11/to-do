import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');
  const [isDaily, setIsDaily] = useState(false);

  function handleSubmit(ev) {
    ev.preventDefault();
    if (taskName.trim() !== '') { // Check if taskName is not empty
      console.log("Adding task:", taskName, "Is Daily:", isDaily);
      onAdd(taskName, isDaily);
      setTaskName('');
      setIsDaily(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={ev => setTaskName(ev.target.value)}
        placeholder="Your next task..."
      />
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
