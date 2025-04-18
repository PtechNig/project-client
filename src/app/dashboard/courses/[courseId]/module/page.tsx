// src/app/dashboard/courses/[courseId]/module/page.tsx
'use client';

import { ChevronLeft, Video, FileText } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

interface Topic {
  id: number;
  title: string;
  type: 'video' | 'reading';
  duration: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  topics: Topic[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

// Mock data - replace with your actual data source
const courses: Course[] = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming',
    modules: [
      {
        id: 1,
        title: 'Programming Fundamentals',
        description: 'Core programming concepts',
        topics: [
          {
            id: 1,
            title: 'Variables and Data Types',
            type: 'video',
            duration: '10 min'
          },
          {
            id: 2,
            title: 'Control Structures',
            type: 'reading',
            duration: '15 min'
          }
        ]
      },
      {
        id: 2,
        title: 'Advanced Concepts',
        description: 'Dive deeper into programming',
        topics: [
          {
            id: 3,
            title: 'Functions',
            type: 'video',
            duration: '12 min'
          }
        ]
      }
    ]
  }
];

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default function ModulePage({ params }: PageProps) {
  // Unwrap the params promise
  const { courseId } = use(params);
  
  const course = courses.find((c) => c.id === Number(courseId));

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Link
          href="/dashboard/courses"
          className="text-blue-600 hover:underline"
        >
          Return to course list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link
          href="/dashboard/courses"
          className="text-blue-600 hover:underline flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Courses
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">{course.title} Modules</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>

      <div className="grid gap-6">
        {course.modules.map((module) => (
          <div key={module.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                </div>
                <Link
                  href={`/dashboard/courses/${course.id}/module/${module.id}`}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  View Topics
                  <ChevronLeft className="w-4 h-4 ml-1 rotate-180" />
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {module.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      topic.type === 'video'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {topic.type === 'video' ? (
                      <Video className="inline w-4 h-4 mr-1" />
                    ) : (
                      <FileText className="inline w-4 h-4 mr-1" />
                    )}
                    {topic.title}
                  </span>
                ))}
                {module.topics.length > 3 && (
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                    +{module.topics.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}