// src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks'; // Remplacez par l'URL de votre API

export default {
  async getAllTasks() {
    const response = await axios.get(API_URL);
    return response.data;
  },

  async createTask(task) {
    const response = await axios.post(API_URL, task);
    return response.data;
  },

  async updateTask(id, updates) {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  },

  async deleteTask(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
