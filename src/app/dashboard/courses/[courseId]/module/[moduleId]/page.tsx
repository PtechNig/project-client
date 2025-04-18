import { ChevronLeft, Video, FileText } from 'lucide-react';
import Link from 'next/link';
import { courses } from '@/data/Course';

interface ModulePageProps {
  params: {
    courseId: string;
    moduleId: string;
  };
}

export default function ModulePage({ params }: ModulePageProps) {
  const courseId = Number(params.courseId);
  const moduleId = Number(params.moduleId);

  const course = courses.find(c => c.id === courseId);
  const modul = course?.modules.find(m => m.id === moduleId);

  if (!course || !modul) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <Link href={`/dashboard/courses`} className="text-[#0063A4] hover:underline">
          Return to course list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href={`/dashboard/courses/${course.id}`}
          className="text-[#0063A4] hover:underline flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Course
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        {modul.title}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid gap-4">
          {modul.topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/dashboard/courses/${course.id}/module/${modul.id}/topics/${topic.id}`}
              className="p-4 border border-gray-200 rounded-lg hover:border-[#0063A4] transition flex items-start gap-3"
            >
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
