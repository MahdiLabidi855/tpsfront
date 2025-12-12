<template>
  <div id="app">
    <h1>Gestion des Tâches</h1>
    <div class="task-form">
      <input
        type="text"
        v-model="newTask.title"
        placeholder="Ajouter une nouvelle tâche"
      />
      <button @click="addTask">Ajouter</button>
    </div>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task._id" :class="{ completed: task.completed }">
        <input
          type="checkbox"
          v-model="task.completed"
          @change="updateTask(task)"
        />
        <span>{{ task.title }}</span>
        <button @click="removeTask(task._id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import taskService from './services/taskService';

export default {
  data() {
    return {
      newTask: {
        title: '',
        completed: false
      },
      tasks: []
    };
  },
  async created() {
    this.tasks = await taskService.getAllTasks();
  },
  methods: {
    async addTask() {
      if (this.newTask.title.trim()) {
        const task = await taskService.createTask(this.newTask);
        this.tasks.push(task);
        this.newTask.title = '';
      }
    },
    async updateTask(task) {
      await taskService.updateTask(task._id, {
        completed: task.completed
      });
    },
    async removeTask(id) {
      await taskService.deleteTask(id);
      this.tasks = this.tasks.filter(t => t._id !== id);
    }
  }
};
</script>


<style>
.completed {
  text-decoration: line-through;
  color: gray;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.task-form {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.task-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  max-width: 300px;
}

.task-form button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-form button:hover {
  background-color: #45a049;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-list li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.task-list li.completed span {
  text-decoration: line-through;
  color: #888;
}

.task-list button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.task-list button:hover {
  background-color: #da190b;
}

.stats {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
