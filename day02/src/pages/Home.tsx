import React from 'react';
import { useStudents } from '../hooks/useStudents';
import { FOLDER_EXPLANATIONS } from '../utils/constants';

export const Home: React.FC = () => {
  const { students, isLoading } = useStudents();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Simple Greeting Card */}
      <section id="home" className="bg-white border border-gray-200 p-6 rounded-xl shadow-xs space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Hi, I'm Sahan 👋</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Welcome to the Day 02 React + TypeScript Workshop! This simple project shows how to organize React folders cleanly.
        </p>
      </section>

      {/* Folder Architecture Section */}
      <section id="folders" className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Folder Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FOLDER_EXPLANATIONS.map((folder) => (
            <div key={folder.folderName} className="bg-white border border-gray-200 p-5 rounded-xl shadow-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-bold text-blue-600">{folder.folderName}</span>
                <span className="text-xs text-gray-400 font-mono">{folder.exampleFile}</span>
              </div>
              <p className="text-gray-700 text-sm">{folder.purpose}</p>
              <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-100">
                <strong>Analogy:</strong> {folder.simpleAnalogy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Student List Section */}
      <section id="students" className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Student Demo Data</h2>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading student data...</p>
        ) : (
          <div className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{student.name}</h3>
                  <p className="text-xs text-gray-500">{student.email} • {student.enrolledCourse}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-medium border border-blue-100">
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
