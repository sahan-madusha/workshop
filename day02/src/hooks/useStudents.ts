import { useState, useEffect } from 'react';
import { Student } from '../types';
import { studentService } from '../services/studentService';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await studentService.fetchAllStudents();
      setStudents(data);
    } catch (err: any) {
      setError(err?.message || 'An error occurred while fetching student data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    students,
    isLoading,
    error,
    refreshStudents: loadData,
  };
}
