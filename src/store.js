import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  tasks: []
};

// Create a slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTaskDone(state, action) {
      const { index, done } = action.payload;
      state.tasks[index].done = done;
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((_, i) => i !== action.payload);
    }
  }
});

export const { setTasks, addTask, updateTaskDone, removeTask } = tasksSlice.actions;

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer
  }
});

export default store;
