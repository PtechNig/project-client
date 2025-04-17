import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { courses } from '@/data/Course';

export default function CoursesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#00426D]">
        Explore Our Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/dashboard/courses/${course.id}`}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="mb-4">
              <BookOpen className="text-[#FF0B80] w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {course.title}
            </h2>
            <p className="text-gray-600 line-clamp-2">{course.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              {course.modules.length} modules
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}