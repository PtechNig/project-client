import { ChevronLeft, FolderOpenDot } from 'lucide-react';
import Link from 'next/link';
import { courses } from '@/data/Course';

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = courses.find(c => c.id === Number(params.courseId));

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Link href="/dashboard/courses" className="text-[#0063A4] hover:underline">
          Return to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/dashboard/courses"
        className="mb-6 inline-flex items-center text-[#0063A4] hover:underline"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        All Courses
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-[#00426D]">{course.title}</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FolderOpenDot className="text-[#FF0B80]" />
          Course Modules
        </h2>
        <div className="space-y-4">
          {course.modules.map((module) => (
            <Link
              key={module.id}
              href={`/dashboard/courses/${course.id}/module/${module.id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[#FF0B80] transition"
            >
              <h3 className="font-medium text-gray-800">{module.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {module.topics.length} topics
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
