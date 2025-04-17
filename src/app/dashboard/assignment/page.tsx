'use client';

import { useState } from 'react';
import { Clock, FileText } from 'lucide-react';

type AssignmentStatus = 'Pending' | 'Submitted';

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: AssignmentStatus;
  submissionUrl?: string;
}

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Introduction to Virtual Assistance',
    course: 'VA101',
    dueDate: 'April 25, 2025',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Time Management Techniques',
    course: 'VA102',
    dueDate: 'April 28, 2025',
    status: 'Submitted',
    submissionUrl: 'https://example.com/submission-2',
  },
  {
    id: 3,
    title: 'Social Media Management Basics',
    course: 'VA201',
    dueDate: 'May 1, 2025',
    status: 'Pending',
  },
];

const statusColor: Record<AssignmentStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Submitted: 'bg-green-100 text-green-800',
};

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [submissionUrls, setSubmissionUrls] = useState<Record<number, string>>({});

  const handleUrlChange = (id: number, value: string) => {
    setSubmissionUrls((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id: number) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === id
        ? {
            ...assignment,
            status: 'Submitted' as AssignmentStatus,
            submissionUrl: submissionUrls[id],
          }
        : assignment
    );
    setAssignments(updatedAssignments);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Your Assignments</h1>

      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg shadow p-5 flex flex-col gap-4 transition hover:shadow-md"
          >
            <div className="flex items-start sm:items-center gap-4">
              <FileText className="text-[#00426D] w-6 h-6 mt-1 sm:mt-0" />
              <div>
                <h2 className="font-bold text-lg">{assignment.title}</h2>
                <p className="text-sm text-gray-600">{assignment.course}</p>
              </div>
            </div>

            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Due: {assignment.dueDate}
            </div>

            <span
              className={`text-sm font-medium px-3 py-1 rounded-full self-start ${statusColor[assignment.status]}`}
            >
              {assignment.status}
            </span>

            {assignment.status === 'Pending' && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="url"
                  placeholder="Enter assignment URL"
                  value={submissionUrls[assignment.id] || ''}
                  onChange={(e) => handleUrlChange(assignment.id, e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full sm:w-96 text-sm"
                />
                <button
                  onClick={() => handleSubmit(assignment.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                >
                  Submit
                </button>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
