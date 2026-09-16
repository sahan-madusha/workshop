import { apiClient } from '../api/client';
import { Student } from '../types';

// Business Logic / Service Layer
// Communicates with api/ layer, cleans or transforms raw data for consumption.

export const studentService = {
  async fetchAllStudents(): Promise<Student[]> {
    const response = await apiClient.getStudents();
    if (response.status !== 200) {
      throw new Error(`Failed to fetch students: ${response.message}`);
    }
    return response.data;
  },

  async fetchActiveStudents(): Promise<Student[]> {
    const students = await this.fetchAllStudents();
    return students.filter((s) => s.status === 'Active');
  },

  calculateProgress(completedModules: number, totalModules: number = 6): number {
    return Math.min(100, Math.round((completedModules / totalModules) * 100));
  }
};
