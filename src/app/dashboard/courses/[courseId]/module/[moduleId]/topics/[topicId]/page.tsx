'use client';

import { ChevronLeft, Video, FileText } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { courses } from '@/data/Course';

export default function TopicPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string; topicId: string }>;
}) {
  // Unwrap the params Promise first
  const { courseId, moduleId, topicId } = use(params);

  // Then use the unwrapped values
  const course = courses.find(c => c.id === Number(courseId));
  const modul = course?.modules.find(m => m.id === Number(moduleId));
  const topic = modul?.topics.find(t => t.id === Number(topicId));

  if (!course || !modul || !topic) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
        <Link 
          href={`/dashboard/courses/${course?.id}/module/${modul?.id}`} 
          className="text-[#0063A4] hover:underline"
        >
          Return to module
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link
          href={`/dashboard/courses/${course.id}/module/${modul.id}`}
          className="text-[#0063A4] hover:underline flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Module
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-[#00426D]">{topic.title}</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className={`p-2 rounded-full ${
            topic.type === 'video' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'
          }`}>
            {topic.type === 'video' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          </div>
          <span className="text-gray-600">
            {topic.type === 'video' ? 'Video Lesson' : 'Reading Material'} • {topic.duration}
          </span>
        </div>

        {topic.type === 'video' ? (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={topic.videoUrl}
              className="w-full h-full"
              allowFullScreen
              title={topic.title}
            />
          </div>
        ) : (
          <div className="prose max-w-none">
            <p>{topic.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}