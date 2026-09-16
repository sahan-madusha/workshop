// Types and Interfaces for Student & Workshop Application

export interface Student {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Mentor' | 'Admin';
  enrolledCourse: string;
  completedModules: number;
  status: 'Active' | 'Pending' | 'Graduate';
  joinedDate: string;
}

export interface FolderGuideItem {
  folderName: string;
  purpose: string;
  simpleAnalogy: string;
  colorTheme: string;
  exampleFile: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}
