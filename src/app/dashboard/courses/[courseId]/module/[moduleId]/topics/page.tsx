// src/app/dashboard/courses/[courseId]/module/[moduleId]/topics/page.tsx
'use client';

import { ChevronLeft, Video, FileText } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

interface Topic {
  id: number;
  title: string;
  type: 'video' | 'reading';
  duration: string;
  content?: string;
  videoUrl?: string;
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
            duration: '10 min',
            videoUrl: 'https://example.com/video1'
          },
          {
            id: 2,
            title: 'Control Structures',
            type: 'reading',
            duration: '15 min',
            content: 'Learn about if statements and loops...'
          }
        ]
      }
    ]
  }
];

interface PageProps {
  params: Promise<{ courseId: string; moduleId: string }>;
}

export default function TopicsPage({ params }: PageProps) {
  // Unwrap the params promise
  const { courseId, moduleId } = use(params);
  
  const course = courses.find((c) => c.id === Number(courseId));
  const modul = course?.modules.find((m) => m.id === Number(moduleId));

  if (!course || !modul) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
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
          href={`/dashboard/courses/${course.id}/module/${modul.id}`}
          className="text-blue-600 hover:underline flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Module
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">{modul.title} Topics</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {modul.topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/dashboard/courses/${course.id}/module/${modul.id}/topics/${topic.id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full ${
                    topic.type === 'video' 
                      ? 'bg-red-100 text-red-500' 
                      : 'bg-blue-100 text-blue-500'
                  }`}
                >
                  {topic.type === 'video' ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{topic.title}</h3>
                  <p className="text-sm text-gray-500">
                    {topic.type === 'video' ? 'Video' : 'Reading'} • {topic.duration}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}