import { ApiResponse, Student } from '../types';

// Mock API Client to simulate fetching data from a remote server (e.g. REST API / Axios)

const MOCK_STUDENTS: Student[] = [
  {
    id: "std-101",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Student",
    enrolledCourse: "Frontend Architecture & React TS",
    completedModules: 4,
    status: "Active",
    joinedDate: "2026-09-01",
  },
  {
    id: "std-102",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    role: "Student",
    enrolledCourse: "Frontend Architecture & React TS",
    completedModules: 5,
    status: "Active",
    joinedDate: "2026-08-28",
  },
  {
    id: "std-103",
    name: "Marcus Vance",
    email: "marcus.vance@example.com",
    role: "Mentor",
    enrolledCourse: "Fullstack Engineering Lead",
    completedModules: 12,
    status: "Graduate",
    joinedDate: "2026-06-15",
  },
  {
    id: "std-104",
    name: "Elena Rostova",
    email: "elena.rostova@example.com",
    role: "Student",
    enrolledCourse: "UI/UX Design Systems with Tailwind",
    completedModules: 2,
    status: "Pending",
    joinedDate: "2026-09-10",
  }
];

export const apiClient = {
  // Simulates an HTTP GET request to /api/students
  async getStudents(): Promise<ApiResponse<Student[]>> {
    // Artificial network delay to demonstrate loading state handling
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      data: MOCK_STUDENTS,
      status: 200,
      message: "Students fetched successfully",
      timestamp: new Date().toISOString(),
    };
  },
};
